<?php
// Contact form handler for the static export (replaces the old Next.js API route).
header('Content-Type: application/json');

function respond($status, $payload) {
  http_response_code($status);
  echo json_encode($payload);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(405, ['error' => 'Method not allowed.']);
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
  respond(400, ['error' => 'Invalid request.']);
}

$field = function ($key) use ($data) {
  // Strip CR/LF so values cannot inject extra mail headers.
  return trim(str_replace(["\r", "\n"], ' ', (string)($data[$key] ?? '')));
};

$target = 'info@brandlumeo.com';
$name = $field('name');
$email = $field('email');
$company = $field('company');
$phone = $field('phone');
$interests = $field('interests');
$message = trim((string)($data['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
  respond(400, ['error' => 'Please fill out your name, email, and message.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(400, ['error' => 'Please enter a valid email address.']);
}

$body = "Name: $name\nEmail: $email\n";
if ($phone !== '') $body .= "Phone: $phone\n";
if ($company !== '') $body .= "Company: $company\n";
if ($interests !== '') $body .= "Interested in: $interests\n";
$body .= "\nMessage:\n$message";

$headers = "From: Brandlumeo Website <$target>\r\n"
  . "Reply-To: $email\r\n"
  . "Content-Type: text/plain; charset=UTF-8\r\n";

$subject = '=?UTF-8?B?' . base64_encode("New Contact Form Submission from $name") . '?=';

if (!mail($target, $subject, $body, $headers, "-f$target")) {
  respond(502, ['error' => 'We could not send your message right now. Please try again in a few minutes.']);
}

respond(200, ['success' => true]);
