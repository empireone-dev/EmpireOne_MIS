<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Mail\MailManager;
use Illuminate\Support\Facades\Mail;
use Illuminate\Container\Container;
use Illuminate\Support\Facades\Facade;

// Bootstrap minimal Laravel app for testing
$app = new Application(__DIR__);
$app->singleton('config', function () {
    return new \Illuminate\Config\Repository([
        'mail' => require 'config/mail.php',
    ]);
});

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Set up Mail facade
$container = Container::getInstance();
$container->instance('app', $app);
Facade::setFacadeApplication($container);

try {
    // Test SMTP connection
    echo "Testing SMTP connection...\n";

    $transport = new \Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport(
        env('MAIL_HOST'),
        env('MAIL_PORT'),
        env('MAIL_ENCRYPTION') === 'tls'
    );

    $transport->setUsername(env('MAIL_USERNAME'));
    $transport->setPassword(env('MAIL_PASSWORD'));

    // Add SSL context options
    // Note: setStreamOptions is not available in Symfony EsmtpTransport.
    // To set stream options, you need to use a DSN string with options or configure your mailer accordingly.
    // For testing purposes, you can proceed without setStreamOptions, or use SwiftMailer instead if you need this feature.

    $transport->start();
    echo "✅ SMTP connection successful!\n";
    $transport->stop();
} catch (Exception $e) {
    echo "❌ SMTP connection failed: " . $e->getMessage() . "\n";
}
