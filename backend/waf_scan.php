<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function strip_ansi_and_extract_json($text) {
   $cleaned_text = preg_replace('/\x1b\[[0-9;]*m/', '', $text);
   $json_start = strpos($cleaned_text, '{');
   $json_end = strrpos($cleaned_text, '}');
   if ($json_start !== false && $json_end !== false && $json_end > $json_start) {
       $length = $json_end - $json_start + 1;
       return trim(substr($cleaned_text, $json_start, $length));
   }
   return $cleaned_text;
}

$host = '';
$waf_result = null;
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    $host = trim($data['host'] ?? '');

    if (empty($host)) {
        $error = 'Error: Please enter a valid Host or URL.';
    } else {
        $safe_host = escapeshellarg($host);
        $wafw00f_path = "/usr/bin/wafw00f"; 
        
        $command = "{$wafw00f_path} {$safe_host} -f json 2>&1";
        $output = shell_exec($command);

        if ($output === null) {
            $error = "Command execution failed. Check server permissions.";
        } else {
            $cleaned_output = strip_ansi_and_extract_json($output);
            $decoded_output = json_decode($cleaned_output, true);
            
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded_output)) {
                $waf_result = $decoded_output;
            } else {
                if (preg_match('/is behind (.*) WAF\./', $output, $matches)) {
                    $waf_result = ['detected' => true, 'firewall' => trim($matches[1])];
                } else {
                    $error = "No WAF detected or scan failed.";
                }
            }
        }
    }
}

echo json_encode([
    'success' => $error ? false : true,
    'host' => $host,
    'data' => $waf_result,
    'error' => $error
]);