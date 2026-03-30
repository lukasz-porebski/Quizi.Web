Push-Location "$PSScriptRoot\.."
yalc remove @lukasz-porebski/lp-common
npm uninstall @lukasz-porebski/lp-common
yalc add @lukasz-porebski/lp-common
npm install
Pop-Location
Write-Host "Switched to LOCAL" -ForegroundColor Yellow