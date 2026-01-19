# 📸 Terminal Screenshot Guide

This guide will help you capture beautiful terminal screenshots for the Dev Time Tracker CLI documentation.

## 🎯 Quick Screenshot Tips

### Best Practices

1. **Use a clean terminal** - Clear your terminal before taking screenshots
2. **Consistent font** - Use a monospace font (e.g., Fira Code, JetBrains Mono)
3. **Good contrast** - Use dark theme for better readability
4. **Proper sizing** - Capture at 80-120 columns width
5. **Remove clutter** - Hide unnecessary UI elements

## 🛠️ Tools for Taking Screenshots

### macOS

#### Option 1: Built-in Screenshot (⌘ + Shift + 4)
- Press `⌘ + Shift + 4`
- Select the terminal window
- Screenshot saved to Desktop

#### Option 2: Terminal.app Screenshot Feature
- Right-click terminal window
- Select "Capture Screen" or use `⌘ + Shift + S`

#### Option 3: Third-party Tools
- **CleanShot X** - Professional screenshot tool
- **Kap** - Open-source screen recorder
- **Shottr** - Free screenshot tool

### Linux

#### Option 1: Built-in Screenshot
```bash
# GNOME
gnome-screenshot -w

# KDE
spectacle

# Generic
import -window root screenshot.png
```

#### Option 2: Terminal Tools
```bash
# Using ImageMagick
import -window root screenshot.png

# Using scrot
scrot -s screenshot.png
```

### Windows

#### Option 1: Snipping Tool
- Press `Windows + Shift + S`
- Select terminal window
- Screenshot copied to clipboard

#### Option 2: PowerShell Screenshot
```powershell
Add-Type -AssemblyName System.Windows.Forms,System.Drawing
$bounds = [System.Windows.Forms.SystemInformation]::VirtualScreen
$bmp = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size)
$bmp.Save("screenshot.png")
```

## 📝 Creating Animated GIFs

### macOS

#### Option 1: Kap (Recommended)
1. Download [Kap](https://getkap.co/)
2. Select terminal window
3. Record your commands
4. Export as GIF

#### Option 2: LICEcap
1. Download [LICEcap](https://www.cockos.com/licecap/)
2. Position window over terminal
3. Click record
4. Execute commands
5. Stop and save as GIF

### Linux

#### Using Peek
```bash
# Install peek
sudo apt install peek  # Ubuntu/Debian
sudo dnf install peek  # Fedora

# Run peek
peek
```

#### Using byzanz
```bash
# Install byzanz
sudo apt install byzanz

# Record terminal
byzanz-record -d 30 -x 0 -y 0 -w 800 -h 600 demo.gif
```

### Windows

#### Using ScreenToGif
1. Download [ScreenToGif](https://www.screentogif.com/)
2. Select terminal window
3. Record commands
4. Export as GIF

## 🎨 Terminal Setup for Screenshots

### Recommended Terminal Settings

#### Font
- **Font Family**: Fira Code, JetBrains Mono, or Source Code Pro
- **Font Size**: 14-16px
- **Line Height**: 1.2-1.5

#### Colors (Dark Theme)
- **Background**: #1e1e1e or #0d1117 (GitHub dark)
- **Foreground**: #d4d4d4
- **Cursor**: #007acc

#### Window Size
- **Width**: 80-120 columns
- **Height**: 25-30 rows
- **Padding**: 10-20px

### Example Terminal Configurations

#### iTerm2 (macOS)
```json
{
  "font": "Fira Code",
  "fontSize": 14,
  "theme": "Dark Background",
  "transparency": 0.1
}
```

#### Windows Terminal
```json
{
  "font": {
    "face": "JetBrains Mono",
    "size": 14
  },
  "colorScheme": "Campbell Powershell",
  "background": "#1e1e1e"
}
```

## 📋 Screenshot Checklist

Before taking screenshots:

- [ ] Terminal is clean (no previous commands visible)
- [ ] Font is readable and consistent
- [ ] Colors have good contrast
- [ ] Window size is appropriate (80-120 columns)
- [ ] No personal information visible
- [ ] Commands are clearly visible
- [ ] Output is formatted nicely

## 🎬 Creating Demo GIF

### Step-by-Step Process

1. **Prepare your terminal**
   ```bash
   clear
   # Set terminal to 100 columns width
   ```

2. **Record the demo**
   - Start screen recorder
   - Run example commands:
     ```bash
     track start "Demo Project"
     track status
     track stop
     track report --today
     ```
   - Stop recording

3. **Edit the GIF** (optional)
   - Remove unnecessary frames
   - Add delays between commands
   - Optimize file size

4. **Save to examples/demo.gif**

### Recommended Demo Script

```bash
#!/bin/bash
clear
echo "Dev Time Tracker CLI Demo"
echo "========================"
echo ""
sleep 1
track start "Demo Project"
sleep 2
track status
sleep 2
track stop
sleep 1
track report --today
```

## 🖼️ Image Optimization

### Tools for Optimization

#### macOS
```bash
# Using ImageOptim (GUI)
# Download from: https://imageoptim.com/

# Using pngquant (CLI)
brew install pngquant
pngquant --quality=65-80 screenshot.png
```

#### Linux
```bash
# Using optipng
sudo apt install optipng
optipng -o7 screenshot.png

# Using pngquant
sudo apt install pngquant
pngquant --quality=65-80 screenshot.png
```

#### Online Tools
- [TinyPNG](https://tinypng.com/) - Compress PNG files
- [EZGIF](https://ezgif.com/) - Optimize GIFs
- [Squoosh](https://squoosh.app/) - Image compression

## 📐 Screenshot Dimensions

### Recommended Sizes

| Type | Width | Height | Format |
|------|-------|--------|--------|
| Command Screenshot | 800-1200px | Auto | PNG |
| Full Terminal | 1200-1600px | Auto | PNG |
| Demo GIF | 800-1000px | Auto | GIF |
| README Banner | 1200px | Auto | PNG |

## 🎯 Example Screenshots to Capture

1. **Help Command**
   ```bash
   track --help
   ```

2. **Start Command**
   ```bash
   track start "My Project"
   ```

3. **Status Command**
   ```bash
   track status
   ```

4. **Stop Command**
   ```bash
   track stop
   ```

5. **Report Command**
   ```bash
   track report --today
   ```

6. **Config Command**
   ```bash
   track config --list
   ```

## 💡 Pro Tips

1. **Use consistent terminal theme** across all screenshots
2. **Add subtle padding** around terminal window
3. **Highlight important parts** with arrows or boxes (optional)
4. **Keep file sizes small** for faster loading
5. **Use descriptive filenames** (e.g., `track-start-command.png`)
6. **Create a screenshots/ directory** to organize images

## 🔗 Resources

- [Kap - Screen Recorder](https://getkap.co/)
- [LICEcap - GIF Recorder](https://www.cockos.com/licecap/)
- [ScreenToGif - Windows GIF Tool](https://www.screentogif.com/)
- [ImageOptim - Image Optimizer](https://imageoptim.com/)
- [TinyPNG - PNG Compressor](https://tinypng.com/)

---

**Happy Screenshotting! 📸**
