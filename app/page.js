import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Projects from "@/components/Projects";
import BlogTeaser from "@/components/BlogTeaser";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import CTA from "@/components/CTA";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About preview />
      <HowItWorks />
      <Services limit={3} />
      <WhyUs />
      <Projects limit={3} />
      <BlogTeaser />
      <Testimonials />
      <FAQSection />
      <CTA />
      <Chatbot />
      <Footer />
    </main>
  );
}