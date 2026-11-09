# Vuxion - Full-Stack Agency Website & CMS

Vuxion is a full-stack agency portfolio website with a public marketing site, MongoDB-backed content management, protected admin APIs, lead capture, email notifications, and a keyword-based chatbot.

## What is included

- Public pages for the home page, services, projects, about, contact, privacy, and terms.
- Admin CMS for About Us, Services, Projects, Blog Posts, Testimonials, Chatbot FAQs, Contact Leads, and Site Settings.
- Dynamic homepage content for the hero, CTA, Why Us cards, tech stack, testimonials, and blog posts.
- Custom client-side chatbot quick replies for Services, Projects, Pricing, and Contact, plus database FAQ matching.
- Contact form persistence in MongoDB with confirmation and admin notification emails.
- Optional Cloudinary image uploads from the admin panel.
- Clerk authentication for public website users.
- A separate custom admin email/password login with an HTTP-only, signed 8-hour session cookie. Admin access is intentionally independent of Clerk.
- Responsive light/dark UI with Vuxion orange admin accents and Framer Motion interactions.
- SEO metadata, Open Graph/Twitter cards, JSON-LD, `sitemap.xml`, `robots.txt`, and a web manifest.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, Tailwind CSS, Framer Motion |
| Database | MongoDB Atlas + Mongoose |
| Public authentication | Clerk |
| Admin authentication | Custom signed cookie session |
| Email | Nodemailer / Gmail SMTP |
| Images | Cloudinary (optional) |
| Deployment | Vercel-ready |

## Project structure

```text
app/                 Next.js routes, pages, and API handlers
components/          Public UI, admin UI helpers, chatbot, and auth boundary
models/              Mongoose schemas
lib/                 Database, mailer, rate limiting, config, and admin session helpers
public/              Static images and icons
scripts/              Seed and image utility scripts
```

## Getting started

### 1. Install

```bash
git clone https://github.com/kunaltyagi18/Vuxion-saaspilot-ai-.git
cd Vuxion-saaspilot-ai-
npm install
```

### 2. Configure environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Set the values for MongoDB, Clerk, email, and the admin CMS:

```env
MONGODB_URI=your_mongodb_connection_string

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin

# Optional Cloudinary unsigned upload configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset

# Separate from Clerk user authentication
ADMIN_LOGIN_EMAIL=your-admin@email.com
ADMIN_LOGIN_PASSWORD=use-a-long-random-password
ADMIN_SESSION_SECRET=use-a-different-long-random-secret

# Gmail SMTP / notification configuration
GMAIL_USER=your-gmail-address
GMAIL_APP_PASSWORD=your-gmail-app-password

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`ADMIN_EMAIL` is supported as a backwards-compatible fallback for `ADMIN_LOGIN_EMAIL`. Never commit `.env.local` or any secret.

### 3. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`. The admin panel is available at `/admin`; unauthenticated visitors are redirected to `/admin/login`.

## Authentication model

The public website and the CMS use separate authentication systems by design:

- Public user sign-in uses Clerk through `ClerkProvider`, `SignInButton`, and `UserButton`.
- Admin sign-in posts credentials to `/api/admin/login`.
- The server validates the configured admin email/password and creates the `vuxion_admin_session` HTTP-only cookie.
- Middleware and every admin mutation route validate that signed session before allowing access.
- Admin login attempts are rate-limited. For production, use a strong `ADMIN_SESSION_SECRET` different from the admin password.

## API surface

| Route | Purpose |
| --- | --- |
| `/api/about` | Public About data; admin update |
| `/api/services` | Public list; admin create/update/delete |
| `/api/projects` | Public list; admin create/update/delete |
| `/api/blog` | Public list; admin create/update/delete |
| `/api/testimonials` | Public list; admin create/update/delete |
| `/api/faqs` | Public chatbot FAQ data; admin create/update/delete |
| `/api/settings` | Public site settings; admin update |
| `/api/contact` | Public lead submission; admin lead access |
| `/api/chat` | Rate-limited chatbot responses |
| `/api/admin/*` | Admin login, session check, and logout |

## Chatbot

The chatbot uses a lightweight keyword-scoring strategy instead of an external AI API:

1. The user can click one of the four default client-side quick replies.
2. Intent checks handle greetings, services, projects, pricing, and contact information.
3. FAQ entries stored in MongoDB are scored using exact and partial keyword matches.
4. The highest-scoring answer is returned, with a safe fallback when no match exists.

## Quality checks

```bash
npm run lint
npm run build
```

The build gracefully falls back when MongoDB is temporarily unavailable while generating the sitemap. Production deployments still need a reachable MongoDB Atlas cluster and an allowlisted deployment IP/network configuration.

## Current engineering notes

- The in-memory rate limiter is suitable for a portfolio or single instance. A distributed limiter such as Upstash Redis is recommended for multi-instance production deployments.
- API payload validation can be strengthened further with a schema validator such as Zod.
- Automated unit, integration, and end-to-end tests are the next planned improvement.

## Author

Built by **Kunal Tyagi** as a full-stack portfolio project.

- GitHub: https://github.com/kunaltyagi18
