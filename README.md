<div align="center">

# 🛒 BazarDor (বাজার দর)

**Daily essential prices, at a glance.**

A responsive Bangla web app to track today's market prices of rice, lentils, oil, vegetables, fish, meat, eggs and spices across different bazars in Bangladesh.

[🌐 Live Demo](https://YOUR-PROJECT.vercel.app) · [📂 GitHub Repository](https://github.com/YOUR-USERNAME/YOUR-REPO)

</div>

---

## 📖 About the Project

**BazarDor (বাজার দর)** helps people see what daily essentials cost today and how prices are changing. The home page highlights the products whose prices **rose** and **fell** today, a live ticker keeps the latest prices moving across the screen, and every product has a detailed page with **market-wise minimum, maximum and average prices**.

Browsing is open to everyone, while the detailed product pages and the profile area are available after signing in.

---

## ✨ Key Features

1. **📈 Live Price Ticker & Price Movers**
   An infinitely scrolling marquee shows each product's price with a ▲/▼ percentage change. The home page also lists the top 6 products whose prices **increased** and the top 6 whose prices **decreased** today.

2. **🗂️ Category Pages with Smart Sorting**
   Browse products by category and sort by *Default*, *Price: Low to High* or *Price: High to Low*. Sorting uses the real numeric value, so **Bengali numerals (e.g. ১,৮৫০)** are handled correctly instead of being sorted as text.

3. **🔐 Secure Authentication with BetterAuth**
   Email/password sign in and sign up, plus **Google** and **GitHub** social login. Success, error and validation messages are shown as toast notifications.

4. **🛡️ Protected Product Details**
   Product detail pages require login. They show today's price, price change, comparison with yesterday / last week / last month, and a **market-wise table** (market, division, min, max, average). Visitors who are not signed in are redirected to Sign In and brought back to the same product afterwards.

5. **👤 Profile & Update Information**
   A My Profile page with an update button that opens a separate route where users can change their **name and profile photo** using BetterAuth's `updateUser`.

6. **📱 Responsive Design & Polished UX**
   Works on mobile, tablet and desktop. Includes skeleton loaders while data loads, a friendly **404 page**, and a Bangla-first interface.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) (App Router) | UI, routing and server components |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe code |
| [Tailwind CSS](https://tailwindcss.com/) | Styling and responsiveness |
| [DaisyUI](https://daisyui.com/) | Component library |
| [BetterAuth](https://www.better-auth.com/) | Authentication (Email/Password, Google, GitHub) |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Database for users and sessions |
| [react-hot-toast](https://react-hot-toast.com/) | Toast notifications |
| [Vercel](https://vercel.com/) | Deployment |

**Data source:** Programming Hero BazarDor API (`/products`, `/categories`).

---

## 📂 Project Structure

```
bazardor/
├── app/
│   ├── api/auth/[...all]/   # BetterAuth route handler
│   ├── category/[slug]/     # Category page (with loading skeleton)
│   ├── product/[slug]/      # Protected product details
│   ├── profile/             # My Profile and /profile/update
│   ├── signin/ signup/      # Authentication pages
│   ├── components/          # Reusable UI components
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── lib/                     # API helpers, auth, Bengali number utils, normalizers
├── public/                  # Static assets
└── proxy.ts                 # Route protection
```

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/bazardor?retryWrites=true&w=majority
BETTER_AUTH_SECRET=your-long-random-secret-at-least-32-characters
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

> Google and GitHub keys are optional. Email and password login works without them.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🔑 OAuth Callback URLs

| Provider | Callback URL |
| --- | --- |
| Google | `https://YOUR-DOMAIN/api/auth/callback/google` |
| GitHub | `https://YOUR-DOMAIN/api/auth/callback/github` |

For local development, use `http://localhost:3000` as the domain.

---

## ☁️ Deployment

The project is deployed on **Vercel**. To deploy your own copy:

1. Push the repository to GitHub.
2. Import it on [Vercel](https://vercel.com/).
3. Add the environment variables listed above (set `BETTER_AUTH_URL` to your live Vercel URL).
4. Deploy, then add your live callback URLs to the Google and GitHub OAuth apps.

---

## 📸 Screenshots

> Add screenshots of the Home, Category, Product Details and Profile pages here.

---

## 🙌 Credits

Built as a Next.js assignment project. Price data is provided by the Programming Hero BazarDor API.

<div align="center">

</div>
