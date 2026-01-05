<?php
// إعدادات البيئة لضمان استقرار التنفيذ
set_time_limit(150);
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

$response = ['success' => false, 'data' => [], 'error' => null];

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);
$domain = trim($data['domain'] ?? '');

if (empty($domain)) {
    echo json_encode(['success' => false, 'error' => 'Target domain is required.']);
    exit;
}

$safe_domain = escapeshellarg($domain);

/**
 * شرح الأمر:
 * -recon: يقوم بعمل فحص شامل لجميع أنواع السجلات.
 * -resp: يعرض الاستجابة الفعلية للسجل.
 * -json: يخرج النتائج بصيغة JSON Lines.
 * -silent: يمنع طباعة الشعار (Banner) لتسريع المعالجة.
 */
$command = "export HOME=/tmp && echo $safe_domain | /usr/bin/dnsx -recon -resp -json -silent 2>&1";

$output = shell_exec($command);

// بما أن dnsx يعيد JSON لكل سجل في سطر منفصل (JSONL)، سنقوم بتقسيم المخرجات
$lines = explode("\n", trim($output));
$all_records = [];

foreach ($lines as $line) {
    if (empty($line)) continue;
    $decoded = json_decode($line, true);
    if ($decoded) {
        $all_records[] = $decoded;
    }
}

if (count($all_records) > 0) {
    $response['success'] = true;
    $response['data'] = $all_records;
} else {
    // في حال لم يتم العثور على سجلات أو حدث خطأ في الصلاحيات
    $response['error'] = "No DNS records found or execution blocked. Raw: " . substr($output, 0, 100);
}

echo json_encode($response);