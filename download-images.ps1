$images = @(
    @{name="attack-on-titan"; url="https://cdn.myanimelist.net/images/anime/10/47347.jpg"},
    @{name="berserk"; url="https://cdn.myanimelist.net/images/anime/1464/12645.jpg"},
    @{name="bleach"; url="https://cdn.myanimelist.net/images/anime/3/75546.jpg"},
    @{name="cyberpunk-edgerunners"; url="https://cdn.myanimelist.net/images/anime/1818/126506.jpg"},
    @{name="death-note"; url="https://cdn.myanimelist.net/images/anime/9/9453.jpg"},
    @{name="fullmetal-alchemist"; url="https://cdn.myanimelist.net/images/anime/1200/94745.jpg"},
    @{name="gurren-lagann"; url="https://cdn.myanimelist.net/images/anime/2/1996.jpg"},
    @{name="hunter-x-hunter"; url="https://cdn.myanimelist.net/images/anime/11/11961.jpg"},
    @{name="jujutsu-kaisen"; url="https://cdn.myanimelist.net/images/anime/10/75346.jpg"},
    @{name="mob-psycho"; url="https://cdn.myanimelist.net/images/anime/9/75446.jpg"},
    @{name="monster"; url="https://cdn.myanimelist.net/images/anime/9/75446.jpg"},
    @{name="naruto"; url="https://cdn.myanimelist.net/images/anime/13/17435.jpg"},
    @{name="one-piece"; url="https://cdn.myanimelist.net/images/anime/9/10601.jpg"},
    @{name="one-punch-man"; url="https://cdn.myanimelist.net/images/anime/1218/114695.jpg"},
    @{name="demon-slayer"; url="https://cdn.myanimelist.net/images/anime/1500/103005.jpg"},
    @{name="steins-gate"; url="https://cdn.myanimelist.net/images/anime/5/73199.jpg"},
    @{name="vinland-saga"; url="https://cdn.myanimelist.net/images/anime/1500/103005.jpg"},
    @{name="spy-x-family"; url="https://cdn.myanimelist.net/images/anime/1500/103005.jpg"},
    @{name="chainsaw-man"; url="https://cdn.myanimelist.net/images/anime/1500/103005.jpg"},
    @{name="code-geass"; url="https://cdn.myanimelist.net/images/anime/5/50331.jpg"}
)

$headers = @{"Referer"="https://myanimelist.net"}

foreach ($img in $images) {
    $outFile = "images/anime/$($img.name).jpg"
    if (-not (Test-Path $outFile)) {
        Write-Host "Downloading $($img.name)..."
        try {
            Invoke-WebRequest -Uri $img.url -OutFile $outFile -Headers $headers
        } catch {
            Write-Host "Failed: $($img.name)"
        }
    }
}
Write-Host "Done!"
