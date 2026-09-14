// app/sitemap.js
// Ye file automatically /sitemap.xml ban jaati hai
// Google ko site ke saare important pages/sections ki list deti hai

import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import Project from "@/models/Project";
import { SITE_URL } from "@/lib/config";

export default async function sitemap() {
    // Homepage — hamesha sabse pehle aur highest priority
    const staticEntries = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
    ];

    // ── Dynamic section entries ────────────────────────────────────────────────
    // Abhi site single-page hai (koi /projects/[id] ya /services/[id] route nahi),
    // isliye har DB record ke liye alag URL nahi ban sakta.
    // Lekin humaare paas Services/Projects/FAQs section anchors hain jo real
    // content se update hote rehte hain — inki lastModified DB se accurate rakhte hain,
    // taaki Google ko pata chale ye sections kab-kab refresh hue.
    let servicesLastMod = new Date();
    let projectsLastMod = new Date();

    try {
        await connectDB();

        // Sabse recent updatedAt wala doc dhoondo (sirf ek field chahiye, lean() se fast)
        const [latestService, latestProject] = await Promise.all([
            Service.findOne().sort({ updatedAt: -1 }).select("updatedAt").lean(),
            Project.findOne().sort({ updatedAt: -1 }).select("updatedAt").lean(),
        ]);

        if (latestService?.updatedAt) servicesLastMod = latestService.updatedAt;
        if (latestProject?.updatedAt) projectsLastMod = latestProject.updatedAt;
    } catch (err) {
        // DB down ho ya query fail ho toh bhi sitemap build fail nahi hona chahiye —
        // bas fallback current date use ho jayegi
        console.error("[sitemap] Failed to fetch lastModified from DB:", err);
    }

    const sectionEntries = [
        {
            url: `${SITE_URL}/#services`,
            lastModified: servicesLastMod,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/#projects`,
            lastModified: projectsLastMod,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/#contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
    ];

    // NOTE: Agar future mein /projects/[id] ya /services/[id] jaisa alag public
    // page banao, toh yahan Project.find()/Service.find() se loop karke
    // asli per-item URLs add karna — abhi anchors se kaam chala rahe hain.

    return [...staticEntries, ...sectionEntries];
}