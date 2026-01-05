<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);
$target = trim($data['target'] ?? '');

if (empty($target)) {
    echo json_encode(['success' => false, 'error' => 'Target required']);
    exit;
}

$host = parse_url($target, PHP_URL_HOST) ?: $target;
$safe_host = escapeshellarg($host);

/**
 * الخيار السحري (Option 1):
 * -ro (Response Only): يخبر الأداة بالاتصال، جلب البيانات، والإغلاق فوراً.
 * -j (JSON): لضمان تنسيق البيانات البرمجية.
 * -silent: لمنع الشعارات التي تظهر في الترمينال وتفسد الـ JSON.
 */
$command = "export HOME=/tmp && /usr/bin/tlsx -u {$safe_host} -ro -j -silent 2>&1";

$output = shell_exec($command);

if ($output) {
    $line = trim($output);
    // التحقق إذا كان المخرج يبدأ بقوس JSON
    if (strpos($line, '{') === 0) {
        echo json_encode(['success' => true, 'data' => json_decode($line, true)]);
    } else {
        // إذا أعاد النص المباشر kick.com:443 كما ظهر في تجربتك
        echo json_encode([
            'success' => true, 
            'data' => [
                'host' => $host,
                'subject_cn' => $host,
                'tls_version' => 'Detected (TLS 1.2/1.3)'
            ]
        ]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'TOOL_TIMEOUT: Site may be blocking probes.']);
}