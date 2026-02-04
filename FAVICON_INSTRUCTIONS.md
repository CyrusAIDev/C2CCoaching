# Favicon Instructions - C2C Logo in White Circle

## What You Need

Create favicon images with the C2C logo centered in a white circle, where the logo fills approximately 70-80% of the circle.

## Files to Create

### 1. `favicon.ico` (32x32 pixels)
- White circle background
- "C2C" text in navy blue (#0A2540)
- Bold, sans-serif font (Inter or similar)
- Logo should fill most of the circle

### 2. `icon-light-32x32.png` (32x32 pixels)
- Same as favicon.ico but PNG format
- Used when browser is in light mode

### 3. `icon-dark-32x32.png` (32x32 pixels)
- White circle background
- "C2C" text in navy blue (#0A2540)
- Same design as light version
- Used when browser is in dark mode

### 4. `apple-icon.png` (180x180 pixels)
- Higher resolution version for Apple devices
- White circle background
- "C2C" text in navy blue (#0A2540)
- Logo fills 70-80% of the circle

### 5. `icon.svg` (Already created)
- Vector version for modern browsers
- Scalable to any size

## Design Specifications

**Colors:**
- Background: White (#FFFFFF)
- Text: C2C Navy (#0A2540)
- Font: Inter, Bold, 700 weight

**Layout:**
- Circle should fill the entire canvas
- "C2C" text should be centered both horizontally and vertically
- Text size should be approximately 40-45% of the canvas height
- Leave small margins (10-15%) on all sides

## How to Create (Using Design Tools)

### Option 1: Figma/Sketch/Adobe XD
1. Create a 32x32px artboard (or 180x180px for Apple icon)
2. Draw a white circle that fills the canvas
3. Add "C2C" text in Inter Bold, navy blue color
4. Center text horizontally and vertically
5. Adjust font size so text fills 70-80% of circle
6. Export as PNG with transparent background (circle will show white)

### Option 2: Using the Actual C2C Logo Image
1. Open `/public/images/c2c-logo.png` in an image editor
2. Create a new canvas at the required size (32x32 or 180x180)
3. Fill with white circle
4. Place and scale the C2C logo to fill 70-80% of the circle
5. Flatten and export

### Option 3: Online Favicon Generator
1. Go to https://favicon.io/ or https://realfavicongenerator.net/
2. Upload the C2C logo image
3. Configure:
   - Add white circle background
   - Scale logo to fill most of the space
   - Generate all required sizes

## Quick Command Line (ImageMagick)

If you have ImageMagick installed:

```bash
# Create base image with white circle and C2C text
convert -size 32x32 xc:white \
  -fill "#0A2540" -font Inter-Bold -pointsize 14 \
  -gravity center -annotate +0+0 "C2C" \
  favicon.ico

# Create 180x180 for Apple
convert -size 180x180 xc:white \
  -fill "#0A2540" -font Inter-Bold -pointsize 80 \
  -gravity center -annotate +0+0 "C2C" \
  apple-icon.png
```

## Verify Installation

After creating the files:
1. Place all files in `/public/` directory
2. Clear browser cache
3. Reload your website
4. Check browser tab - you should see the C2C logo in a white circle

## Current Configuration

The favicon is already configured in `app/layout.tsx` to use:
- ✅ `/icon.svg` (vector, already created and working)
- ⚠️ `/favicon.ico` (needs creation - for maximum browser compatibility)
- ⚠️ `/icon-light-32x32.png` (needs creation)
- ⚠️ `/icon-dark-32x32.png` (needs creation)  
- ⚠️ `/apple-icon.png` (needs creation)

**Current Status:** The SVG version (`icon.svg`) is already created and working in modern browsers. However, for full compatibility across all browsers and devices, you should create the PNG and ICO versions.

## Temporary Solution

For now, the SVG favicon will display in most modern browsers (Chrome, Firefox, Safari, Edge). The C2C logo in a white circle is already visible in your browser tab.

## Priority

**High Priority (Create ASAP):**
1. `favicon.ico` - for older browsers and maximum compatibility
2. `apple-icon.png` - for iOS devices

**Medium Priority:**
3. `icon-light-32x32.png` - for light mode
4. `icon-dark-32x32.png` - for dark mode

You can use the SVG file (`/public/icon.svg`) as a reference for the design when creating the PNG/ICO versions.
