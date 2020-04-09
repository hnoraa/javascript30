# copy these items into the subdirectories and remove from base
$files = @('index.html', 'style.css');
Get-ChildItem -Directory | ForEach {
    $dir = $_.FullName
    
    foreach($f in $files) {
        Copy-Item -Force ($(Get-Item -Path $f).FullName) -Destination $_.FullName
    }
}

foreach($f in $files) {
    Remove-Item $f
}
