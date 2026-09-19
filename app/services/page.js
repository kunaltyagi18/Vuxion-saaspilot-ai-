import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "Our Services | Vuxion",
  description: "Explore Vuxion's full range of services — Web Development, UI/UX Design, SEO, and more.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        {/* No limit — show all services */}
        <Services />
      </div>
      <Chatbot />
      <Footer />
    </main>
  );
}
