# Agency Portfolio Website 🚀

A full-stack agency portfolio website featuring dynamic content management and an AI-style keyword chatbot that helps visitors get instant answers about services, pricing, and more.

**Live Demo:** [your-vercel-link-here]

---

## Overview

This project is a complete business website solution — built to showcase services and past work while giving visitors an easy way to get their questions answered without filling out a contact form first. It includes a protected admin dashboard so business owners can manage their content without touching any code.

---

## Features

- **Dynamic Content** — Services and projects are stored in MongoDB and rendered in real time, not hardcoded
- **Admin Dashboard** — Authenticated route to add, update, and delete services, projects, and chatbot FAQs
- **Smart Chatbot** — Keyword-matching engine that scores user queries against a FAQ database and returns the most relevant answer
- **Authentication** — Secure login powered by Clerk, with protected admin routes via middleware
- **Animations** — Smooth page transitions, staggered card reveals, and micro-interactions using Framer Motion
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop using Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | MongoDB with Mongoose |
| Styling | Tailwind CSS |
| Authentication | Clerk |
| Animations | Framer Motion |
| Deployment | Vercel |

---

## Project Structure

```
agency-portfolio/
├── app/
│   ├── admin/              # Protected admin dashboard
│   └── api/                # REST API routes (services, projects, faqs, chat)
├── components/              # UI components (Navbar, Hero, Chatbot, etc.)
├── lib/                     # Database connection logic
├── models/                  # MongoDB schemas
└── middleware.js            # Route protection
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/agency-portfolio.git
cd agency-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin
```

### 4. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

---

## How the Chatbot Works

The chatbot uses a lightweight keyword-scoring algorithm instead of an external AI API:

1. User message is normalized and split into individual words
2. Each FAQ entry in MongoDB has an array of associated keywords
3. The bot scores every FAQ based on exact and partial keyword matches
4. The highest-scoring FAQ's answer is returned to the user
5. If no match is found, a fallback message guides the user to ask differently

This approach keeps the chatbot fast, free to run, and fully customizable through the admin dashboard — no API keys required.

---

## Future Improvements

- Image uploads for services and projects
- Dark/light theme toggle
- Analytics dashboard for chatbot query trends
- Multi-language support

---

## Author

Built by Kunal TYagi as a personal project to apply full-stack development skills using modern web technologies.

[LinkedIn] · [GitHub] · [Portfolio]
