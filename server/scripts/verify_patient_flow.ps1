$ErrorActionPreference = 'Stop'

# Register patient
$registerBody = @{ fullName='Test Patient'; email='test.patient@example.com'; password='Passw0rd!'; role='patient' } | ConvertTo-Json
$res = Invoke-RestMethod -Method Post -Uri 'http://localhost:5000/api/auth/register' -ContentType 'application/json' -Body $registerBody
Write-Host "REGISTER OK"
$token = $res.token
$user = $res.user
Write-Host ("Token prefix: " + $token.Substring(0,20))
Write-Host ("User role: " + $user.role)

# Complete profile (minimal)
$profileBody = @{ personalDetails = @{ gender = 'male' } } | ConvertTo-Json
$updated = Invoke-RestMethod -Method Put -Uri 'http://localhost:5000/api/auth/profile' -Headers @{ Authorization = ("Bearer " + $token) } -ContentType 'application/json' -Body $profileBody
Write-Host "PROFILE UPDATE OK"
Write-Host ("ProfileComplete: " + $updated.user.isProfileComplete)

# Login verify
$loginBody = @{ email='test.patient@example.com'; password='Passw0rd!' } | ConvertTo-Json
$loginRes = Invoke-RestMethod -Method Post -Uri 'http://localhost:5000/api/auth/login' -ContentType 'application/json' -Body $loginBody
Write-Host "LOGIN OK"
Write-Host ("Login isProfileComplete: " + $loginRes.user.isProfileComplete)