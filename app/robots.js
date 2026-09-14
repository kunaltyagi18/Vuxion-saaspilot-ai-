// app/robots.js
// Ye file automatically Next.js ke through /robots.txt ban jaati hai
// Google ko batati hai kaunsa page crawl kare, kaunsa nahi

import { SITE_URL } from "@/lib/config";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/api/"], // private/backend routes ko block kiya
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}