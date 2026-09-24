# Catppuccin Turbo for Google Antigravity 2.0 🚀

> **Version**: `2.0.1`  
> **Author**: `RedPanda-Craft`  
> **License**: [MIT](LICENSE)

An ultra-fast, host-aligned, zero-latency **Catppuccin Mocha & Latte** theme suite designed for **Google Antigravity 2.0** and **BetterGravity 3.0**. Engineered for extreme responsiveness, clean typography, breathing composer aura, and zero GPU overhead.

![Catppuccin Palette](https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png)

---

## ✨ What's New in v2.0.1

- 🌟 **Chat Composer Inset Breathing Focus Aura**:
  - Focus triggers a single, soothing 1.6s ambient breathing glow that seamlessly settles into a 30% warm accent aura without secondary sudden drops.
  - Dedicated GPU compositing layer (`transform: translateZ(0)`, `will-change: opacity`) isolates caret blinking from triggering layout reflows (0ms INP lag).
- 🎨 **BetterGravity Native TitleBar Accent Switcher Plugin**:
  - Optional plugin suite (`plugin/catppuccin-accent`) adds a titlebar palette icon for 1-click flavor and accent switching.
  - Context-aware lifecycle: automatically mounts only when Catppuccin is active.
- 💬 **First-Run Onboarding Callout Bubble**:
  - Native header callout bubble anchored under the palette icon for first-time users.
  - Completely decoupled storage isolation (`bettergravity:catppuccin:onboarding_v1`) and anti-drag (`-webkit-app-region: no-drag !important`).
- ⚡ **Turbo Performance Engine**:
  - Strips heavy CSS entrance animations and GPU blurs (`backdrop-filter: blur()`) to eliminate frame stutter during active LLM token streaming.

---

## 📦 Installation

### Method 1: Using BetterGravity (Recommended)

1. **Theme Installation**:
   Copy `catppuccin-turbo.css` into your themes folder:
   ```text
   %APPDATA%\BetterGravity\themes\catppuccin-turbo.css
   ```
   Enable it in `%APPDATA%\BetterGravity\settings.json`:
   ```json
   {
     "themes": {
       "enabled": ["catppuccin-turbo.css"]
     }
   }
   ```

2. **Accent Switcher Plugin (Optional)**:
   Copy the `plugin/catppuccin-accent` directory into:
   ```text
   %APPDATA%\BetterGravity\plugins\catppuccin-accent
   ```
   Enable `"catppuccin-accent"` in `settings.json` under `"plugins"`.

---

### Method 2: Without BetterGravity (Pure Antigravity / Electron Native)

This theme is standard, pure CSS and does not require BetterGravity to run:

#### Option A: DevTools Quick Injection
1. Open Developer Tools (`Ctrl + Shift + I`).
2. Run in Console:
   ```javascript
   fetch('https://raw.githubusercontent.com/RedPanda-Craft/catppuccin-antigravity-turbo/main/catppuccin-turbo.css')
     .then(r => r.text())
     .then(css => {
       const style = document.createElement('style');
       style.id = 'catppuccin-turbo';
       style.textContent = css;
       document.head.appendChild(style);
     });
   ```

---

## 🎨 14 Official Catppuccin Accents

Supported out-of-the-box:
`mauve`, `sapphire`, `peach`, `green`, `lavender`, `blue`, `rosewater`, `flamingo`, `pink`, `red`, `maroon`, `yellow`, `teal`, `sky`.

---

## 📄 License

Released under the [MIT License](LICENSE) © 2026 RedPanda-Craft & Catppuccin Contributors.
