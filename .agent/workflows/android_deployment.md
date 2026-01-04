---
description: Deploy React App to Android using Capacitor
---

# Deploy to Android with Capacitor

This guide explains how to package your React/Vite application as a native Android app using Capacitor.

## Prerequisites
- **Android Studio** must be installed on your machine.
- A connected Android device OR an Android Emulator running.

## Step 1: Install Dependencies
Install the necessary Capacitor packages.
```powershell
npm install @capacitor/core @capacitor/cli @capacitor/android
```

## Step 2: Initialize Capacitor
Initialize Capacitor with your app name and package ID.
```powershell
npx cap init "Cybertree Gen" com.cybertree.generator --web-dir dist
```
*Note: We set `--web-dir dist` because Vite builds to `dist`.*

## Step 3: Configure `capacitor.config.json` (Optional)
Capacitor should create a `capacitor.config.json` or `.ts`. Ensure `webDir` is set to `dist`.

```json
{
  "appId": "com.cybertree.generator",
  "appName": "Cybertree Gen",
  "webDir": "dist",
  "server": {
    "androidScheme": "https"
  }
}
```

## Step 4: Build Your Web App
You must build your React app before syncing.
```powershell
npm run build
```

## Step 5: Add Android Platform
Add the Android native project folder.
```powershell
npx cap add android
```

## Step 6: Sync & Open
Sync your web assets to the native project and open it in Android Studio.

```powershell
npx cap sync
npx cap open android
```

## Step 7: Build in Android Studio
1. Android Studio will open the `android` folder.
2. Wait for Gradle sync to finish.
3. Connect your phone via USB (with Developer Mode and USB Debugging enabled) OR create an AVD (Emulator).
4. Click the Green "Run" (Play) icon in the top toolbar.

## Troubleshooting
- **White Screen on Launch**: Ensure `base: './'` is NOT set in `vite.config.ts`. Capacitor apps are served from a local web server, so absolute paths usually work best, or ensure your router handles relative paths correctly.
- **Back Button**: You may need to install the `@capacitor/app` plugin to handle hardware back button presses.
