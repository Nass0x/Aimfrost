<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);
$target = trim($data['target'] ?? '');

if (empty($target)) {
    echo json_encode(['success' => false, 'error' => 'Target required']);
    exit;
}

$host = parse_url($target, PHP_URL_HOST) ?: $target;
$safe_host = escapeshellarg($host);

$cmd = "/usr/bin/naabu -host $safe_host -top-ports 100 -scan-type c -silent -no-color 2>&1";

exec($cmd, $output_array);

$ports_only = array_filter($output_array, function($line) {
    return strpos($line, ':') !== false && !strpos($line, '[INF]');
});

echo json_encode([
    'success' => true,
    'data' => [
        'ports' => array_values($ports_only),
        'target' => $host
    ]
]);