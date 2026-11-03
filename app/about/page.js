import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import About from "@/components/About";

export const metadata = {
  title: "About Us | Vuxion",
  description: "Learn about Vuxion, our story, mission, vision, and the team behind your digital success.",
};

export default function AboutPage() {
  return (
    <main style={{ background: "var(--studio-bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 72 }}>
        <About />
      </div>
      <Chatbot />
      <Footer />
    </main>
  );
}
