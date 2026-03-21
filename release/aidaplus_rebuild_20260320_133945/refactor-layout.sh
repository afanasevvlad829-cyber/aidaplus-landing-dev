#!/usr/bin/env bash
set -e

echo "=== AidaCamp layout refactor ==="

ROOT="$(pwd)"

CSS="$ROOT/main.css"
HTML="$ROOT/index.html"

echo "1. Backup files..."

cp "$CSS" "$CSS.bak"
cp "$HTML" "$HTML.bak"

echo "2. Fix .ac-wrap layout..."

perl -0777 -i -pe '
s/\.ac-wrap\s*\{[^}]*\}/.ac-wrap{
width:100%;
background:#f0f0f5;
display:block;
padding:24px 40px;
min-height:auto;
height:auto;
align-items:initial;
justify-content:initial;
}/s
' "$CSS"

echo "3. Remove flex centering leftovers..."

sed -i '' '/align-items:center/d' "$CSS" 2>/dev/null || true
sed -i '' '/justify-content:center/d' "$CSS" 2>/dev/null || true
sed -i '' '/min-height:100vh/d' "$CSS" 2>/dev/null || true

echo "4. Add header CSS..."

cat >> "$CSS" <<'CSS'

/* ============================= */
/* HEADER */
/* ============================= */

.ac-header{
position:sticky;
top:0;
z-index:1000;
background:#fff;
border-bottom:1px solid #eee;
}

.ac-header-inner{
max-width:1200px;
margin:auto;
display:flex;
align-items:center;
justify-content:space-between;
padding:14px 20px;
font-family:Comfortaa,system-ui,sans-serif;
}

.ac-nav{
display:flex;
gap:28px;
}

.ac-nav a{
font-size:14px;
text-decoration:none;
color:#222;
}

.ac-btn-book{
background:#ff7a00;
color:#fff;
padding:10px 18px;
border-radius:10px;
text-decoration:none;
}

@media (max-width:900px){

.ac-nav{
display:none;
}

}

CSS

echo "5. Insert header HTML..."

HEADER='
<header class="ac-header">

<div class="ac-header-inner">

<a class="ac-logo" href="/">
<img src="/assets/aida-logo-small.png" width="42">
</a>

<nav class="ac-nav">

<a href="#program">Программа</a>
<a href="#team">Команда</a>
<a href="#reviews">Отзывы</a>
<a href="#location">Локация</a>

</nav>

<a class="ac-btn-book" href="#booking">
Записаться
</a>

</div>

</header>
'

awk -v header="$HEADER" '
/<body[^>]*>/{
print
print header
next
}
1
' "$HTML" > "$HTML.tmp"

mv "$HTML.tmp" "$HTML"

echo "6. Build project..."

chmod +x build.sh
./build.sh

echo "=== DONE ==="
echo "dist/index.html updated"