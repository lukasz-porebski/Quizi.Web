Push-Location "$PSScriptRoot\.."
yalc remove @lukasz-porebski/lp-common
npm uninstall lp-common
npm install @lukasz-porebski/lp-common@latest
Pop-Location
Write-Host "Switched to REMOTE" -ForegroundColor Green