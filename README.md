# 🔧 Your Ultimate Toolkit · DevToolbox

> A navigation start page grown from bookmarks — featuring 90+ curated sites, immersive dark design, pure native build, zero dependencies.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Language](https://img.shields.io/badge/language-JavaScript-%23f7df1e)
![Platform](https://img.shields.io/badge/platform-web-%234285f4)

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
  - [How to Run](#how-to-run)
  - [Login Verification](#login-verification)
- [Data Structure](#-data-structure)
- [Customization & Extension](#-customization--extension)
  - [Adding a Category](#adding-a-category)
  - [Adding a Site](#adding-a-site)
- [Project Structure](#-project-structure)
- [Author](#-author)
- [License](#-license)

---

## 🚀 Project Overview

**DevToolbox** is a front‑end navigation tool that turns your everyday bookmarks into a “breathing workspace.” With a **dark immersive** theme, dynamic particles, aurora glows, and interactive card effects, all data stays in your browser’s local storage — no server required. Just double‑click `index.html` and it runs.

The project is curated from a real bookmarks export (`favorites_2026_9_8.html`) and covers **13 categories** including Information Search, AI Tools, Video & Media, Office & Communication, Cloud Storage, Online Toolboxes, Development, Maps & Travel, Video Parsing, Design Resources, Standalone Tools, Novels, and Mobile Apps, totalling **90+** hand‑picked sites.

---

## ✨ Features

- **🔐 Local Login Protection**  
  Basic encrypted verification protects your privacy on first use. The password is preset during initialization and stored only as a local hash — all credentials stay in your browser.

- **🎨 Immersive Visual Experience**  
  - Dynamic particle background that reacts to mouse movement  
  - Slowly drifting aurora blobs for a deep atmospheric feel  
  - Cursor‑following soft glow (desktop)  
  - Card hover effects with glow and slight 3D tilt (desktop)

- **🔍 Smart Search**  
  - Real‑time filtering by name, description, keywords, and domain  
  - Enter to search: if a single site matches, it opens directly; otherwise, your chosen search engine (Bing/Baidu/Google) is used  
  - Keyboard shortcuts: `/` to focus search, `Esc` to clear

- **📂 Category Navigation**  
  - Horizontal scrollable pill bar to switch categories  
  - Each category shows its site count; active pill is highlighted and auto‑scrolled into view

- **📊 Live Statistics**  
  Displays total sites and category count with animated number transitions.

- **📋 One‑Click Copy**  
  Every site card includes a copy‑link button that copies the URL and shows a success toast.

- **🛡️ Basic Guardrails**  
  Includes common anti‑interference measures to keep the page from being accidentally disrupted.

- **📱 Fully Responsive**  
  Adapted for tablets and phones, with touch‑optimised interactions and decorative elements hidden on smaller screens.

- **🌙 Dark by Design**  
  Full dark mode reduces eye strain, complemented by gradient text and glass‑morphism surfaces.

---

## 🧰 Tech Stack

- **HTML5** + **CSS3** (custom properties, Grid, Flexbox, animations, gradients, filters)
- **Vanilla JavaScript** (ES6+, no libraries or frameworks)
- **Canvas 2D** (particle system)
- **localStorage** (user settings, login token, mapping data)
- **Base64 encoding/decoding** + **simple hashing** (for local password verification)

---

## 🏃 Quick Start

### How to Run

Clone or download the project, then open `index.html` in your browser — no build tools or server required.

```bash
git clone https://github.com/your-username/devtoolbox.git
cd devtoolbox
# Double‑click index.html or use Live Server
```

### Login Verification

The first time you open the page, a login overlay appears. Enter the preset password to unlock the toolbox. The password is verified locally via a hashed value stored in your browser. After a successful login, a token is saved in `localStorage`, so you won’t need to re‑enter it on subsequent visits.

> 💡 To reset the password or clear the login state, you can:
> ```js
> localStorage.removeItem('dtb_auth');
> localStorage.removeItem('dtb_pw_hash');
> ```
> Or clear all site data from your browser’s storage settings.

---

## 📊 Data Structure

All site data is defined in `js/data.js`, containing categories (`CATEGORIES`) and sites (`SITES`).

### Category Object

```js
const CATEGORIES = [
  {
    id: 'search',          // unique identifier
    name: 'Information',   // display name
    color: '#38bdf8',      // theme colour (used for highlights and icons)
    icon: '<svg>...</svg>' // inner SVG path only
  },
  // ...
];
```

### Site Object

```js
const SITES = [
  {
    name: 'Phone Number Lookup', // short name
    desc: 'Query phone number segments', // brief description (shown on card)
    url: 'https://telphone.cn/', // full URL
    cat: 'search',               // category id
    kw: 'phone mobile carrier'   // extra search keywords
  },
  // ...
];
```

---

## ✏️ Customization & Extension

You can easily add new categories or sites without touching the core logic.

### Adding a Category

Add a new object to the `CATEGORIES` array. Ensure the `id` is unique, and pick a `color` and `icon` (SVG paths) following the existing style.

### Adding a Site

Append a new object to the `SITES` array with all required fields. The `cat` must match an existing category `id`. The `kw` field improves search matching — feel free to include synonyms or related terms.

> 💡 After adding, refresh the page; statistics and category counts will update automatically.

---

## 📁 Project Structure

```
devtoolbox/
├── index.html          # Main entry point
├── css/
│   └── style.css       # Full styles (dark design system)
├── js/
│   ├── data.js         # Categories and sites (editable)
│   └── app.js          # Core logic (login, render, search, particles, etc.)
├── img/
│   └── avatar.jpg      # Optional author avatar
└── README.md           # This file
```

---

## 👨‍💻 Author

**HeChengZe** – Front‑end learner and creator, passionate about turning everyday tools into elegant interactive interfaces.  
This project started as a personal bookmarks manager and continues to evolve.

---

## 📄 License

MIT License © 2026 HeChengZe

---

**Enjoy your toolbox!** 🛠️
