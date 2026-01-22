# Script per scaricare TUTTE le 94 immagini anime
$headers = @{
    "Referer" = "https://myanimelist.net"
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

# Mapping completo: titolo -> URL immagine MyAnimeList
$animeImages = @{
    "attack-on-titan" = "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
    "berserk" = "https://cdn.myanimelist.net/images/anime/1384/119600.jpg"
    "bleach" = "https://cdn.myanimelist.net/images/anime/1908/135431.jpg"
    "cyberpunk-edgerunners" = "https://cdn.myanimelist.net/images/anime/1818/126435.jpg"
    "death-note" = "https://cdn.myanimelist.net/images/anime/9/9453.jpg"
    "fullmetal-alchemist" = "https://cdn.myanimelist.net/images/anime/1208/94745.jpg"
    "gurren-lagann" = "https://cdn.myanimelist.net/images/anime/4/5123.jpg"
    "hunter-x-hunter" = "https://cdn.myanimelist.net/images/anime/1337/99013.jpg"
    "jojos-bizarre-adventure" = "https://cdn.myanimelist.net/images/anime/3/40409.jpg"
    "naruto" = "https://cdn.myanimelist.net/images/anime/1141/142503.jpg"
    "neon-genesis-evangelion" = "https://cdn.myanimelist.net/images/anime/1314/108941.jpg"
    "one-piece" = "https://cdn.myanimelist.net/images/anime/1244/138851.jpg"
    "steins-gate" = "https://cdn.myanimelist.net/images/anime/1935/127974.jpg"
    "summer-time-rendering" = "https://cdn.myanimelist.net/images/anime/1760/122673.jpg"
    "91-days" = "https://cdn.myanimelist.net/images/anime/9/80611.jpg"
    "abenobashi" = "https://cdn.myanimelist.net/images/anime/6/22288.jpg"
    "ajin" = "https://cdn.myanimelist.net/images/anime/1175/134825.jpg"
    "akame-ga-kill" = "https://cdn.myanimelist.net/images/anime/1429/95946.jpg"
    "akira" = "https://cdn.myanimelist.net/images/anime/1148/139529.jpg"
    "akudama-drive" = "https://cdn.myanimelist.net/images/anime/1017/110867.jpg"
    "arcane" = "https://cdn.myanimelist.net/images/anime/1306/124530.jpg"
    "black-clover" = "https://cdn.myanimelist.net/images/anime/2/88336.jpg"
    "bna" = "https://cdn.myanimelist.net/images/anime/1221/106731.jpg"
    "burn-the-witch" = "https://cdn.myanimelist.net/images/anime/1545/110334.jpg"
    "chainsaw-man" = "https://cdn.myanimelist.net/images/anime/1806/126216.jpg"
    "claymore" = "https://cdn.myanimelist.net/images/anime/3/21834.jpg"
    "code-geass" = "https://cdn.myanimelist.net/images/anime/1032/135088.jpg"
    "cowboy-bebop" = "https://cdn.myanimelist.net/images/anime/4/19644.jpg"
    "dandadan" = "https://cdn.myanimelist.net/images/anime/1032/142028.jpg"
    "darwins-game" = "https://cdn.myanimelist.net/images/anime/1192/105320.jpg"
    "deadman-wonderland" = "https://cdn.myanimelist.net/images/anime/12/30095.jpg"
    "death-parade" = "https://cdn.myanimelist.net/images/anime/5/71553.jpg"
    "deca-dence" = "https://cdn.myanimelist.net/images/anime/1627/108396.jpg"
    "demon-slayer" = "https://cdn.myanimelist.net/images/anime/1286/99889.jpg"
    "devil-may-cry" = "https://cdn.myanimelist.net/images/anime/9/11701.jpg"
    "devilman-crybaby" = "https://cdn.myanimelist.net/images/anime/1109/135728.jpg"
    "dragon-ball" = "https://cdn.myanimelist.net/images/anime/1887/92364.jpg"
    "drifters" = "https://cdn.myanimelist.net/images/anime/11/81305.jpg"
    "eighty-six" = "https://cdn.myanimelist.net/images/anime/1987/117507.jpg"
    "erased" = "https://cdn.myanimelist.net/images/anime/1085/135912.jpg"
    "failure-frame" = "https://cdn.myanimelist.net/images/anime/1441/141848.jpg"
    "fate-zero" = "https://cdn.myanimelist.net/images/anime/1001/90850.jpg"
    "flcl" = "https://cdn.myanimelist.net/images/anime/1483/117625.jpg"
    "frieren" = "https://cdn.myanimelist.net/images/anime/1015/138006.jpg"
    "future-diary" = "https://cdn.myanimelist.net/images/anime/13/33465.jpg"
    "gachiakuta" = "https://cdn.myanimelist.net/images/anime/1100/144894.jpg"
    "gangsta" = "https://cdn.myanimelist.net/images/anime/12/75891.jpg"
    "gantz" = "https://cdn.myanimelist.net/images/anime/1tried/141848.jpg"
    "gate" = "https://cdn.myanimelist.net/images/anime/9/77178.jpg"
    "ghost-in-the-shell" = "https://cdn.myanimelist.net/images/anime/1079/134082.jpg"
    "golden-kamuy" = "https://cdn.myanimelist.net/images/anime/1241/137686.jpg"
    "grimgar" = "https://cdn.myanimelist.net/images/anime/11/77678.jpg"
    "handyman-saitou" = "https://cdn.myanimelist.net/images/anime/1440/131282.jpg"
    "heavenly-delusion" = "https://cdn.myanimelist.net/images/anime/1575/133571.jpg"
    "hells-paradise" = "https://cdn.myanimelist.net/images/anime/1000/131680.jpg"
    "hellsing-ultimate" = "https://cdn.myanimelist.net/images/anime/6/7331.jpg"
    "jujutsu-kaisen" = "https://cdn.myanimelist.net/images/anime/1171/109222.jpg"
    "kaiju-no-8" = "https://cdn.myanimelist.net/images/anime/1897/141679.jpg"
    "kill-la-kill" = "https://cdn.myanimelist.net/images/anime/8/75514.jpg"
    "kingdom" = "https://cdn.myanimelist.net/images/anime/1951/144077.jpg"
    "spirited-away" = "https://cdn.myanimelist.net/images/anime/6/79597.jpg"
    "lazarus" = "https://cdn.myanimelist.net/images/anime/1422/144952.jpg"
    "made-in-abyss" = "https://cdn.myanimelist.net/images/anime/6/86733.jpg"
    "mob-psycho" = "https://cdn.myanimelist.net/images/anime/1462/139411.jpg"
    "monster" = "https://cdn.myanimelist.net/images/anime/10/18793.jpg"
    "my-hero-academia" = "https://cdn.myanimelist.net/images/anime/1236/140699.jpg"
    "one-punch-man" = "https://cdn.myanimelist.net/images/anime/1247/142928.jpg"
    "overlord" = "https://cdn.myanimelist.net/images/anime/7/88019.jpg"
    "parasyte" = "https://cdn.myanimelist.net/images/anime/1506/140611.jpg"
    "pluto" = "https://cdn.myanimelist.net/images/anime/1457/139457.jpg"
    "mononoke" = "https://cdn.myanimelist.net/images/anime/1280/137760.jpg"
    "promare" = "https://cdn.myanimelist.net/images/anime/1704/101368.jpg"
    "ranking-of-kings" = "https://cdn.myanimelist.net/images/anime/1982/117176.jpg"
    "rezero" = "https://cdn.myanimelist.net/images/anime/1522/128039.jpg"
    "reincarnated-sword" = "https://cdn.myanimelist.net/images/anime/1932/127166.jpg"
    "saint-seiya" = "https://cdn.myanimelist.net/images/anime/12/18545.jpg"
    "samurai-champloo" = "https://cdn.myanimelist.net/images/anime/1375/121599.jpg"
    "shangri-la-frontier" = "https://cdn.myanimelist.net/images/anime/1460/138Mo439.jpg"
    "solo-leveling" = "https://cdn.myanimelist.net/images/anime/1978/142181.jpg"
    "spy-x-family" = "https://cdn.myanimelist.net/images/anime/1441/122795.jpg"
    "sword-art-online" = "https://cdn.myanimelist.net/images/anime/1522/133966.jpg"
    "terra-formars" = "https://cdn.myanimelist.net/images/anime/4/65377.jpg"
    "eminence-in-shadow" = "https://cdn.myanimelist.net/images/anime/1375/134093.jpg"
    "promised-neverland" = "https://cdn.myanimelist.net/images/anime/1125/96929.jpg"
    "shield-hero" = "https://cdn.myanimelist.net/images/anime/1490/101365.jpg"
    "assassin-aristocrat" = "https://cdn.myanimelist.net/images/anime/1804/116879.jpg"
    "tokyo-revengers" = "https://cdn.myanimelist.net/images/anime/1839/122012.jpg"
    "tower-of-god" = "https://cdn.myanimelist.net/images/anime/1702/106229.jpg"
    "trigun" = "https://cdn.myanimelist.net/images/anime/1296/138555.jpg"
    "vinland-saga" = "https://cdn.myanimelist.net/images/anime/1500/103005.jpg"
    "wistoria" = "https://cdn.myanimelist.net/images/anime/1169/143460.jpg"
    "wolfs-rain" = "https://cdn.myanimelist.net/images/anime/8/20695.jpg"
}

$outDir = "images/anime"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

$total = $animeImages.Count
$current = 0

foreach ($anime in $animeImages.GetEnumerator()) {
    $current++
    $outFile = "$outDir/$($anime.Key).jpg"
    
    if (-not (Test-Path $outFile)) {
        Write-Host "[$current/$total] Downloading $($anime.Key)..."
        try {
            Invoke-WebRequest -Uri $anime.Value -OutFile $outFile -Headers $headers -TimeoutSec 10
            Start-Sleep -Milliseconds 500
        } catch {
            Write-Host "  FAILED: $($anime.Key) - $($_.Exception.Message)"
        }
    } else {
        Write-Host "[$current/$total] SKIP (exists): $($anime.Key)"
    }
}

Write-Host "`nDownload completato! Immagini in: $outDir"
