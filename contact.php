<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| MoldWise Contact Form Endpoint
|--------------------------------------------------------------------------
| Editable recipient email must match assets/js/config.js:
| config.contact.email / config.form.recipient
|--------------------------------------------------------------------------
*/

$recipientEmail = 'hello@moldwise.com';
$siteName = 'MoldWise';
$subjectPrefix = 'New MoldWise Request';

/*
|--------------------------------------------------------------------------
| JSON Response Helper
|--------------------------------------------------------------------------
*/

function respond_json(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

    echo json_encode([
        'success' => $success,
        'message' => $message,
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

    exit;
}

/*
|--------------------------------------------------------------------------
| Request Method Check
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond_json(false, 'Invalid request method.', 405);
}

/*
|--------------------------------------------------------------------------
| Sanitization Helpers
|--------------------------------------------------------------------------
*/

function clean_text(?string $value, int $maxLength = 1000): string
{
    $value = trim((string) $value);
    $value = str_replace(["\r", "\0"], '', $value);
    $value = strip_tags($value);

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return substr($value, 0, $maxLength);
}

function clean_multiline(?string $value, int $maxLength = 4000): string
{
    $value = trim((string) $value);
    $value = str_replace(["\r", "\0"], '', $value);
    $value = strip_tags($value);

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return substr($value, 0, $maxLength);
}

function has_header_injection(string $value): bool
{
    return (bool) preg_match('/[\r\n]/', $value);
}

/*
|--------------------------------------------------------------------------
| Honeypot Anti-Spam
|--------------------------------------------------------------------------
*/

$honeypot = clean_text($_POST['website'] ?? '', 200);

if ($honeypot !== '') {
    respond_json(true, 'Thank you. Your request has been received.');
}

/*
|--------------------------------------------------------------------------
| Collect Fields
|--------------------------------------------------------------------------
*/

$fullName = clean_text($_POST['fullName'] ?? '', 120);
$email = clean_text($_POST['email'] ?? '', 180);
$phone = clean_text($_POST['phone'] ?? '', 80);
$service = clean_text($_POST['service'] ?? '', 180);
$message = clean_multiline($_POST['message'] ?? '', 4000);
$sourcePage = clean_text($_POST['sourcePage'] ?? 'MoldWise contact form', 220);
$privacyConsent = isset($_POST['privacyConsent']) ? 'Yes' : '';

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

$allowedServices = [
    'Mold Remediation',
    'Mold Inspection',
    'Mold Testing',
    'Black Mold Concerns',
    'Basement Mold Help',
    'Moisture & Mold Prevention',
];

if ($fullName === '' || strlen($fullName) < 2) {
    respond_json(false, 'Please enter your full name.', 422);
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond_json(false, 'Please enter a valid email address.', 422);
}

if (has_header_injection($email) || has_header_injection($fullName)) {
    respond_json(false, 'Please check the required fields and try again.', 422);
}

if ($phone === '' || strlen($phone) < 7) {
    respond_json(false, 'Please enter a valid phone number.', 422);
}

if ($service === '' || !in_array($service, $allowedServices, true)) {
    respond_json(false, 'Please select a valid service category.', 422);
}

if ($message === '' || strlen($message) < 10) {
    respond_json(false, 'Please describe the concern with at least a few details.', 422);
}

if ($privacyConsent !== 'Yes') {
    respond_json(false, 'Please confirm that you understand how your request may be used.', 422);
}

if (!filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)) {
    respond_json(false, 'The form is not configured correctly. Please contact the site owner.', 500);
}

/*
|--------------------------------------------------------------------------
| Build Email
|--------------------------------------------------------------------------
*/

$submittedAt = date('Y-m-d H:i:s');
$userIp = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';

$emailSubject = $subjectPrefix . ' — ' . $service;

$emailBody = <<<BODY
New request submitted through {$siteName}.

IMPORTANT PLATFORM NOTE:
MoldWise is an independent mold remediation provider-matching platform. Submitting this form does not create a service agreement. Final pricing, availability, scheduling, warranties, licensing, insurance, and service terms are handled by participating providers.

Submitted at: {$submittedAt}
Source page: {$sourcePage}

CONTACT DETAILS
Full name: {$fullName}
Email: {$email}
Phone: {$phone}

REQUEST DETAILS
Service category: {$service}

Message:
{$message}

CONSENT
Privacy / provider-matching consent: {$privacyConsent}

TECHNICAL DETAILS
IP address: {$userIp}
User agent: {$userAgent}
BODY;

$encodedSubject = '=?UTF-8?B?' . base64_encode($emailSubject) . '?=';

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: ' . $siteName . ' <no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'localhost') . '>',
    'Reply-To: ' . $fullName . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
];

/*
|--------------------------------------------------------------------------
| Send Email
|--------------------------------------------------------------------------
*/

$mailSent = @mail(
    $recipientEmail,
    $encodedSubject,
    $emailBody,
    implode("\r\n", $headers)
);

if (!$mailSent) {
    respond_json(
        false,
        'The request could not be sent right now. Please try again or contact MoldWise by phone or email.',
        500
    );
}

respond_json(true, 'Thank you. Your request has been received.');
