<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function clean_output($output) {
    $cleaned = preg_replace('/\x1b\[[0-9;]*m/', '', $output);
    $lines = explode("\n", trim($cleaned));
    return array_values(array_filter(array_map('trim', $lines)));
}

$domain = '';
$result = null;
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    $domain = trim($data['domain'] ?? '');

    if (empty($domain)) {
        $error = 'Error: Please enter a valid Domain (e.g., example.com).';
    } else {
        // ... داخل ملف domain-finder.php ...

// ... داخل ملف domain-finder.php ...

$safe_domain = escapeshellarg($domain);
$subfinder_path = "/home/abdessamad/go/bin/subfinder"; 

// الحل البديل: إجبار الأداة على استخدام مجلد /tmp كمنزل مؤقت لتجنب مشاكل الصلاحيات و Config
// وأيضاً إزالة -noconfig لأنه تسبب في خطأ في نسختك
$command = "HOME=/tmp {$subfinder_path} -d {$safe_domain} -silent 2>/dev/null";

$output = shell_exec($command);

        if ($output === null) {
            $error = "Execution failed. Check if subfinder is installed at $subfinder_path";
        } else {
            $subdomains = clean_output($output);
            
            if (count($subdomains) > 0) {
                $result = [
                    'count' => count($subdomains),
                    'subdomains' => $subdomains
                ];
            } else {
                $error = "No subdomains found for this target.";
            }
        }
    }
}

echo json_encode([
    'success' => $error ? false : true,
    'target' => $domain,
    'data' => $result,
    'error' => $error
]);