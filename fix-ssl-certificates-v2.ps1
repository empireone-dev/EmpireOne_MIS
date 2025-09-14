# PowerShell script to fix SSL certificate issues
Write-Host "Fixing SSL Certificate Issues for PHP/Composer..." -ForegroundColor Green
Write-Host ""

# Create SSL directory if it doesn't exist
$sslDir = "C:\php\extras\ssl"
if (-not (Test-Path $sslDir)) {
    Write-Host "Creating SSL directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $sslDir -Force | Out-Null
}

# Download the latest CA certificate bundle
$certFile = "$sslDir\cacert.pem"
Write-Host "Downloading latest CA certificate bundle..." -ForegroundColor Yellow

try {
    Invoke-WebRequest -Uri "https://curl.se/ca/cacert.pem" -OutFile $certFile -UseBasicParsing
    Write-Host "CA certificate bundle downloaded successfully" -ForegroundColor Green
    
    # Configure Composer
    Write-Host "Configuring Composer..." -ForegroundColor Yellow
    composer config --global disable-tls false
    composer config --global secure-http true
    composer config --global cafile $certFile
    Write-Host "Composer configured" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "SSL certificate configuration completed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Add these lines to your php.ini file:" -ForegroundColor White
    Write-Host "   curl.cainfo = `"$certFile`"" -ForegroundColor Cyan
    Write-Host "   openssl.cafile = `"$certFile`"" -ForegroundColor Cyan
    Write-Host "2. Restart your command prompt/terminal" -ForegroundColor White
    Write-Host "3. Test with: composer diagnose" -ForegroundColor White
    
} catch {
    Write-Host "Failed to download CA certificate bundle" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
