# 📱 Jewelry GST Calculator - PWA Setup Guide

Your app is now a fully functional **Progressive Web App (PWA)** that can be installed on mobile and desktop devices!

## ✅ What's Been Set Up

### PWA Files Created:
- ✅ `/public/manifest.json` - App metadata and configuration
- ✅ `/public/sw.js` - Service Worker for offline functionality
- ✅ `/index.html` - HTML with PWA meta tags
- ✅ `/src/main.tsx` - React entry point
- ✅ `/components/PWAInstallPrompt.tsx` - Install prompt UI

### Features Enabled:
- 📱 **Installable** - Can be installed on home screen (Android, iOS, Desktop)
- 🔌 **Offline Support** - Works without internet after first load
- 🎨 **Custom Theme** - Amber/Gold theme matching your app
- ⚡ **Fast Loading** - Cached for instant startup
- 📲 **Share Links** - Full URL sharing between devices

---

## 🚀 Deployment Options (FREE)

### Option 1: Netlify (Recommended - Easiest)

1. **Sign up** at [netlify.com](https://netlify.com) (free)
2. **Drag & drop** your project folder or connect GitHub
3. **Build settings:**
   - Build command: `npm run build` or `vite build`
   - Publish directory: `dist`
4. **Deploy!** - You'll get a URL like: `https://your-app.netlify.app`

**Custom domain:** You can add your own domain for free!

### Option 2: Vercel

1. **Sign up** at [vercel.com](https://vercel.com) (free)
2. **Import** your GitHub repo or upload files
3. **Auto-detects** React/Vite settings
4. **Deploy!** - URL: `https://your-app.vercel.app`

### Option 3: GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`
4. Enable Pages in repo settings
5. URL: `https://yourusername.github.io/repo-name`

### Option 4: Cloudflare Pages

1. **Sign up** at [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Connect** GitHub repo
3. **Build settings:**
   - Build command: `npm run build`
   - Build output: `dist`
4. **Deploy!** - URL: `https://your-app.pages.dev`

---

## 📱 How to Install on Different Devices

### Android (Chrome/Edge)
1. Open the deployed URL in Chrome
2. Tap the **"Install"** banner at the bottom
   - OR tap menu (⋮) → "Add to Home Screen" or "Install app"
3. App appears on home screen like a native app!

### iOS (Safari)
1. Open the deployed URL in Safari
2. Tap the **Share** button (□↑)
3. Scroll and tap **"Add to Home Screen"**
4. Tap "Add" - App appears on home screen!

### Desktop (Chrome/Edge)
1. Open the URL in Chrome/Edge
2. Look for **install icon** in address bar
   - OR click menu (⋮) → "Install [App Name]"
3. App opens in its own window!

### Desktop (Firefox)
1. Firefox doesn't support PWA installation yet
2. Users can bookmark or use from browser

---

## 🎨 Customizing Icons (Required)

Your app needs icons to look professional when installed!

### Quick Icon Generation:

**Option A - PWA Builder (Easiest):**
1. Go to: https://www.pwabuilder.com/imageGenerator
2. Upload a 512x512px image (gold gem/diamond design)
3. Download the generated icons
4. Extract to `/public/icons/` folder

**Option B - Favicon.io:**
1. Go to: https://favicon.io/favicon-generator/
2. Create icon with:
   - Text: "💎" or "G"
   - Background: `#f59e0b` (amber)
   - Font: Bold
3. Download and extract to `/public/icons/`

**Option C - Design Your Own:**
Create PNG files in these sizes:
- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512

Name them: `icon-[size].png` (e.g., `icon-192x192.png`)

---

## 🔗 Sharing Your App

Once deployed, you can share the link:

**Share from Desktop:**
```
https://your-app-name.netlify.app
```

Users on mobile can:
1. Click the link
2. Install it to their home screen
3. Use it like a native app!

**QR Code Sharing:**
1. Go to [qr-code-generator.com](https://www.qr-code-generator.com/)
2. Enter your app URL
3. Generate & download QR code
4. Print or share the QR code!

---

## ⚙️ Testing Your PWA

### Test PWA Features:

**Chrome DevTools:**
1. Open your deployed site
2. Press F12 → "Application" tab
3. Check:
   - ✅ Manifest loads correctly
   - ✅ Service Worker registered
   - ✅ Icons display properly
   - ✅ Installability shows "Installable"

**Lighthouse Audit:**
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Check "Progressive Web App"
4. Click "Generate report"
5. Aim for 90+ score!

**Mobile Testing:**
1. Deploy to free host
2. Open URL on your phone
3. Try installing it
4. Test offline mode (turn off wifi)

---

## 🌟 PWA Best Practices Implemented

✅ **Responsive Design** - Works on all screen sizes
✅ **Fast Loading** - Optimized performance
✅ **Offline Capable** - Service Worker caching
✅ **Installable** - Manifest with icons
✅ **HTTPS Required** - All free hosts provide this
✅ **Mobile-First** - Touch-friendly interface
✅ **Theme Color** - Matches system/app theme
✅ **App-like** - Standalone display mode

---

## 🎯 Quick Start Checklist

- [ ] Generate icons (see "Customizing Icons" above)
- [ ] Place icons in `/public/icons/` folder
- [ ] Choose a deployment platform (Netlify recommended)
- [ ] Deploy your app
- [ ] Test installation on mobile
- [ ] Share the URL with users!
- [ ] (Optional) Add custom domain
- [ ] (Optional) Generate QR code for sharing

---

## 📞 Troubleshooting

**"Install" button doesn't show:**
- Make sure you're using HTTPS (all free hosts provide this)
- Check icons are properly generated
- Try opening in Chrome/Edge (best PWA support)

**Service Worker not registering:**
- Check browser console for errors
- Make sure `/sw.js` is in the `/public` folder
- Clear browser cache and reload

**App not working offline:**
- Service Worker needs to cache on first visit
- Visit all important pages while online first
- Then test offline functionality

**iOS installation issues:**
- iOS only supports PWA via Safari (not Chrome)
- Must use "Add to Home Screen" from Share menu
- Icons should be 152x152 or larger

---

## 🎉 You're All Set!

Your Jewelry GST Calculator is now a professional PWA ready for mobile and desktop use!

**Next Steps:**
1. Generate your icons
2. Deploy to Netlify/Vercel (takes 2 minutes!)
3. Share the link
4. Users install from their devices

Need help? Check the deployment platform docs or PWA guides online!
