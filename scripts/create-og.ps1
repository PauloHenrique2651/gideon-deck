Add-Type -AssemblyName System.Drawing
$bitmap = [System.Drawing.Bitmap]::new(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$navy = [System.Drawing.ColorTranslator]::FromHtml('#1C3458')
$white = [System.Drawing.ColorTranslator]::FromHtml('#F7F7F8')
$soft = [System.Drawing.ColorTranslator]::FromHtml('#BFD0E2')
$graphics.Clear($navy)
$gridPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(24, 255, 255, 255), 1)
for ($x = 0; $x -le 1200; $x += 80) { $graphics.DrawLine($gridPen, $x, 0, $x, 630) }
for ($y = 0; $y -le 630; $y += 80) { $graphics.DrawLine($gridPen, 0, $y, 1200, $y) }
$logo = [System.Drawing.Image]::FromFile((Join-Path $PSScriptRoot '..\assets\images\logo-white.png'))
$graphics.DrawImage($logo, 80, 65, 62, 62)
$brandFont = [System.Drawing.Font]::new('Segoe UI', 27, [System.Drawing.FontStyle]::Bold)
$titleFont = [System.Drawing.Font]::new('Segoe UI', 53, [System.Drawing.FontStyle]::Bold)
$subFont = [System.Drawing.Font]::new('Segoe UI', 21, [System.Drawing.FontStyle]::Regular)
$whiteBrush = [System.Drawing.SolidBrush]::new($white)
$softBrush = [System.Drawing.SolidBrush]::new($soft)
$graphics.DrawString('GIDEON SYSTEMS', $brandFont, $whiteBrush, 160, 73)
$graphics.DrawString('Inteligência de Software', $titleFont, $whiteBrush, 72, 232)
$graphics.DrawString('que impulsiona negócios.', $titleFont, $whiteBrush, 72, 305)
$graphics.DrawString('Software sob medida  ·  ERP  ·  CRM  ·  Automações', $subFont, $softBrush, 80, 485)
$output = Join-Path $PSScriptRoot '..\assets\images\og-gideon.png'
$bitmap.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)
$softBrush.Dispose(); $whiteBrush.Dispose(); $subFont.Dispose(); $titleFont.Dispose(); $brandFont.Dispose()
$logo.Dispose(); $gridPen.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
