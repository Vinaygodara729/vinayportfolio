# 🌟 Vinay Godara - Personal Portfolio Website

A modern, responsive, high-performance personal portfolio website built with clean HTML5, CSS3, and vanilla JavaScript. Features dark/light mode toggle, glassmorphism UI, neon gradients, scroll-reveal animations, interactive particle effects, and authentic beginner-level student content.

Designed specifically for **Vinay Godara**, 1st-year B.Tech CSE student at **JECRC University, Jaipur, Rajasthan**.

---

## 🚀 Quick Start (How to Run Locally)

This portfolio has **zero dependencies** and requires **no build step** (no Node.js or npm needed).

### Option 1: Direct File Open (Simplest)
1. Double-click `index.html` or right-click `index.html` → **Open with** → your favorite browser (Chrome, Edge, Firefox, Brave, Safari).
2. That's it! The portfolio will load with all styles and interactions.

### Option 2: Using VS Code Live Server (Recommended for editing)
1. Open this folder in **VS Code**.
2. Install the **Live Server** extension by *Ritwick Dey* (if not already installed).
3. Right-click `index.html` and choose **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500/` and automatically reload whenever you save changes.

### Option 3: Using Python HTTP Server (Terminal)
Open PowerShell or your command prompt in this directory and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 📁 File Structure

```text
vinay portfolio/
├── index.html          # All website content, sections, semantic tags, and meta tags
├── style.css           # Glassmorphism cards, neon color tokens, responsive layouts
├── script.js           # Theme toggle, typing effect, canvas particles, counters, form
├── assets/
│   ├── favicon.svg     # Modern gradient "VG" vector favicon
│   └── avatar.svg      # High-tech glowing developer illustration
└── README.md           # Documentation & personal customization guide
```

---

## ✏️ How to Personalize Your Content

All content is cleanly organized in `index.html` with explicit comments:

### 1. Update Your Photo / Avatar
- Currently, the hero section uses `assets/avatar.svg`.
- To use your own real photo:
  1. Copy your portrait photo (e.g. `vinay.jpg` or `vinay.png`) into the `assets/` folder.
  2. Open `index.html` and find line ~153:
     ```html
     <img src="assets/avatar.svg" alt="Vinay Godara developer illustration" ...>
     ```
  3. Change `src="assets/avatar.svg"` to `src="assets/vinay.jpg"`.

### 2. Update Social Media Links
- Open `index.html` and search for `social-icon-btn` (in both the Hero, Contact, and Footer sections).
- Replace `https://github.com/` with your exact GitHub profile (e.g., `https://github.com/your-username`).
- Replace `https://linkedin.com/in/` with your LinkedIn public profile link.

### 3. Update Education (Class XII Details)
- In `index.html`, find the `<section id="education">` section.
- Under the second timeline item (`Senior Secondary School`), edit:
  - `[Add Year, e.g. 2024]` → your passing year.
  - `[Add School Name, City, Board]` → your high school name and board (e.g., CBSE / RBSE).
  - `[Score / Percentage]` → your actual percentage or CGPA.

### 4. Update Projects with Real Repositories
- In `index.html`, find `<section id="projects">`.
- For each of the 4 starter cards (`Calculator`, `Number Guessing Game`, `Student Marks Manager`, `Pattern Printing`):
  - Change `href="https://github.com/"` on the `View Code` button to your GitHub repository URL for that program.
  - If you build new projects, simply duplicate one `<div class="glass-card project-card">` block and update the titles and tags.

### 5. Add Real Certificates & Achievements
- In `index.html`, find `<section id="achievements">`.
- Under the `.cert-grid`, replace `[Add Certificate Name]` and `[Platform / Organization - Year]` with actual courses you complete on Coursera, HackerRank, NPTEL, or university workshops.
- You can adjust the honest numbers in `data-target="50"` or `data-target="150"` as your coding journey progresses!

---

## 🌐 Free 1-Click Deployment

You can host this website online for free so anyone in the world can view your portfolio:

### Method A: GitHub Pages (Recommended)
1. Create a free account at [GitHub](https://github.com) if you haven't already.
2. Create a new repository named `portfolio` (or `vinaygodara.github.io`).
3. Upload all files from this folder (`index.html`, `style.css`, `script.js`, `assets/`, `README.md`) to the repository.
4. Go to **Settings** → **Pages** in your repository.
5. Under **Branch**, select `main` (or `master`) and `/ (root)`, then click **Save**.
6. In 1–2 minutes, your site will be live at `https://<your-username>.github.io/portfolio/`!

### Method B: Netlify (Drag and Drop)
1. Go to [Netlify.com](https://www.netlify.com/) and sign up / log in.
2. Go to the **Sites** tab and drag-and-drop this entire folder (`vinay portfolio`) into the Netlify drop zone.
3. Your website is instantly live with a free custom SSL URL!

### Method C: Vercel
1. Install Vercel CLI (`npm i -g vercel`) or sign in at [Vercel.com](https://vercel.com).
2. Import your GitHub repository or run `vercel` in this folder.
3. It deploys automatically in seconds.

---

## 🎨 Theme Customization

Want to tweak the colors? Open `style.css` and modify the CSS variables at the top:
- `--neon-violet`: change `#8b5cf6` to your preferred violet/purple.
- `--neon-cyan`: change `#06b6d4` to your preferred cyan/teal.
- `--gradient-primary`: changes the gradient across buttons, text, and badges.

---

## 📄 License & Credits
- **Designed & Developed for**: Vinay Godara (JECRC University, Jaipur)
- **Year**: 2026
- Feel free to modify, extend, and adapt this template for your computer science career!
