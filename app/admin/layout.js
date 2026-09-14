// app/admin/layout.js
// NOTE: admin/page.js "use client" hai, isliye wahan se metadata export
// nahi ho sakta (Next.js rule: metadata sirf Server Components se export hota hai).
// Isliye ye alag layout.js banaya — ye Server Component hai, yahan se
// robots noindex safely export ho sakta hai.

export const metadata = {
    title: "Admin Dashboard",
    robots: {
        index: false, // Google is page ko index NAHI karega
        follow: false, // aur is page ke links bhi follow nahi karega
    },
};

export default function AdminLayout({ children }) {
    return children;
}