# VC CONTRACTOR (VC PUNE) 🏢🔨
### Official Home Renovation, Waterproofing & Building Maintenance Portal

> **Contact & Estimates**: Phone: **[+91 91759 21246](tel:+919175921246)** | WhatsApp: **[+91 91759 21246](https://wa.me/919175921246)**  
> **Official Facebook**: [VC-PUNE on Facebook](https://www.facebook.com/people/VC-PUNE/100064082587874/)  
> **Official Instagram**: [@viki_pune on Instagram](https://www.instagram.com/viki_pune/)  
> **Official Email**: [vcpune.info@gmail.com](mailto:vcpune.info@gmail.com)  
> **Google Maps Location**: [View Pune Location](https://maps.app.goo.gl/c7sedUc2dDDueVWq7)  
> **Live GitHub Pages URL**: [https://pipoza-dev.github.io/vppuneconstruction.in/](https://pipoza-dev.github.io/vppuneconstruction.in/)  
> **Clean Extensionless URLs**: No `.html` required in any page URL!

---

## 🌟 Business Overview

**VC Contractor (VC Pune)** is a reliable on-site home renovation, waterproofing, plumbing and property maintenance contractor operating across Pune and PCMC. With over 15 years of practical field experience, the firm provides direct, trustworthy services for residential flats, commercial properties, and housing societies.

### Core Verticals & Services:
1. **Bathroom & Home Renovation**: Complete bathroom modernization, CP fittings, sanitaryware, false ceilings, and apartment remodeling.
2. **Waterproofing & Chemical Coating**: Leak-proof terrace polymer coatings, sunken bathroom slab waterproofing, and crystalline chemical slurry barriers.
3. **Plumbing & Sanitary Services**: Concealed CPVC/UPVC pipe laying, drainage line fixes, shower diverters, tap fittings, and sanitaryware setup.
4. **Tiles Wall & Floor**: Precision vitrified floor tiles, bathroom & kitchen designer wall cladding, and granite kitchen otta fitting.
5. **Demolition Work**: Safe interior wall breaking, tile removal, RCC cutting, and clean municipal debris carting.
6. **AMC & Building Maintenance & Service**: Housing society common line maintenance, monsoon preparation, and annual maintenance service contracts.

---

## 🌐 3-Language Multilingual Support (EN, HI, MR)

The website features an instant, client-side multilingual translation engine supporting 3 languages:
- **English (Default)**: Clean, professional contractor terminology.
- **Hindi (हिंदी)**: Accessible for Hindi-speaking homeowners and contractors across Pune.
- **Marathi (मराठी)**: Native, culturally precise Marathi terminology for local residents, housing societies, and commercial clients in Maharashtra.
- **Devanagari Font Enhancement**: Uses Google Font **Mukta** for crisp, natural Devanagari typography with optimized line-height and readability.
- **Persistent Selection**: User's chosen language is saved in `localStorage` and automatically maintained across page visits.

---

## 🌓 Device Default Auto-Theme

- **System-Synced by Default**: The theme automatically reflects the user's operating system / device setting (`prefers-color-scheme: dark` or `light`).
- **Real-Time Responsive**: If the device switches theme mode, the portal updates instantly without a page reload.
- **Manual Toggle**: Users can still manually toggle between Dark and Light mode via the sun/moon icon at any time.

---

## 📱 Mobile-First & Minimalist Architecture

- **Clean & Fast**: Zero bloated animations, zero CPU-draining 3D tilts, and zero slow canvas particles. Loads instantly on 3G/4G/5G mobile devices.
- **Direct 1-Tap Communication**: No long inquiry forms. Customers can immediately Call `+91 91759 21246` or chat on WhatsApp `+91 91759 21246`.
- **Sticky Mobile Bottom Dock**: Quick access buttons for Phone, WhatsApp, and Google Maps fixed to the bottom of mobile screens.
- **Clean Extensionless Routing**: Fully compatible with GitHub Pages without `.html` extensions.

---

## 🎬 Interactive Client Work Gallery & Smart Video Engine

- **Real Client Works**: Showcase of authentic on-site Pune projects covering bathroom renovations, sunken slab brick bat coba, chemical waterproofing, and water pond testing.
- **Intelligent Scroll-Triggered Autoplay (Single Active Video)**:
  - Videos automatically start playing inline (muted, looped, `playsinline`) as they enter the central viewport (`IntersectionObserver`).
  - **Mutual Exclusivity**: When another video scrolls into view or starts playing, any previously playing video stops immediately. Exactly one video plays at any time.
  - **One-Tap Click to Stop**: Users can stop/pause any video simply by tapping anywhere on the video area. Tapping again resumes playback.
  - **1-Tap Fullscreen Lightbox**: Tapping the expand icon or card title opens the full lightbox modal with custom audio/volume/seeker controls.
- **Stop Auto-Play Videos Toggle Option**:
  - **Desktop**: Displayed directly on the main header navigation bar (`Auto-Play ON / OFF`).
  - **Mobile**: Neatly placed inside the mobile navigation menu drawer option with state badge and tap-to-toggle indicator, keeping the mobile top header bar completely clean and uncluttered.
  - Allows visitors to easily disable scroll auto-play with one click. Choice is remembered in `localStorage`.
  - Fully translated across English, Hindi, and Marathi.
- **Low-Quality Mobile & Small Display Compatibility**:
  - `preload="none"` ensures zero video data is buffered until a video is actively played, conserving cellular data.
  - Automatically detects "Data Saver" mode (`navigator.connection.saveData` / 2G) on mobile devices and defaults autoplay to OFF.
  - 150ms scroll debounce prevents unnecessary decoder spin-up during fast swipe gestures.
  - Compact 32px–35px button footprint tailored for small mobile viewports (320px–375px screens) with zero navbar crowding.
- **Custom Lightbox Modal**:
  - **Auto-Detects Media**: Seamlessly displays high-res work photos or MP4 video walkthroughs.
  - **Ambient Colorful Blurry Video Backdrop**: Automatically casts a GPU-accelerated, vibrant blurred backdrop behind portrait and landscape videos, filling the empty letterboxed wings with real scene colors while keeping performance 100% lag-free.
  - **Default Muted Audio**: Videos start muted by default with an easy one-tap Mute/Unmute pill overlay and bottom control bar toggle.
  - **Full Custom Controls**: Big center play/pause indicator, seeker scrubber bar, live time display, mute toggle, and fullscreen toggle.
  - **Keyboard Navigation**: Press `Esc` to close, `ArrowLeft` for previous work, and `ArrowRight` for next work.
  - **Native Share & Clipboard Fallback**: Integrated Share button invokes native Web Share API on mobile devices and copies the link to the clipboard with an animated toast notification on desktop.
- **Smart Mobile Card Limiter (2-3 Max)**: On smaller devices (`<= 768px`), picture and video galleries show 3 cards maximum initially, with an interactive "Show More Works (+X)" / "Show Less" toggle button and direct redirect to the full portfolio page.
- **Category Filter Bar**: 1-tap filtering for *All Works*, *Videos (5)*, *Photos (9)*, *Waterproofing*, and *Bathroom Renovation*.

---

## 📁 Repository Directory Structure

> **Zero Sub-Folder Rule**: All HTML pages, CSS stylesheets, JavaScript files, and photographic/video assets strictly reside in the project root directory.

```text
d:/Projects/VP PUNE CONSTRUCTION COMPANY/
├── .nojekyll                   # Bypasses Jekyll processing on GitHub Pages
├── README.md                   # Complete project documentation & deployment guide
│
├── index.html                  # Main Home Portal (Hero, Official Banner, Services, Why Us, Recent Work Gallery, Contact)
├── about.html                  # Company Background, 15+ Years Experience, Work Principles
├── services.html               # Detailed Breakdown of All 6 Renovation & Maintenance Verticals
├── projects.html               # Interactive Client Works Gallery with Video Player & Filters
├── contact.html                # Direct Phone, WhatsApp, Email, Facebook & Google Maps
├── 404.html                    # Clean Error 404 Recovery Screen
│
├── style.css                   # Minimalist Core Stylesheet + Lightbox Modal & Video Player UI
├── translations.js             # Multilingual Dictionary (English, Hindi, Marathi) with Media Titles
├── main.js                     # Video Player Engine, Modal Lightbox, Share, Filter & Routing
│
├── VC_Construction_LOGO.png    # Official High-Definition Company Logo
├── VC_Pune_Banner.jpeg         # Official VC Contractor Pune Visiting Card & Banner
├── favicon.png                 # Browser Tab Icon (PNG format)
├── favicon.ico                 # Standard Root Favicon (ICO format)
│
├── work-completed-renovation.jpg # Client Work: Luxury Bathroom Renovation Handover
├── work-bathroom-tiling.jpg    # Client Work: On-Site Wall Tile Laying & Leveling
├── work-brick-coba.jpg         # Client Work: Sunken Slab Brick Bat Coba
├── work-waterproof-coating.jpg # Client Work: Chemical Waterproofing Coating
├── work-pond-testing.jpg       # Client Work: 48-Hour Water Ponding Leakage Test
├── work-toilet-renovation.jpg  # Client Work: Modern Ceramic Sanitaryware Fitting
├── work-shower-renovation.jpg  # Client Work: Concealed Rain Shower & Niche Lighting
├── work-designer-vanity.jpg    # Client Work: Luxury Gold Marble Washbasin Counter
├── work-modern-washbasin.jpg   # Client Work: Contemporary Basin & Sensor Mirror
│
├── video-luxury-bathroom.mp4   # Video Tour: Luxury Bathroom & LED Vanity (0:48)
├── video-waterproofing-process.mp4 # Video Tour: Demolition to Waterproofing Process (1:22)
├── video-water-pond-test.mp4   # Video Tour: 48-Hr Live Water Pond Test with Marathi Audio (0:42)
├── video-vanity-tour.mp4       # Video Tour: Designer Marble Vanity & Utility Station (0:09)
└── video-waterproof-coating.mp4 # Video Tour: Slab Waterproof Chemical Application (0:37)
```

---

## 🚀 How to Deploy on GitHub Pages

1. **Commit and Push to GitHub**:
   ```powershell
   cd "d:\Projects\VP PUNE CONSTRUCTION COMPANY"
   git add .
   git commit -m "Update: Multilingual EN/HI/MR, Auto-Theme & Clean Minimalist Industrial Portal"
   git push origin main
   ```

2. **Verify Pages Settings**:
   - Repository: `https://github.com/pipoza-dev/vppuneconstruction.in`
   - Settings -> Pages -> Deploy from branch -> `main` / `root`.
   - Your live URL: `https://pipoza-dev.github.io/vppuneconstruction.in/`

---

## 🏢 Business Contact Information

| Detail | Information |
| :--- | :--- |
| **Business Name** | VC Contractor (VC Pune) |
| **Phone (Call)** | `+91 91759 21246` |
| **WhatsApp Desk** | `+91 91759 21246` |
| **Official Email** | `vcpune.info@gmail.com` |
| **Facebook Page** | [VC-PUNE](https://www.facebook.com/people/VC-PUNE/100064082587874/) |
| **Instagram Profile** | [@viki_pune](https://www.instagram.com/viki_pune/) |
| **Location** | Pune & PCMC, Maharashtra ([Google Maps Link](https://maps.app.goo.gl/c7sedUc2dDDueVWq7)) |
| **Working Hours** | Open All 7 Days: 8:00 AM - 8:00 PM |

---

*© 2026 VC Contractor (VC Pune). All Rights Reserved. Crafted by [PipoZa Dev](https://pipoza.s.gy/pipoza.in).*
