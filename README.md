# Amazon Romania Valentine's Day — Competition Recreation

A high-fidelity full-stack recreation of the Amazon Romania Valentine's Day storefront as captured in the competition reference screenshot (`1.jpeg`), powered by a functional Node.js Express backend and SQLite database.

## 🌐 Live Deployments & Repository

- **Live Frontend (Vercel)**: **[https://temporary-agile-ochre-zgkomff.vercel.app](https://temporary-agile-ochre-zgkomff.vercel.app)**
- **GitHub Repository**: **[https://github.com/Yaathrapalani/amazon-romania-valentines](https://github.com/Yaathrapalani/amazon-romania-valentines)**
- **Render One-Click Deploy**: [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Yaathrapalani/amazon-romania-valentines)
- **Claim Vercel Deployment Link**: [Claim to Vercel Account](https://vercel.com/claim-deployment?code=cafc37f8-697a-47b8-abb6-dc104e53ab29)

---

## 🏆 Key Highlights

- **Authoritative Visual Target Recreation**:
  - Exact **Header** with `Deliver to Romania` and the live **Romania Delivery Popover** (`"We're showing you items that ship to RO..."`).
  - **Sub-navigation** with `"Shop deals in Electronics"`.
  - **Valentine's Day Hero Banner** featuring authentic photographic gift flat-lay and centered typography (`Explore Valentine's Day / Shop deals`).
  - Signature 4-Column Overlapping Card Grid:
    1. **Shop by Category**: Computers & Accessories (Acer Predator), Video Games (PS4), Baby (Monitor), Toys & Games (LOL Surprise ball).
    2. **Refresh your space**: Dining (Decanter), Home (Textiles), Kitchen (Charcuterie), Health and Beauty (Lotion).
    3. **Electronics**: High-resolution creative workspace flat-lay.
    4. **Dual Stacked Cards**: Sign in securely card + Cyan Amazon Global Export (`We ship over 45 million products around the world`).
  - **Below-the-fold Feed**: Today's Deals with discount percentage badges, Best Sellers rails, and full 4-column Amazon footer.

- **Full-Stack Commerce Engine**:
  - Real SQLite persistence (`node:sqlite` zero-configuration engine).
  - JWT + Cookie authentication with bcrypt password hashing.
  - Zod request validation, Helmet security headers, CORS, rate limiting.
  - Complete working path: **Home → Search → Product Detail (PDP) → Add to Cart → Cart → Checkout → Demo Card Payment → Order Confirmation → Your Orders History**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v20+ (tested on Node v24)
- npm

### 1. Install Dependencies
```bash
# In root or in both directories
npm run setup
```
*(Alternatively: `cd frontend && npm install` and `cd backend && npm install`)*

### 2. Run the Application
```bash
# Terminal 1 - Backend API (Port 5000)
npm run dev:backend

# Terminal 2 - Frontend Dev Server (Port 5173)
npm run dev:frontend
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🔑 Demo Credentials

- **Email**: `demo@amazon.com`
- **Password**: `amazon123`
- *(Or use the 1-click **"⚡ Use Demo Account"** button on the Sign-In page)*

### Demo Payment Details (Offline / Local)
- **Card Number**: `4242 4242 4242 4242`
- **Exp Date**: `12/28`
- **CVV**: `123`
- *(Pre-filled automatically on the checkout page)*

---

## 📁 Repository Structure

```
├── frontend/
│   ├── public/
│   │   └── assets/reference/       # Extracted pixel-accurate photographic assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/            # Header, SubNav, SideDrawer, Footer
│   │   │   ├── home/              # HeroBanner, QuadCard, SingleCard, DealsCarousel, ProductRow
│   │   │   └── common/            # StarRating
│   │   ├── pages/                 # HomePage, SearchPage, ProductDetailPage, CartPage, CheckoutPage, etc.
│   │   ├── services/              # API client with credentials support
│   │   ├── store/                 # Zustand global stores (Cart, Auth, Search)
│   │   └── types/                 # Shared TypeScript interfaces
│   └── vite.config.ts             # Port 5173 with proxy to backend /api
├── backend/
│   └── src/
│       ├── db.ts                  # SQLite schema initialization and seed catalog
│       ├── middleware/            # JWT auth, error handling, rate limiting
│       ├── routes/                # auth, products, search, cart, orders, payments
│       └── index.ts               # Express server entrypoint (Port 5000)
├── reference/
│   └── amazon-romania-valentines/
│       ├── original/              # Preserved original SingleFile HTML captures & 1.jpeg
│       ├── screenshots/           # Reference target screenshot & rendered implementation
│       └── analysis/              # Forensic documents (visual-analysis, page-map, tokens, etc.)
└── FINAL_SUBMISSION/              # Clean, self-contained project package
```
