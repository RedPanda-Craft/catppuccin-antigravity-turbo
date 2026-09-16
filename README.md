# Catppuccin Turbo for Google Antigravity 2.0 🚀

An ultra-fast, zero-latency **Catppuccin Mocha** theme designed for **Google Antigravity 2.0**. Engineered for extreme responsiveness, clean typography, and zero GPU overhead.

![Catppuccin Palette](https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png)

## ✨ Highlights

- ⚡ **Turbo Performance Engine**:
  - Neutralizes 8 heavy native CSS entrance animations (`fade-in`, `blobEntrance`, `logoEntrance`, `parentFade`, `textEntrance`, etc.) for instantaneous UI transitions.
  - Strips out heavy GPU composition filters (`backdrop-filter: blur()`, diffuse drop-shadows) to reduce idle power draw and eliminate frame drops during chat and streaming.
- 🎨 **Obsidian-Style Modular Accents**:
  - Built-in with all 14 official Catppuccin accents (`mauve`, `sapphire`, `peach`, `green`, `lavender`, `blue`, `rosewater`, `flamingo`, `pink`, `red`, `maroon`, `yellow`, `teal`, `sky`).
  - Switch the entire application accent color simply by editing a single variable line!
- 🎯 **Precision State Machine for Prompt Composer**:
  - Distinct active vs. disabled send button styling — no more confusing solid purple blocks when empty.
- 🐾 **BetterGravity & Pets Ready**:
  - 100% compatible with BetterGravity desktop companions (Pets plugin) without distorting sprite sheets or animations.
- 🔓 **Framework Independent**:
  - Can be used seamlessly **with or without BetterGravity**.

---

## 📦 Installation

### Method 1: Using BetterGravity (Recommended, Hot-Reloadable)

1. Copy `catppuccin-turbo.css` into your BetterGravity themes folder:
   ```text
   %APPDATA%\BetterGravity\themes\catppuccin-turbo.css
   ```
2. Enable it in **Settings → BetterGravity → Themes**, or by adding `"catppuccin-turbo.css"` to `settings.json`:
   ```json
   {
     "themes": {
       "enabled": ["catppuccin-turbo.css"]
     }
   }
   ```
3. The UI will hot-reload instantly.

---

### Method 2: Without BetterGravity (Pure Antigravity / Electron Native)

This theme is standard, pure CSS and does **not** require BetterGravity to run:

#### Option A: DevTools Quick Injection
1. Start Antigravity and open Developer Tools (`Ctrl + Shift + I` or through `--remote-debugging-port`).
2. In the Console, run:
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

#### Option B: Permanent Local Injection
Append the contents of `catppuccin-turbo.css` to Antigravity's web entry CSS bundle or use any standard CSS loader.

---

## 🎨 Customizing Accent Colors

Open `catppuccin-turbo.css` and modify lines 32–36:

```css
/* >>> [Active Accent Toggle] <<< */
--catppuccin-accent: var(--ctp-mauve); /* Try: var(--ctp-sapphire), var(--ctp-peach), var(--ctp-green) */

/* Optional: Dedicated button accent */
--catppuccin-button-accent: var(--catppuccin-accent);
```

Save the file, and the interface will update in milliseconds!

---

## 📄 License

[MIT License](LICENSE) © 2026 RedPanda-Craft & Catppuccin Contributors
