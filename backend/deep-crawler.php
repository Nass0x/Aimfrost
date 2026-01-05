<?php
set_time_limit(300); 
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);
$url = trim($data['url'] ?? '');

if (empty($url)) {
    echo json_encode(['success' => false, 'error' => 'URL required']);
    exit;
}

$safe_url = escapeshellarg($url);


$command = "export HOME=/tmp && echo $safe_url | /usr/bin/hakrawler -d 2 -t 10 -u -insecure 2>&1";

exec($command, $output_array, $status);

$results = array_values(array_filter(array_map('trim', $output_array)));

if (empty($results)) {
    echo json_encode([
        'success' => false, 
        'error' => "No links discovered. Exit code: $status"
    ]);
} else {
    echo json_encode([
        'success' => true,
        'data' => [
            'urls' => $results, 
            'count' => count($results)
        ]
    ]);
}