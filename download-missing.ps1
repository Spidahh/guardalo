# Script per scaricare immagini mancanti usando Jikan API
# Mapping: nome file -> MAL ID

$animeIds = @{
    "berserk" = 33
    "summer-time-rendering" = 47194
    "91-days" = 32998
    "abenobashi" = 306
    "ajin" = 31580
    "akira" = 47
    "akudama-drive" = 41433
    "arcane" = 48916
    "bna" = 40060
    "dandadan" = 57334
    "deadman-wonderland" = 6880
    "deca-dence" = 40056
    "devil-may-cry" = 1726
    "devilman-crybaby" = 35120
    "drifters" = 31339
    "failure-frame" = 55744
    "fate-zero" = 10087
    "flcl" = 227
    "gachiakuta" = 56994
    "gangsta" = 25183
    "gantz" = 384
    "gate" = 28907
    "ghost-in-the-shell" = 43
    "golden-kamuy" = 36028
    "grimgar" = 31859
    "handyman-saitou" = 52108
    "heavenly-delusion" = 53998
    "hells-paradise" = 46569
    "hellsing-ultimate" = 777
    "kaiju-no-8" = 52588
    "kingdom" = 12031
    "lazarus" = 59562
    "mob-psycho-100" = 32182
    "my-hero-academia" = 31964
    "one-punch-man" = 30276
    "parasyte" = 22535
    "pluto" = 53618
    "mononoke" = 164
    "promare" = 35848
    "ranking-of-kings" = 40834
    "reincarnated-sword" = 49891
    "saint-seiya" = 1254
    "samurai-champloo" = 205
    "shangri-la-frontier" = 52347
    "solo-leveling" = 52299
    "sword-art-online" = 11757
    "terra-formars" = 22687
    "eminence-in-shadow" = 48316
    "assassin-aristocrat" = 47790
    "trigun" = 6
    "wistoria" = 56668
    "wolfs-rain" = 202
}

$outDir = "images/anime"

foreach ($anime in $animeIds.GetEnumerator()) {
    $outFile = "$outDir/$($anime.Key).jpg"
    
    if ((Test-Path $outFile) -and ((Get-Item $outFile).Length -gt 1000)) {
        Write-Host "SKIP (exists): $($anime.Key)"
        continue
    }
    
    Write-Host "Fetching $($anime.Key) (ID: $($anime.Value))..."
    
    try {
        # Get image URL from Jikan API
        $response = Invoke-RestMethod -Uri "https://api.jikan.moe/v4/anime/$($anime.Value)" -TimeoutSec 10
        $imageUrl = $response.data.images.jpg.large_image_url
        
        if ($imageUrl) {
            Write-Host "  Downloading from: $imageUrl"
            # Download with headers
            $headers = @{
                "Referer" = "https://myanimelist.net"
                "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
            Invoke-WebRequest -Uri $imageUrl -OutFile $outFile -Headers $headers -TimeoutSec 15
            
            if ((Test-Path $outFile) -and ((Get-Item $outFile).Length -gt 1000)) {
                Write-Host "  OK - $((Get-Item $outFile).Length) bytes"
            } else {
                Write-Host "  FAILED - file too small"
                Remove-Item $outFile -ErrorAction SilentlyContinue
            }
        }
    } catch {
        Write-Host "  ERROR: $_"
    }
    
    # Rate limit - Jikan allows 3 req/sec
    Start-Sleep -Milliseconds 400
}

Write-Host "`nDone!"
