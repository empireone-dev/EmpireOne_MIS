<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Test the search functionality
$request = new \Illuminate\Http\Request(['searching' => 'Resignation']);
$controller = new \App\Http\Controllers\EmployeeAttritionController();
$response = $controller->index($request);
$data = $response->getData();

echo 'Found ' . count($data->data) . ' records for "Resignation"' . PHP_EOL;

// Test with 'Resigned' as well
$request2 = new \Illuminate\Http\Request(['searching' => 'Resigned']);
$response2 = $controller->index($request2);
$data2 = $response2->getData();

echo 'Found ' . count($data2->data) . ' records for "Resigned"' . PHP_EOL;

// Test without search
$request3 = new \Illuminate\Http\Request([]);
$response3 = $controller->index($request3);
$data3 = $response3->getData();

echo 'Total records without search: ' . count($data3->data) . PHP_EOL;
