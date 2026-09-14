# Vuxion — Agency Portfolio & SaaS Website 🚀

A production-ready full-stack agency portfolio website featuring dynamic content management, SEO optimization, and an intelligent keyword-based chatbot.

**Live Demo:** [Deploy to Vercel and add your link here]

---

## 🌟 Overview

Vuxion is a complete digital agency solution built to showcase services, projects, and capture leads. It provides a seamless user experience for visitors to get their questions answered instantly via a built-in chatbot, while giving business owners a secure Admin CMS dashboard to manage their content without touching any code.

---

## ✨ Key Features

- **Full-Stack Next.js 16** — Built on the latest App Router with Server Actions and API Routes
- **Dynamic Content Management (CMS)** — Services, projects, and chatbot FAQs are stored in MongoDB and rendered in real time
- **Secure Admin Dashboard** — Protected routes via Clerk Auth & Server-side Guards. Only the designated `ADMIN_EMAIL` can access the CMS and mutate data
- **Smart NLP Chatbot** — Custom keyword-matching algorithm that scores user queries against a database of FAQs and returns the most relevant answer
- **Cloudinary Integration** — Seamless image uploading directly from the Admin panel
- **Enterprise SEO** — Pre-configured with Open Graph tags, Twitter cards, dynamic `sitemap.xml`, `robots.txt`, and JSON-LD structured data
- **Premium UI & Animations** — Fully responsive design with Tailwind CSS v4, dark mode support, and micro-interactions powered by Framer Motion

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Database & ORM** | MongoDB + Mongoose |
| **Styling** | Tailwind CSS v4 |
| **Authentication** | Clerk |
| **Image Hosting** | Cloudinary |
| **Animations** | Framer Motion |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kunaltyagi18/saaspilot-ai.git
cd saaspilot-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the template file to create your local environment variables:
```bash
cp .env.example .env.local
```

Fill in your `.env.local` with the following variables:

```env
# MongoDB Atlas
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication (Live keys for production, Test keys for local dev)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin

# Cloudinary (Required for image uploads in Admin CMS)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset

# Security: Only this email can access the Admin CMS and API mutation routes
ADMIN_EMAIL=your@email.com
NEXT_PUBLIC_ADMIN_EMAIL=your@email.com

# SEO Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

---

## 🤖 How the Chatbot Works

The chatbot uses a fast, lightweight, cost-free keyword-scoring algorithm rather than an expensive external AI API:

1. User message is normalized and split into lowercase words.
2. Each FAQ entry in MongoDB has an array of associated keywords.
3. The bot scores every FAQ based on exact and partial keyword matches.
4. The highest-scoring FAQ's answer is returned to the user instantly.
5. If no match is found, a friendly fallback message guides the user to contact the agency.

This approach keeps the application fast, free to host, and fully customizable directly through the Admin CMS.

---

## 🔮 Future Enhancements (Roadmap)

- **Rate Limiting:** Implement `@upstash/ratelimit` on Contact & Chat APIs for DDoS protection
- **Email Notifications:** Integrate `Resend` to trigger email alerts for new contact form submissions
- **Analytics Dashboard:** Build a visual graph in the Admin panel showing lead conversion trends
- **Automated Testing:** Add a Vitest test suite for critical API and utility functions

---

## 👨‍💻 Author

Built by **Kunal Tyagi** as a full-stack portfolio project to demonstrate proficiency with modern web architectures, security practices, and premium UI design.

[LinkedIn](https://linkedin.com/in/your-profile) · [GitHub](https://github.com/kunaltyagi18) · [Portfolio](https://your-portfolio-link.com)
