<?php
// السماح بالعمل لمدة تصل لـ 10 دقائق لأن Sherlock بطيء بطبعه
set_time_limit(600); 
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


function parse_sherlock_output($output) {
    $lines = explode("\n", $output);
    $results = [];

    foreach ($lines as $line) {
        $line = trim($line);
      
        if (strpos($line, '[+]') !== false) {
            $parts = explode(': ', $line);
            if (count($parts) >= 2) {
                $site_name = trim(str_replace('[+]', '', $parts[0]));
                $site_url = trim($parts[1]);
                $results[] = [
                    'site' => $site_name,
                    'url' => $site_url
                ];
            }
        }
    }
    return $results;
}

$response = [
    'success' => false,
    'data' => [],
    'error' => null
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    $username = trim($data['username'] ?? '');

    if (empty($username)) {
        $response['error'] = 'Target Username is required.';
    } else {
        $safe_username = escapeshellarg($username);
        

        $command = "export HOME=/tmp && /usr/bin/sherlock {$safe_username} --timeout 1 2>&1";
        
        $output = shell_exec($command);

        if (empty($output)) {
            $response['error'] = 'Search failed. System returned no data.';
        } else {
            $found_accounts = parse_sherlock_output($output);
            
            if (count($found_accounts) > 0) {
                $response['success'] = true;
                $response['data'] = [
                    'accounts' => $found_accounts,
                    'count' => count($found_accounts)
                ];
            } else {
                $response['error'] = 'Zero matches found across known social networks.';
            }
        }
    }
}

echo json_encode($response);