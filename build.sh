#!/bin/bash

# GS-Plaza Business Center Build Script
# Version: 2.0
# Last change: 15.01.2026

echo "GS-Plaza Business Center Build Process Started..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if command -v node >/dev/null 2>&1; then
    print_status "Node.js found: $(node --version)"
else
    print_warning "Node.js not found. Some features may not work properly."
fi

# Check if npm is installed
if command -v npm >/dev/null 2>&1; then
    print_status "npm found: $(npm --version)"
else
    print_warning "npm not found. Some features may not work properly."
fi

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
    print_status "Installing project dependencies..."
    npm install --silent
    if [ $? -eq 0 ]; then
        print_status "Dependencies installed successfully."
    else
        print_error "Failed to install dependencies."
    fi
else
    print_warning "package.json not found. Skipping dependency installation."
fi

# Create dist directory if it doesn't exist
DIST_DIR="dist"
if [ ! -d "$DIST_DIR" ]; then
    mkdir -p "$DIST_DIR"
    print_status "Created distribution directory: $DIST_DIR"
fi

# Copy all files to dist directory
print_status "Copying files to distribution directory..."
rsync -av --exclude='dist/' --exclude='build.sh' --exclude='.git/' . "$DIST_DIR/"

# Minify CSS files
if command -v cleancss >/dev/null 2>&1; then
    print_status "Minifying CSS files..."
    cleancss -o "$DIST_DIR/assets/css/style.min.css" "$DIST_DIR/assets/css/style.css"
else
    print_warning "clean-css not found. Skipping CSS minification."
    cp "$DIST_DIR/assets/css/style.css" "$DIST_DIR/assets/css/style.min.css"
fi

# Minify JavaScript files
if command -v uglifyjs >/dev/null 2>&1; then
    print_status "Minifying JavaScript files..."
    uglifyjs "$DIST_DIR/assets/js/custom.js" -o "$DIST_DIR/assets/js/custom.min.js" -c -m
    uglifyjs "$DIST_DIR/assets/js/modern-enhancements.js" -o "$DIST_DIR/assets/js/modern-enhancements.min.js" -c -m
else
    print_warning "uglify-js not found. Skipping JavaScript minification."
    cp "$DIST_DIR/assets/js/custom.js" "$DIST_DIR/assets/js/custom.min.js"
    cp "$DIST_DIR/assets/js/modern-enhancements.js" "$DIST_DIR/assets/js/modern-enhancements.min.js"
fi

# Optimize images if imagemin is available
if command -v imagemin >/dev/null 2>&1; then
    print_status "Optimizing images..."
    find "$DIST_DIR/assets/img/" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" \) -exec imagemin {} -o {} \;
else
    print_warning "imagemin not found. Skipping image optimization."
fi

# Generate site map
print_status "Generating sitemap.xml..."
cat > "$DIST_DIR/sitemap.xml" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://your-domain.com/#main-features</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://your-domain.com/#new-apartments</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://your-domain.com/#gallery</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://your-domain.com/#contact</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
EOF

# Generate robots.txt
print_status "Generating robots.txt..."
cat > "$DIST_DIR/robots.txt" << EOF
User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml
EOF

# Generate .htaccess for Apache servers
print_status "Generating .htaccess file..."
cat > "$DIST_DIR/.htaccess" << EOF
# Enable compression
<IfModule mod_deflate.c>
  # Compress HTML, CSS, JavaScript, Text, XML and fonts
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
  AddOutputFilterByType DEFLATE application/x-font
  AddOutputFilterByType DEFLATE application/x-font-opentype
  AddOutputFilterByType DEFLATE application/x-font-otf
  AddOutputFilterByType DEFLATE application/x-font-truetype
  AddOutputFilterByType DEFLATE application/x-font-ttf
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE font/opentype
  AddOutputFilterByType DEFLATE font/otf
  AddOutputFilterByType DEFLATE font/ttf
  AddOutputFilterByType DEFLATE image/svg+xml
  AddOutputFilterByType DEFLATE image/x-icon
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
</IfModule>

# Cache static files
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/x-javascript "access plus 1 year"
  ExpiresByType text/x-javascript "access plus 1 year"
  ExpiresByType text/html "access plus 6 months"
  ExpiresByType text/htm "access plus 6 months"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/ico "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType application/font-woff "access plus 1 year"
  ExpiresByType application/vnd.ms-fontobject "access plus 1 year"
  ExpiresByType font/opentype "access plus 1 year"
  ExpiresByType font/ttf "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Enable browser caching
<IfModule mod_headers.c>
  <filesMatch "\\.(css|jpg|jpeg|png|gif|js|ico|svg)$">
    Header set Cache-Control "public, max-age=31536000"
  </filesMatch>
</IfModule>
EOF

print_status "Build process completed successfully!"
echo ""
echo "Distribution files are located in the '$DIST_DIR' directory."
echo "To serve the site locally, run: npx serve $DIST_DIR"
echo ""