// app/manifest.js
// Mobile "Add to Home Screen" experience + site legitimacy signal ke liye

export default function manifest() {
    return {
        name: "MyAgency",
        short_name: "MyAgency",
        description: "Web Development, UI/UX & SEO Agency built with Next.js",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4f46e5",
        icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
    };
}