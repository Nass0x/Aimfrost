<?php
set_time_limit(180); 
ini_set('memory_limit', '256M');

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


$command = "cd /tmp && /usr/bin/lbd {$safe_host} 2>&1";

exec($command, $output_array);

$final_results = [];
foreach ($output_array as $line) {
    $clean_line = rtrim($line);
    if (!empty($clean_line)) {
        $final_results[] = $clean_line;
    }
}

echo json_encode([
    'success' => true,
    'data' => [
        'raw_output' => $final_results,
        'target' => $host
    ]
]);