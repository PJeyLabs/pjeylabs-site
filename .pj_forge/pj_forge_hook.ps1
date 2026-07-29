param(
    [Parameter(Mandatory = $true)]
    [string]$EventName,
    [string]$PjForgeMarker = 'pj-forge-hook'
)

try {
    $eventsDir = $PSScriptRoot
    $eventsFile = Join-Path $eventsDir 'coder_events.jsonl'
    if (!(Test-Path -LiteralPath $eventsDir)) {
        New-Item -ItemType Directory -Path $eventsDir -Force | Out-Null
    }
    try { [Console]::InputEncoding = [System.Text.Encoding]::UTF8 } catch {}
    $stdin = [Console]::In.ReadToEnd()
    $payload = $null
    if ($stdin) {
        try { $payload = $stdin | ConvertFrom-Json } catch { $payload = $stdin }
    }
    $obj = [pscustomobject]@{
        forgeEvent = $EventName
        receivedAt = [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ss.fffZ')
        payload = $payload
    }
    $line = $obj | ConvertTo-Json -Compress -Depth 50
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::AppendAllText($eventsFile, $line + "`r`n", $utf8NoBom)
} catch {
} finally {
    exit 0
}
