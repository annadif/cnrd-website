param(
  [switch]$WhatIfMode
)

Set-StrictMode -Version Latest
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

# Liste configurable des fichiers / motifs à archiver (ajoutez / retirez selon besoin)
$patterns = @(
  'toumai_add.html',
  'articles_add.html',
  'old_*.*',
  '*.bak',
  '*.tmp'
)

$archiveRoot = Join-Path $root 'tools\archive'
$timestamp = (Get-Date).ToString('yyyyMMdd_HHmmss')
$dest = Join-Path $archiveRoot $timestamp
if (-not (Test-Path $dest)) {
  if (-not $WhatIfMode) { New-Item -Path $dest -ItemType Directory -Force | Out-Null }
}

$found = @()
foreach ($p in $patterns) {
  $foundFiles = Get-ChildItem -Path $root -Recurse -Filter $p -File -ErrorAction SilentlyContinue
  foreach ($m in $foundFiles) {
    $rel = $m.FullName.Substring($root.Length).TrimStart('\')
    $target = Join-Path $dest $rel
    $targetDir = Split-Path -Parent $target
    Write-Host "Archiving: $rel -> $target"
    if ($WhatIfMode) { continue }
    if (-not (Test-Path $targetDir)) { New-Item -Path $targetDir -ItemType Directory -Force | Out-Null }
    Move-Item -Path $m.FullName -Destination $target -Force
    $found += $rel
  }
}

if ($found.Count -eq 0) {
  Write-Host "No files matched the configured patterns. Adjust the `\$patterns` array in this script."
} else {
  Write-Host "Archived $($found.Count) item(s) to: $dest"
  Write-Host "Review files in the archive before permanently deleting them."
}
