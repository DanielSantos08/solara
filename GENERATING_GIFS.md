# Generating Animated Weather Icon GIFs

This guide shows how to create animated GIFs of Solara's weather icons using the interactive demo page.

---

## Quick Start (3 Steps)

### 1. Start the development server
```bash
npm run dev
```

### 2. Open the demo page
Navigate to: **http://localhost:3000/weather-icons-demo.html**

### 3. Record GIFs
- **Windows:** [ScreenToGif](https://www.screentogif.com/)
- **macOS:** [Gifox](https://gifox.app/) or [Kap](https://getkap.co/)
- **Linux:** `sudo apt install peek`

---

## Method 1: Using the Demo Page (Recommended)

### Recording Tools

#### Windows
- **ScreenToGif** (Free and best option)
  - Download: https://www.screentogif.com/
  - Install and open
  - Click "Recorder"
  - Select the icon area
  - Record for 3-5 seconds
  - Click "Stop" then "Editor"
  - Save as GIF

#### macOS
- **Gifox** (Free)
  - Download: https://gifox.app/
  - Install and open
  - Cmd + Shift + 5 to select area
  - Record icon for 3-5 seconds
  - Save GIF

- **Kap** (Free and Open Source)
  - Download: https://getkap.co/
  - Install and open
  - Select icon area
  - Record and export as GIF

#### Linux
- **Peek** (Free)
  ```bash
  # Ubuntu/Debian
  sudo apt install peek
  
  # Fedora
  sudo dnf install peek
  
  # Arch
  sudo pacman -S peek
  ```
  - Open Peek
  - Position window over the icon
  - Click "Record"
  - Record for 3-5 seconds
  - Click "Stop" and save

### Recommended Settings
- **Duration:** 3-5 seconds
- **FPS:** 30 fps
- **Size:** 200x200px or 300x300px
- **Quality:** High (for README)
- **Loop:** Infinite

### Saving the GIFs
Save to folder: `public/components_readme/`

Suggested names:
- `WeatherIcon-Sun.gif`
- `WeatherIcon-Cloud.gif`
- `WeatherIcon-Rain.gif`
- `WeatherIcon-Thunder.gif`
- `WeatherIcon-Snow.gif`
- `WeatherIcon-Moon-NewMoon.gif`
- `WeatherIcon-Moon-FirstQuarter.gif`
- `WeatherIcon-Moon-FullMoon.gif`

---

## Method 2: Using FFmpeg (Advanced)

If you have FFmpeg installed, you can convert videos to GIFs:

```bash
# Record screen with OBS Studio or QuickTime
# Then convert to GIF:

ffmpeg -i input.mp4 -vf "fps=30,scale=300:-1:flags=lanczos" -loop 0 output.gif
```

---

## Method 3: Using Playwright (Automated)

### Install Playwright
```bash
npm install -D playwright
```

### Create capture script
```javascript
// capture-icons.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/weather-icons-demo.html');
  
  // Capture each icon
  const icons = await page.$$('.icon-card');
  
  for (let i = 0; i < icons.length; i++) {
    await icons[i].screenshot({ 
      path: `public/components_readme/icon-${i}.png` 
    });
  }
  
  await browser.close();
})();
```

### Run
```bash
node capture-icons.js
```

**Note:** This method generates static PNGs. For animated GIFs, use Method 1.

---

## Method 4: Online (No Installation)

### Using ezgif.com
1. Visit: https://ezgif.com/video-to-gif
2. Record screen using:
   - Windows: Win + G (Xbox Game Bar)
   - Mac: Cmd + Shift + 5
   - Linux: Kazam or SimpleScreenRecorder
3. Upload video to ezgif.com
4. Adjust settings:
   - Size: 300x300
   - FPS: 30
   - Method: Lanczos3
5. Convert and download GIF

---

## Updating README.md

After generating the GIFs, update the README:

```markdown
## Screenshots

### Weather Icons

| Sun | Cloud | Rain | Thunder | Snow |
|-----|-------|------|---------|------|
| ![Sun](public/components_readme/WeatherIcon-Sun.gif) | ![Cloud](public/components_readme/WeatherIcon-Cloud.gif) | ![Rain](public/components_readme/WeatherIcon-Rain.gif) | ![Thunder](public/components_readme/WeatherIcon-Thunder.gif) | ![Snow](public/components_readme/WeatherIcon-Snow.gif) |

### Moon Phases

| New Moon | First Quarter | Full Moon |
|----------|---------------|-----------|
| ![New Moon](public/components_readme/WeatherIcon-Moon-NewMoon.gif) | ![First Quarter](public/components_readme/WeatherIcon-Moon-FirstQuarter.gif) | ![Full Moon](public/components_readme/WeatherIcon-Moon-FullMoon.gif) |
```

---

## Tips for Quality GIFs

1. **Background:** Use white background or smooth gradient
2. **Size:** Not too large (< 1MB per GIF)
3. **Duration:** 3-5 seconds is ideal
4. **Loop:** Configure for infinite loop
5. **Optimization:** Use tools like:
   - https://ezgif.com/optimize
   - https://www.iloveimg.com/compress-image/compress-gif
6. **Consistency:** All GIFs should have the same size

---

## Recommended Tools by Platform

| Platform | Tool | Free? | Link |
|----------|------|-------|------|
| Windows | ScreenToGif | Yes | https://www.screentogif.com/ |
| macOS | Gifox | Yes | https://gifox.app/ |
| macOS | Kap | Yes | https://getkap.co/ |
| Linux | Peek | Yes | https://github.com/phw/peek |
| Online | ezgif | Yes | https://ezgif.com/ |

---

## Expected Result

After following this guide, you will have:
- 8+ animated weather icon GIFs
- GIFs saved in `public/components_readme/`
- README.md updated with the GIFs
- Professional visual documentation for the project

**Estimated time:** 15-30 minutes

