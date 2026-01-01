# Icon Setup Guide

Your app icon has been configured for Vercel and PWA! 🎨

## Required Icons

You need to create the following icon files in the `public/` folder:

1. **favicon-16.png** - 16x16 pixels
2. **favicon-32.png** - 32x32 pixels
3. **icon-192.png** - 192x192 pixels
4. **icon-512.png** - 512x512 pixels
5. **apple-touch-icon.png** - 180x180 pixels

## How to Create Icons from Your Existing Image

You already have `Apps Icon.png` in your public folder. Here are ways to convert it:

### Option 1: Online Tool (Easiest)
1. Go to https://favicon.io/
2. Upload your `Apps Icon.png`
3. Download the generated icon pack
4. Extract and place the following files in `public/`:
   - Rename `favicon-16x16.png` → `favicon-16.png`
   - Rename `favicon-32x32.png` → `favicon-32.png`
   - Use the `android-chrome-192x192.png` → `icon-192.png`
   - Use the `android-chrome-512x512.png` → `icon-512.png`
   - Rename `apple-touch-icon.png` → `apple-touch-icon.png`

### Option 2: Using ImageMagick (Command Line)
If you have ImageMagick installed:

```powershell
magick "public/Apps Icon.png" -resize 16x16 public/favicon-16.png
magick "public/Apps Icon.png" -resize 32x32 public/favicon-32.png
magick "public/Apps Icon.png" -resize 192x192 public/icon-192.png
magick "public/Apps Icon.png" -resize 512x512 public/icon-512.png
magick "public/Apps Icon.png" -resize 180x180 public/apple-touch-icon.png
```

### Option 3: Using Paint.NET / Photoshop
1. Open `public/Apps Icon.png`
2. For each size:
   - Image → Resize
   - Enter the dimensions (16x16, 32x32, etc.)
   - Save as PNG with the appropriate name

## Icon Purposes

| Icon File | Size | Purpose |
|-----------|-------|---------|
| favicon-16.png | 16x16 | Browser tab icon (small) |
| favicon-32.png | 32x32 | Browser tab icon (large) |
| icon-192.png | 192x192 | PWA icon (Android) |
| icon-512.png | 512x512 | PWA splash screen |
| apple-touch-icon.png | 180x180 | iOS home screen icon |

## Vercel Icon

For Vercel, you can also add a `vercel.png` in the root directory:
- Size: 200x200 or 500x500 pixels
- Format: PNG with transparent background (recommended)

## Verification

Once icons are added:
1. Run `npm run dev`
2. Open http://localhost:5173
3. Check browser tab for favicon
4. On mobile, "Add to Home Screen" should show the PWA icon

## Notes

- **Icons should be square** (equal width and height)
- **PNG format is recommended** for all icons
- **Transparent background** works best for web icons
- **High contrast** colors improve visibility
