import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Contact />
      <Chatbot />  {/* ← yeh add kiya */}
      <Footer />
    </main>
  );
}