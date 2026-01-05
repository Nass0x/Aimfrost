<?php
set_time_limit(300); 
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

$response = [
    'success' => false,
    'data' => null,
    'error' => null
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    $domain = trim($data['domain'] ?? '');

    if (empty($domain)) {
        $response['error'] = 'Target Domain is required.';
    } else {
        $safe_domain = escapeshellarg($domain);
        
        
        $tmp_file = "/tmp/dns_" . uniqid() . ".json";
       
        $command = "/usr/bin/dnsrecon -d {$safe_domain} -t std --json {$tmp_file} 2>&1";
        
        exec($command, $shell_output, $status);

        if (file_exists($tmp_file)) {
            $json_output = file_get_contents($tmp_file);
            $decoded_data = json_decode($json_output, true);
            
            if ($decoded_data) {
                $response['success'] = true;
                $response['data'] = $decoded_data;
            } else {
                $response['error'] = 'Failed to parse DNS records.';
            }
            
            unlink($tmp_file);
        } else {
            $response['error'] = 'DNS Recon failed or no records found. ' . implode(" ", $shell_output);
        }
    }
}

echo json_encode($response);