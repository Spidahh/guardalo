# Script per riscaricare TUTTE le immagini con ID MAL CORRETTI
# Mapping verificato: nome-file -> MAL ID corretto

$headers = @{"Referer"="https://myanimelist.net"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

# MAPPING COMPLETO E VERIFICATO
$animeIds = @{
    "attack-on-titan" = 16498      # Shingeki no Kyojin
    "berserk" = 33                  # Berserk (1997)
    "bleach" = 269                  # Bleach
    "cyberpunk-edgerunners" = 42310 # Cyberpunk Edgerunners
    "death-note" = 1535             # Death Note
    "fullmetal-alchemist" = 5114    # FMA Brotherhood
    "gurren-lagann" = 2001          # Tengen Toppa Gurren Lagann
    "hunter-x-hunter" = 11061       # Hunter x Hunter 2011
    "jojos-bizarre-adventure" = 14719 # JoJo Part 1
    "naruto" = 20                   # Naruto
    "neon-genesis-evangelion" = 30  # Evangelion
    "one-piece" = 21                # One Piece
    "steins-gate" = 9253            # Steins;Gate
    "summer-time-rendering" = 47194 # Summer Time Render
    "91-days" = 32998               # 91 Days
    "abenobashi" = 306              # Abenobashi
    "ajin" = 31580                  # Ajin
    "akame-ga-kill" = 22199         # Akame ga Kill
    "akira" = 47                    # Akira
    "akudama-drive" = 41433         # Akudama Drive
    "arcane" = 48916                # Arcane
    "black-clover" = 34572          # Black Clover
    "bna" = 40060                   # BNA
    "burn-the-witch" = 41468        # Burn the Witch
    "chainsaw-man" = 44511          # Chainsaw Man
    "claymore" = 1818               # Claymore
    "code-geass" = 1575             # Code Geass
    "cowboy-bebop" = 1               # Cowboy Bebop
    "dandadan" = 57334              # Dandadan
    "darwins-game" = 38656          # Darwin's Game
    "deadman-wonderland" = 6880     # Deadman Wonderland
    "death-parade" = 28223          # Death Parade
    "deca-dence" = 40056            # Deca-Dence
    "demon-slayer" = 38000          # Kimetsu no Yaiba
    "devil-may-cry" = 1726          # Devil May Cry
    "devilman-crybaby" = 35120      # Devilman Crybaby
    "dragon-ball" = 223             # Dragon Ball
    "drifters" = 31339              # Drifters
    "eighty-six" = 41457            # 86
    "erased" = 31043                # Boku dake ga Inai Machi
    "failure-frame" = 55744         # Hazurewaku
    "fate-zero" = 10087             # Fate/Zero
    "flcl" = 227                    # FLCL
    "frieren" = 52991               # Sousou no Frieren
    "future-diary" = 10620          # Mirai Nikki
    "gachiakuta" = 56994            # Gachiakuta
    "gangsta" = 25183               # Gangsta
    "gantz" = 384                   # Gantz
    "gate" = 28907                  # Gate
    "ghost-in-the-shell" = 43       # Ghost in the Shell
    "golden-kamuy" = 36028          # Golden Kamuy
    "grimgar" = 31859               # Grimgar
    "handyman-saitou" = 52108       # Benriya Saitou-san
    "heavenly-delusion" = 53998     # Tengoku Daimakyou
    "hells-paradise" = 46569        # Jigokuraku
    "hellsing-ultimate" = 777       # Hellsing Ultimate
    "jujutsu-kaisen" = 40748        # Jujutsu Kaisen
    "kaiju-no-8" = 52588            # Kaiju No. 8
    "kill-la-kill" = 18679          # Kill la Kill
    "kingdom" = 12031               # Kingdom
    "spirited-away" = 199           # Sen to Chihiro
    "lazarus" = 59562               # Lazarus
    "made-in-abyss" = 34599         # Made in Abyss
    "mob-psycho-100" = 32182        # Mob Psycho 100
    "monster" = 19                  # Monster
    "my-hero-academia" = 31964      # Boku no Hero Academia
    "one-punch-man" = 30276         # One Punch Man
    "overlord" = 29803              # Overlord
    "parasyte" = 22535              # Kiseijuu
    "pluto" = 53618                 # Pluto
    "mononoke" = 164                # Mononoke Hime
    "promare" = 35848               # Promare
    "ranking-of-kings" = 40834      # Ousama Ranking
    "rezero" = 31240                # Re:Zero
    "reincarnated-sword" = 49891    # Tensei shitara Ken deshita
    "saint-seiya" = 1254            # Saint Seiya
    "samurai-champloo" = 205        # Samurai Champloo
    "shangri-la-frontier" = 52347   # Shangri-La Frontier
    "solo-leveling" = 52299         # Solo Leveling
    "spy-x-family" = 50265          # Spy x Family
    "sword-art-online" = 11757      # SAO
    "terra-formars" = 22687         # Terra Formars
    "eminence-in-shadow" = 48316    # Kage no Jitsuryokusha
    "promised-neverland" = 37779    # Yakusoku no Neverland
    "shield-hero" = 35790           # Tate no Yuusha
    "assassin-aristocrat" = 47790   # Sekai Saikou no Ansatsusha
    "tokyo-revengers" = 42249       # Tokyo Revengers
    "tower-of-god" = 40221          # Kami no Tou
    "trigun" = 6                    # Trigun
    "vinland-saga" = 37521          # Vinland Saga
    "wistoria" = 56668              # Wistoria
    "wolfs-rain" = 202              # Wolf's Rain
    "to-be-hero" = 34028            # To Be Hero
}

$outDir = "images/anime"
$total = $animeIds.Count
$current = 0
$errors = @()

Write-Host "=== RISCARICARE TUTTE LE $total IMMAGINI ===" -ForegroundColor Cyan

foreach ($anime in $animeIds.GetEnumerator()) {
    $current++
    $outFile = "$outDir/$($anime.Key).jpg"
    
    Write-Host "[$current/$total] $($anime.Key) (MAL: $($anime.Value))..." -NoNewline
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.jikan.moe/v4/anime/$($anime.Value)" -TimeoutSec 15
        $url = $response.data.images.jpg.large_image_url
        
        if ($url) {
            # Rimuovo vecchia immagine
            Remove-Item $outFile -Force -ErrorAction SilentlyContinue
            
            # Scarico nuova
            Invoke-WebRequest -Uri $url -OutFile $outFile -Headers $headers -TimeoutSec 20
            
            $size = (Get-Item $outFile).Length
            if ($size -gt 5000) {
                Write-Host " OK ($size bytes)" -ForegroundColor Green
            } else {
                Write-Host " PICCOLO ($size bytes)" -ForegroundColor Yellow
                $errors += $anime.Key
            }
        } else {
            Write-Host " NO URL" -ForegroundColor Red
            $errors += $anime.Key
        }
    } catch {
        Write-Host " ERRORE: $_" -ForegroundColor Red
        $errors += $anime.Key
    }
    
    # Rate limit Jikan: 3 req/sec
    Start-Sleep -Milliseconds 350
}

Write-Host "`n=== COMPLETATO ===" -ForegroundColor Cyan
Write-Host "Successi: $($total - $errors.Count) / $total"
if ($errors.Count -gt 0) {
    Write-Host "Errori: $($errors -join ', ')" -ForegroundColor Red
}
