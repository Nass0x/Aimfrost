<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$domain = '';
$result = null;
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    
    $domain = trim($data['domain'] ?? '');
}

if (empty($domain)) {
    $error = "Please enter a valid domain name for lookup.";
} else {
    $safe_domain = escapeshellarg($domain);
    $command = "/usr/bin/whois {$safe_domain} 2>&1"; 

    $output = shell_exec($command);

    if ($output === null) {
        $error = "Command execution failed. Ensure 'whois' tool is installed and available.";
    } else {
        $result = $output;
        
        if (preg_match('/^\s*(Host not found|No whois server is known|No Data Found|Invalid parameter|whois: no matching entries)/i', $result)) {
            $error = "No Whois information found for the entered domain.";
            $result = null; 
        }
    }
}

$response = [
    'success' => $error ? false : true,
    'query_domain' => $domain,
    'whois_result' => $result,
    'error' => $error
];

echo json_encode($response);
exit();
?>