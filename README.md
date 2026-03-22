# Pind CSS 🚜🌾

A lightweight, purely **runtime** utility-first styling library that runs directly inside your browser. No Webpack, no PostCSS, no setup required.

Pind CSS reads your standard HTML `class` tags, automatically resolves the names into beautiful CSS properties, and applies the style rules directly onto your elements. 

### ⚡ Installation 

**Using NPM:**
```bash
npm install pind-css
```

**Using CDN:**
Drop this script tag into the `<head>` of your HTML document:
```html
<script src="https://cdn.jsdelivr.net/gh/NipunMagotra/PindCSS@main/engine.js"></script>
```

---

### 💡 Project Approach: The Problem with Learning Tailwind

When first learning Tailwind CSS, the learning curve can be surprisingly frustrating for beginners:
- **Arbitrary Scales:** Why does `p-4` mean `16px`? You constantly have to memorize multiplier tables just to measure a box.
- **Messy Bracket Syntax:** If you want a perfectly specific pixel size in Tailwind, you are forced to write messy brackets like `w-[21px]`.
- **Complex Build Pipelines:** To use modern utility frameworks properly, you often have to configure Node.js, `postcss.config.js`, `tailwind.config.js`, and endlessly run a terminal watcher.

**The Solution:** 
Pind CSS was built purely for **absolute simplicity and ease of writing**. 

1. **Zero Setup:** There is absolutely no compiling. Just drop it in a `<script>` tag and it works natively inside the browser.
2. **Infinite Custom Precision:** Forget multiplying by 4. If you want 21 pixels of padding, literally just type `p-21`. Want 100% width? Type `w-100p`.
3. **Curated Human Colors:** Instead of staring at jarring hex codes or standard web colors, drop plain English tags like `bg-strawberry` or `bg-ocean` and let the engine map it perfectly to a beautiful designer palette.
4. **Live Reactive Engine:** Leveraging a custom Javascript `MutationObserver`, Pind reads any classes instantly injected by React or Vue components seamlessly.
5. **DOM Cleaning:** To keep your final production site looking pristine, the Pind engine automatically wipes itself off your `class` tags after it injects the styles, keeping your HTML clean.

### 🧠 What I Learned Building This

Building a custom CSS engine from scratch taught me a ton about how browsers actually work under the hood:

- **MutationObservers:** I learned exactly how to track the DOM for live updates (like adding new HTML tags or dynamically changing classes via JS) and react instantly without slowing down the webpage.
- **String Parsing & Regex:** I got hands-on experience stripping down custom string utility codes like `border-1d3557` or `grad-sunset` and mathematically converting them dynamically into real CSS properties.
- **NPM Package Publishing:** I learned how to structure a `package.json`, create an `npx pindcss` CLI executable binary, and officially publish a package globally while leveraging JSDelivr for instant CDN delivery.
- **Vanilla Performance:** I realized how insanely powerful and fast pure Vanilla Javascript actually is when you don't burden it with massive external frameworks.


### 🚀 Documentation & Interactive Playgrounds

Check out the fully interactive documentation and features over at the official website:
**[https://nipunmagotra.github.io/PindCSS/](https://nipunmagotra.github.io/PindCSS/)**

---
*Crafted from the Pind. ("Pind" translates to Village in Punjabi. Simple roots, simple code!)*
