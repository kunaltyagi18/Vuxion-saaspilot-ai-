import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "About Us | Vuxion",
  description: "Learn about Vuxion — our story, mission, vision, and the team behind your digital success.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      {/* Full About — team + all sections, no preview limit */}
      <div className="pt-20">
        <About />
      </div>
      <Chatbot />
      <Footer />
    </main>
  );
}
