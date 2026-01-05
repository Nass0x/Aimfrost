<?php
set_time_limit(120);
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

$response = ['success' => false, 'data' => null, 'error' => null];

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);
$input = trim($data['input'] ?? '');

if (empty($input)) {
    echo json_encode(['success' => false, 'error' => 'Target input is required.']);
    exit;
}

$safe_input = escapeshellarg($input);

$command = "export HOME=/tmp && /usr/bin/cdncheck -i {$safe_input} -resp -j -silent 2>&1";

$output = shell_exec($command);

if (preg_match('/({.*})/', str_replace(["\n", "\r"], "", $output), $matches)) {
    $json_only = $matches[1];
    $decoded = json_decode($json_only, true);
    
    if ($decoded) {
        $response['success'] = true;
        $response['data'] = array_merge(['is_protected' => true], $decoded);
    } else {
        $response['error'] = "JSON_PARSE_ERROR: Output received but not valid JSON.";
    }
} else {
    $response['success'] = true;
    $response['data'] = ['is_protected' => false];
}

echo json_encode($response);