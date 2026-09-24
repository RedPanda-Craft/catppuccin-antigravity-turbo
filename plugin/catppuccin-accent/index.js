// ============================================================================
// Catppuccin Accent & Flavor Switcher Plugin (catppuccin-accent)
//
// Context-aware dynamic theme manager for Catppuccin Turbo:
// 1. Supports 4 Official Flavors: Mocha, Macchiato, Frappé, Latte.
// 2. Supports 14 Official Accent Colors with color-matched glows.
// 3. Two-tier layout: Flavor segment switcher + 14 Accent color dots (56 presets).
// 4. Zero-reload real-time CSS custom property injection & durable persistence.
// 5. Context-aware lifecycle: only appears and takes effect when Catppuccin is active.
// ============================================================================

(function () {
  "use strict";

  // --- Official Catppuccin 4 Flavors Palette Definition ---
  const CTP_FLAVORS = {
    mocha: {
      id: "mocha",
      name: "Mocha",
      label: "Mocha (Dark)",
      isDark: true,
      colors: {
        base: "#1e1e2e", mantle: "#181825", crust: "#11111b",
        surface0: "#313244", surface1: "#45475a", surface2: "#585b70",
        overlay0: "#6c7086", overlay1: "#7f849c", overlay2: "#9399b2",
        subtext0: "#a6adc8", subtext1: "#bac2de", text: "#cdd6f4",
        rosewater: "#f5e0dc", flamingo: "#f2cdcd", pink: "#f5c2e7",
        mauve: "#cba6f7", red: "#f38ba8", maroon: "#eba0ac",
        peach: "#fab387", yellow: "#f9e2af", green: "#a6e3a1",
        teal: "#94e2d5", sky: "#89dceb", sapphire: "#74c7ec",
        blue: "#89b4fa", lavender: "#b4befe"
      }
    },
    macchiato: {
      id: "macchiato",
      name: "Macchiato",
      label: "Macchiato (Mid)",
      isDark: true,
      colors: {
        base: "#24273a", mantle: "#1e2030", crust: "#181926",
        surface0: "#363a4f", surface1: "#494d64", surface2: "#5b6078",
        overlay0: "#6e738d", overlay1: "#8087a2", overlay2: "#939ab7",
        subtext0: "#a5adcb", subtext1: "#b8c0e0", text: "#cad3f5",
        rosewater: "#f4dbd6", flamingo: "#f0c6c6", pink: "#f5bde6",
        mauve: "#c6a0f6", red: "#ed8796", maroon: "#ee99a0",
        peach: "#f5a97f", yellow: "#eed49f", green: "#a6da95",
        teal: "#8bd5ca", sky: "#91d7e3", sapphire: "#7dc4e4",
        blue: "#8aadf4", lavender: "#b7bdf8"
      }
    },
    frappe: {
      id: "frappe",
      name: "Frappé",
      label: "Frappé (Muted)",
      isDark: true,
      colors: {
        base: "#303446", mantle: "#292c3c", crust: "#232634",
        surface0: "#414559", surface1: "#51576d", surface2: "#626880",
        overlay0: "#737994", overlay1: "#838ba7", overlay2: "#949cbb",
        subtext0: "#a5adce", subtext1: "#b5bfe2", text: "#c6d0f5",
        rosewater: "#f2d5cf", flamingo: "#eebebe", pink: "#f4b8e4",
        mauve: "#ca9ee6", red: "#e78284", maroon: "#ea999c",
        peach: "#ef9f76", yellow: "#e5c890", green: "#a6d189",
        teal: "#81c8be", sky: "#99d1db", sapphire: "#85c1dc",
        blue: "#8caaee", lavender: "#babbf1"
      }
    },
    latte: {
      id: "latte",
      name: "Latte",
      label: "Latte (Light)",
      isDark: false,
      colors: {
        base: "#eff1f5", mantle: "#e6e9ef", crust: "#dce0e8",
        surface0: "#ccd0da", surface1: "#bcc0cc", surface2: "#acb0be",
        overlay0: "#9ca0b0", overlay1: "#8c8fa1", overlay2: "#7c7f93",
        subtext0: "#6c6f85", subtext1: "#5c5f77", text: "#4c4f69",
        rosewater: "#dc8a78", flamingo: "#dd7878", pink: "#ea76cb",
        mauve: "#8839ef", red: "#d20f39", maroon: "#e64553",
        peach: "#fe640b", yellow: "#df8e1d", green: "#40a02b",
        teal: "#179299", sky: "#04a5e5", sapphire: "#209fb5",
        blue: "#1e66f5", lavender: "#7287fd"
      }
    }
  };

  const ACCENT_KEYS = [
    { id: "rosewater", name: "Rosewater" },
    { id: "flamingo",  name: "Flamingo" },
    { id: "pink",      name: "Pink" },
    { id: "mauve",     name: "Mauve" },
    { id: "red",       name: "Red" },
    { id: "maroon",    name: "Maroon" },
    { id: "peach",     name: "Peach" },
    { id: "yellow",    name: "Yellow" },
    { id: "green",     name: "Green" },
    { id: "teal",      name: "Teal" },
    { id: "sky",       name: "Sky" },
    { id: "sapphire",  name: "Sapphire" },
    { id: "blue",      name: "Blue" },
    { id: "lavender",  name: "Lavender" }
  ];

  // Material Symbols palette icon path
  const PALETTE_ICON = "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm-180-240q25 0 42.5-17.5T360-460q0-25-17.5-42.5T300-520q-25 0-42.5 17.5T240-460q0 25 17.5 42.5T300-400Zm120-140q25 0 42.5-17.5T480-600q0-25-17.5-42.5T420-660q-25 0-42.5 17.5T360-600q0 25 17.5 42.5T420-540Zm180 40q25 0 42.5-17.5T660-560q0-25-17.5-42.5T600-620q-25 0-42.5 17.5T540-560q0 25 17.5 42.5T600-500Z";

  let buttonHandle = null;
  let popupEl = null;
  let currentFlavorId = "mocha";
  let currentAccentId = "peach";
  let observer = null;

  function isCatppuccinActive() {
    const hasThemeTag = !!document.querySelector('style[data-bettergravity-theme*="catppuccin"]');
    if (hasThemeTag) return true;
    const ctpBase = getComputedStyle(document.documentElement).getPropertyValue('--ctp-base');
    return !!(ctpBase && ctpBase.trim());
  }

  function getSavedConfig() {
    let flavor = "mocha";
    let accent = "peach";
    try {
      const savedFlavor = plugin.storage?.get("flavor") || localStorage.getItem("__bettergravity_ctp_flavor");
      if (savedFlavor && CTP_FLAVORS[savedFlavor]) flavor = savedFlavor;
      const savedAccent = plugin.storage?.get("accent") || localStorage.getItem("__bettergravity_ctp_accent");
      if (savedAccent && ACCENT_KEYS.some(a => a.id === savedAccent)) accent = savedAccent;
    } catch (e) {}
    return { flavor, accent };
  }

  function applyConfig(flavorId, accentId, save = true) {
    const flavor = CTP_FLAVORS[flavorId] || CTP_FLAVORS.mocha;
    const accentKey = ACCENT_KEYS.some(a => a.id === accentId) ? accentId : "peach";
    const colors = flavor.colors;
    const accentHex = colors[accentKey] || colors.peach;
    const isDark = flavor.isDark;

    currentFlavorId = flavor.id;
    currentAccentId = accentKey;

    const root = document.documentElement;

    // 1. Catppuccin Base Scales
    root.style.setProperty("--ctp-base", colors.base);
    root.style.setProperty("--ctp-mantle", colors.mantle);
    root.style.setProperty("--ctp-crust", colors.crust);
    root.style.setProperty("--ctp-surface0", colors.surface0);
    root.style.setProperty("--ctp-surface1", colors.surface1);
    root.style.setProperty("--ctp-surface2", colors.surface2);
    root.style.setProperty("--ctp-overlay0", colors.overlay0);
    root.style.setProperty("--ctp-overlay1", colors.overlay1);
    root.style.setProperty("--ctp-overlay2", colors.overlay2);
    root.style.setProperty("--ctp-subtext0", colors.subtext0);
    root.style.setProperty("--ctp-subtext1", colors.subtext1);
    root.style.setProperty("--ctp-text", colors.text);

    // 2. All 14 Accents for this Flavor
    ACCENT_KEYS.forEach((acc) => {
      root.style.setProperty(`--ctp-${acc.id}`, colors[acc.id]);
    });

    // 3. Active Accent & Button Variables
    const glowColor = `${accentHex}38`;
    root.style.setProperty("--catppuccin-accent", accentHex);
    root.style.setProperty("--catppuccin-button-accent", accentHex);
    root.style.setProperty("--catppuccin-accent-glow", glowColor);

    // 4. Host Tokens
    root.style.setProperty("--background", colors.base);
    root.style.setProperty("--foreground", colors.text);
    root.style.setProperty("--primary", accentHex);
    root.style.setProperty("--primary-foreground", isDark ? colors.crust : colors.base);
    root.style.setProperty("--secondary", colors.surface0);
    root.style.setProperty("--secondary-foreground", colors.text);
    root.style.setProperty("--muted", colors.mantle);
    root.style.setProperty("--muted-foreground", colors.subtext0);
    root.style.setProperty("--border", colors.surface0);
    root.style.setProperty("--card", colors.mantle);
    root.style.setProperty("--card-border", colors.surface0);
    root.style.setProperty("--sidebar", colors.crust);
    root.style.setProperty("--sidebar-secondary", colors.base);
    root.style.setProperty("--sidebar-muted", colors.overlay1);
    root.style.setProperty("--placeholder", colors.overlay0);
    root.style.setProperty("--link", colors.blue);
    root.style.setProperty("--focus-ring-color", accentHex);

    // 5. BetterGravity Runtime Shared Tokens
    root.style.setProperty("--bettergravity-accent", accentHex);
    root.style.setProperty("--bettergravity-accent-soft", glowColor);
    root.style.setProperty("--bettergravity-surface", colors.mantle);
    root.style.setProperty("--bettergravity-border", colors.surface0);
    root.style.setProperty("--bettergravity-text", colors.text);
    root.style.setProperty("--bettergravity-row-hover", isDark ? "rgba(205, 214, 244, 0.08)" : "rgba(76, 79, 105, 0.08)");
    root.style.setProperty("--gemini-row-selected", colors.surface0);
    root.style.setProperty("--gemini-row-hover", isDark ? "rgba(205, 214, 244, 0.08)" : "rgba(76, 79, 105, 0.08)");

    // 6. Direct Studio & Gemini Host Runtime Tokens
    root.style.setProperty("--studio-surface", colors.base);
    root.style.setProperty("--gemini-surface", colors.surface0);
    root.style.setProperty("--gemini-surface-hover", colors.surface1);
    root.style.setProperty("--gemini-trigger-hover", colors.surface1);
    root.style.setProperty("--gemini-control-hover", colors.surface1);
    root.style.setProperty("--gemini-separator", colors.surface0);
    root.style.setProperty("--gemini-switch-track", colors.crust);
    root.style.setProperty("--gemini-switch-slider", colors.surface0);
    root.style.setProperty("--gemini-body-text", colors.text);
    root.style.setProperty("--gemini-text", colors.text);
    root.style.setProperty("--gemini-text-trigger", colors.subtext0);
    root.style.setProperty("--gemini-text-trigger-hover", colors.text);
    root.style.setProperty("--gemini-text-dim", colors.subtext0);
    root.style.setProperty("--gemini-page-bg", colors.base);
    root.style.setProperty("--gemini-bubble-bg", colors.surface0);
    root.style.setProperty("--gemini-composer-bg", colors.surface0);
    root.style.setProperty("--gemini-composer-placeholder", colors.overlay0);
    root.style.setProperty("--gemini-inline-code-bg", colors.surface0);
    root.style.setProperty("--gemini-inline-code-text", colors[accentKey] || colors.peach);
    root.style.setProperty("--gemini-link", colors.blue);
    root.style.setProperty("--gemini-send-bg", accentHex);
    root.style.setProperty("--gemini-send-bg-hover", accentHex);
    root.style.setProperty("--gemini-home-glow-accent", glowColor);

    // 7. Native Window Controls Overlay (Electron Windows TitleBar)
    try {
      if (window.electronNative && typeof window.electronNative.setTitleBarOverlay === "function") {
        window.electronNative.setTitleBarOverlay({
          color: colors.mantle,
          symbolColor: colors.text,
          height: 30
        });
      }
    } catch (e) {}

    // Light / Dark attribute marker for host components
    document.body.setAttribute("data-catppuccin-flavor", flavor.id);
    document.body.classList.toggle("ctp-latte-mode", !isDark);

    if (save) {
      try {
        plugin.storage?.set("flavor", flavor.id);
        plugin.storage?.set("accent", accentKey);
        localStorage.setItem("__bettergravity_ctp_flavor", flavor.id);
        localStorage.setItem("__bettergravity_ctp_accent", accentKey);
      } catch (e) {}
    }

    updatePopupActiveState();
  }

  function removeAccentOverrides() {
    const root = document.documentElement;
    const props = [
      "--ctp-base", "--ctp-mantle", "--ctp-crust",
      "--ctp-surface0", "--ctp-surface1", "--ctp-surface2",
      "--ctp-overlay0", "--ctp-overlay1", "--ctp-overlay2",
      "--ctp-subtext0", "--ctp-subtext1", "--ctp-text",
      "--catppuccin-accent", "--catppuccin-button-accent", "--catppuccin-accent-glow",
      "--bettergravity-accent", "--bettergravity-accent-soft",
      "--bettergravity-surface", "--bettergravity-border", "--bettergravity-text",
      "--bettergravity-row-hover", "--primary", "--primary-foreground",
      "--background", "--foreground", "--secondary", "--muted", "--border", "--card", "--sidebar",
      "--studio-surface", "--gemini-surface", "--gemini-surface-hover", "--gemini-trigger-hover",
      "--gemini-control-hover", "--gemini-separator", "--gemini-switch-track", "--gemini-switch-slider",
      "--gemini-body-text", "--gemini-text", "--gemini-text-trigger", "--gemini-text-trigger-hover",
      "--gemini-text-dim", "--gemini-page-bg", "--gemini-bubble-bg", "--gemini-composer-bg",
      "--gemini-composer-placeholder", "--gemini-inline-code-bg", "--gemini-inline-code-text",
      "--gemini-link", "--gemini-send-bg", "--gemini-send-bg-hover", "--gemini-home-glow-accent"
    ];
    props.forEach(p => root.style.removeProperty(p));
    ACCENT_KEYS.forEach(acc => root.style.removeProperty(`--ctp-${acc.id}`));
    document.body.removeAttribute("data-catppuccin-flavor");
    document.body.classList.remove("ctp-latte-mode");
    try {
      if (window.electronNative && typeof window.electronNative.setTitleBarOverlay === "function") {
        window.electronNative.setTitleBarOverlay({
          color: "#11111b",
          symbolColor: "#cdd6f4",
          height: 30
        });
      }
    } catch (e) {}
  }

  function createPopup() {
    if (popupEl) return popupEl;

    popupEl = document.createElement("div");
    popupEl.className = "ctp-accent-popup";
    popupEl.id = "ctp-accent-popup";

    // --- Header ---
    const header = document.createElement("div");
    header.className = "ctp-accent-header";

    const title = document.createElement("span");
    title.className = "ctp-accent-title";
    title.textContent = "Catppuccin Palette";

    const badge = document.createElement("span");
    badge.className = "ctp-accent-current-badge";
    badge.id = "ctp-accent-current-badge";
    badge.textContent = `${CTP_FLAVORS[currentFlavorId]?.name || "Mocha"} · ${currentAccentId}`;

    header.append(title, badge);

    // --- Section 1: Flavor Tabs ---
    const flavorSec = document.createElement("div");
    flavorSec.className = "ctp-flavor-section";

    const flavorLabel = document.createElement("div");
    flavorLabel.className = "ctp-section-label";
    flavorLabel.textContent = "FLAVOR";

    const flavorTabs = document.createElement("div");
    flavorTabs.className = "ctp-flavor-tabs";

    Object.values(CTP_FLAVORS).forEach((flv) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = `ctp-flavor-tab ${flv.id === currentFlavorId ? "is-active" : ""}`;
      tab.setAttribute("data-flavor-id", flv.id);

      const dot = document.createElement("span");
      dot.className = "ctp-flavor-preview-dot";
      dot.style.backgroundColor = flv.colors.base;

      const text = document.createElement("span");
      text.textContent = flv.name;

      tab.append(dot, text);

      tab.addEventListener("click", (e) => {
        e.stopPropagation();
        applyConfig(flv.id, currentAccentId, true);
      });

      flavorTabs.appendChild(tab);
    });

    flavorSec.append(flavorLabel, flavorTabs);

    // --- Section 2: 14 Accent Colors Grid ---
    const accentSec = document.createElement("div");
    accentSec.className = "ctp-accent-section";

    const accentLabel = document.createElement("div");
    accentLabel.className = "ctp-section-label";
    accentLabel.textContent = "ACCENT COLOR";

    const grid = document.createElement("div");
    grid.className = "ctp-accent-grid";
    grid.id = "ctp-accent-grid";

    renderAccentDots(grid);

    accentSec.append(accentLabel, grid);

    popupEl.append(header, flavorSec, accentSec);
    document.body.appendChild(popupEl);
    return popupEl;
  }

  function renderAccentDots(container) {
    container.innerHTML = "";
    const flavor = CTP_FLAVORS[currentFlavorId] || CTP_FLAVORS.mocha;

    ACCENT_KEYS.forEach((acc) => {
      const hex = flavor.colors[acc.id];
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `ctp-accent-dot ${acc.id === currentAccentId ? "is-active" : ""}`;
      dot.style.backgroundColor = hex;
      dot.style.setProperty("--dot-glow", `${hex}55`);
      dot.setAttribute("data-color-id", acc.id);
      dot.setAttribute("data-tooltip", acc.name);
      dot.setAttribute("aria-label", acc.name);

      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        applyConfig(currentFlavorId, acc.id, true);
        closePopup();
      });

      container.appendChild(dot);
    });
  }

  function updatePopupActiveState() {
    if (!popupEl) return;
    const flavor = CTP_FLAVORS[currentFlavorId] || CTP_FLAVORS.mocha;
    const accent = ACCENT_KEYS.find(a => a.id === currentAccentId);

    // Update Badge
    const badge = popupEl.querySelector("#ctp-accent-current-badge");
    if (badge) {
      badge.textContent = `${flavor.name} · ${accent ? accent.name : currentAccentId}`;
      badge.style.color = flavor.colors[currentAccentId] || "";
    }

    // Update Flavor Tabs
    const tabs = popupEl.querySelectorAll(".ctp-flavor-tab");
    tabs.forEach((tab) => {
      const id = tab.getAttribute("data-flavor-id");
      if (id === currentFlavorId) {
        tab.classList.add("is-active");
      } else {
        tab.classList.remove("is-active");
      }
    });

    // Re-render dots with the current flavor's exact hex values
    const grid = popupEl.querySelector("#ctp-accent-grid");
    if (grid) {
      renderAccentDots(grid);
    }
  }

  function openPopup() {
    const triggerBtn = document.querySelector('[data-bettergravity-button="Accent"]');
    if (!triggerBtn) return;

    const popup = createPopup();
    updatePopupActiveState();

    const rect = triggerBtn.getBoundingClientRect();
    const popupWidth = 280;
    let left = rect.right - popupWidth;
    if (left < 10) left = 10;
    if (left + popupWidth > window.innerWidth - 10) left = window.innerWidth - popupWidth - 10;

    popup.style.top = `${rect.bottom + 6}px`;
    popup.style.left = `${left}px`;

    requestAnimationFrame(() => {
      popup.classList.add("is-open");
    });

    buttonHandle?.setActive?.(true);
  }

  function closePopup() {
    if (!popupEl || !popupEl.classList.contains("is-open")) return;
    popupEl.classList.remove("is-open");
    buttonHandle?.setActive?.(false);
  }

  function togglePopup() {
    if (popupEl && popupEl.classList.contains("is-open")) {
      closePopup();
    } else {
      openPopup();
    }
  }

  function handleOutsideClick(e) {
    if (!popupEl || !popupEl.classList.contains("is-open")) return;
    const triggerBtn = document.querySelector('[data-bettergravity-button="Accent"]');
    if (popupEl.contains(e.target) || triggerBtn?.contains(e.target)) return;
    closePopup();
  }

  function handleKeydown(e) {
    if (e.key === "Escape" && popupEl?.classList.contains("is-open")) {
      e.stopPropagation();
      closePopup();
    }
  }

  const CATPPUCCIN_ONBOARDING_KEY = "bettergravity:catppuccin:onboarding_v1";
  let activeOnboardingTimer = null;
  let activeOnboardingCallout = null;

  function triggerCatppuccinOnboarding() {
    try {
      if (localStorage.getItem(CATPPUCCIN_ONBOARDING_KEY) === "true") return;
    } catch (_) {
      return;
    }

    activeOnboardingTimer = setTimeout(() => {
      const btn = document.querySelector('[data-bettergravity-button="Accent"]');
      if (!btn) return;

      // Avoid collision with other active callouts
      if (document.querySelector(".bg-onboarding-callout")) {
        activeOnboardingTimer = setTimeout(triggerCatppuccinOnboarding, 3500);
        return;
      }

      const dismiss = () => {
        try {
          localStorage.setItem(CATPPUCCIN_ONBOARDING_KEY, "true");
        } catch (_) {}
        callout.classList.remove("is-visible");
        activeOnboardingCallout = null;
        setTimeout(() => callout.remove(), 250);
      };

      btn.addEventListener("click", dismiss, { once: true });

      const callout = document.createElement("div");
      callout.className = "bg-onboarding-callout";
      callout.setAttribute("data-no-drag", "true");
      callout.innerHTML = `
        <div class="bg-callout-caret"></div>
        <div class="bg-callout-header">
          <span class="bg-callout-icon">🎨</span>
          <span class="bg-callout-title" style="color: var(--catppuccin-accent, #b4befe)">Catppuccin Ready</span>
        </div>
        <div class="bg-callout-body">
          Theme active. Click here to customize flavor palette, accent colors & styles!
        </div>
        <div class="bg-callout-footer">
          <button type="button" class="bg-callout-btn" data-no-drag="true">Got it</button>
        </div>
      `;

      document.body.appendChild(callout);
      activeOnboardingCallout = callout;

      const rect = btn.getBoundingClientRect();
      const width = 240;
      let left = rect.left + rect.width / 2 - width / 2;
      left = Math.max(12, Math.min(window.innerWidth - width - 12, left));
      callout.style.top = `${rect.bottom + 8}px`;
      callout.style.left = `${left}px`;

      const caret = callout.querySelector(".bg-callout-caret");
      if (caret) {
        const caretLeft = Math.max(8, Math.min(width - 20, rect.left + rect.width / 2 - left - 6));
        caret.style.left = `${caretLeft}px`;
      }

      callout.querySelector(".bg-callout-btn")?.addEventListener("click", dismiss);

      requestAnimationFrame(() => {
        callout.classList.add("is-visible");
      });

      activeOnboardingTimer = setTimeout(() => {
        if (document.body.contains(callout)) {
          dismiss();
        }
      }, 10000);
    }, 800);
  }

  function mountButton() {
    if (buttonHandle) return;
    try {
      buttonHandle = plugin.ui.button({
        area: "titleBar",
        label: "Accent",
        icon: PALETTE_ICON,
        tooltip: "Catppuccin Flavors & Accent Switcher",
        onClick: togglePopup
      });
      // Restore persisted flavor & accent on load
      const config = getSavedConfig();
      applyConfig(config.flavor, config.accent, false);
      triggerCatppuccinOnboarding();
    } catch (e) {
      plugin.log?.warn?.("Catppuccin Accent button mount failed:", e);
    }
  }

  function unmountButton() {
    closePopup();
    if (popupEl) {
      popupEl.remove();
      popupEl = null;
    }
    if (buttonHandle) {
      buttonHandle.remove();
      buttonHandle = null;
    }
    removeAccentOverrides();
  }

  function syncLifecycle() {
    const active = isCatppuccinActive();
    if (active && !buttonHandle) {
      mountButton();
    } else if (!active && buttonHandle) {
      unmountButton();
    }
  }

  function isUserTyping() {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea") return true;
    if (el.isContentEditable || el.closest?.('[contenteditable="true"]')) return true;
    return false;
  }

  // Initial synchronization
  syncLifecycle();

  // Observer for dynamic theme switching
  observer = new MutationObserver(() => {
    if (isUserTyping()) return;
    syncLifecycle();
  });
  observer.observe(document.head, { childList: true, subtree: true, attributes: true });

  // Event listeners for dismiss
  document.addEventListener("click", handleOutsideClick, true);
  window.addEventListener("keydown", handleKeydown, true);

  // ==========================================================================
  // Composer Focus & Glow Stabilization (Zero Background Click Thrashing)
  // ==========================================================================
  let isComposerFocused = false;
  let composerBlurTimer = null;

  function getComposerCard() {
    return document.querySelector(
      '.bg-chat-composer, [data-testid="chat-input-container"], [data-testid="agent-input-box"] > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu]), [data-testid="agent-input-box"] .bg-card:not([data-mention-menu])'
    );
  }

  function triggerComposerBreath(card) {
    if (!card) card = getComposerCard();
    if (!card) return;
    card.classList.remove("bg-composer-breathe-1x", "bg-composer-settled");
    requestAnimationFrame(() => {
      card.classList.add("bg-composer-breathe-1x");
    });
  }

  function handleComposerFocus() {
    if (composerBlurTimer) {
      clearTimeout(composerBlurTimer);
      composerBlurTimer = null;
    }
    if (!isComposerFocused) {
      isComposerFocused = true;
      const card = getComposerCard();
      triggerComposerBreath(card);
    }
  }

  function handleComposerBlur() {
    if (composerBlurTimer) clearTimeout(composerBlurTimer);
    // Debounce 160ms: ignore micro-blur from background clicks/host focus keeper
    composerBlurTimer = setTimeout(() => {
      isComposerFocused = false;
      const card = getComposerCard();
      if (card) {
        card.classList.remove("bg-composer-breathe-1x", "bg-composer-settled");
      }
    }, 160);
  }

  function handleGlobalPointerDown(e) {
    const composerBox = e.target?.closest?.('[data-testid="agent-input-box"], .bg-chat-composer, [data-testid="chat-input-container"]');
    if (composerBox) {
      if (composerBlurTimer) {
        clearTimeout(composerBlurTimer);
        composerBlurTimer = null;
      }
      isComposerFocused = true;
      const card = getComposerCard();
      triggerComposerBreath(card);
    }
  }

  function handleGlobalFocusIn(e) {
    if (e.target?.closest?.('[data-testid="agent-input-box"], .bg-chat-composer, [data-testid="chat-input-container"]')) {
      handleComposerFocus();
    }
  }

  function handleGlobalFocusOut(e) {
    if (e.target?.closest?.('[data-testid="agent-input-box"], .bg-chat-composer, [data-testid="chat-input-container"]')) {
      handleComposerBlur();
    }
  }

  // Clean any old lingering class on startup
  const initialCard = getComposerCard();
  if (initialCard) {
    initialCard.classList.remove("bg-composer-settled");
  }

  document.addEventListener("pointerdown", handleGlobalPointerDown, true);
  document.addEventListener("focusin", handleGlobalFocusIn, true);
  document.addEventListener("focusout", handleGlobalFocusOut, true);

  // Plugin teardown
  plugin.onDispose(() => {
    observer?.disconnect();
    document.removeEventListener("click", handleOutsideClick, true);
    window.removeEventListener("keydown", handleKeydown, true);
    document.removeEventListener("pointerdown", handleGlobalPointerDown, true);
    document.removeEventListener("focusin", handleGlobalFocusIn, true);
    document.removeEventListener("focusout", handleGlobalFocusOut, true);
    if (composerBlurTimer) clearTimeout(composerBlurTimer);
    if (activeOnboardingTimer) clearTimeout(activeOnboardingTimer);
    if (activeOnboardingCallout) activeOnboardingCallout.remove();
    document.querySelectorAll(".bg-onboarding-callout").forEach((el) => el.remove());
    const card = getComposerCard();
    if (card) {
      card.classList.remove("bg-composer-breathe-1x", "bg-composer-settled");
    }
    unmountButton();
  });
})();
