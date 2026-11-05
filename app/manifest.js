// app/manifest.js
// Mobile "Add to Home Screen" experience + site legitimacy signal ke liye

export default function manifest() {
    return {
        name: "Vuxion",
        short_name: "Vuxion",
        description: "Web Development, UI/UX & SEO Agency built with Next.js",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#f04b16",
        icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
    };
}
