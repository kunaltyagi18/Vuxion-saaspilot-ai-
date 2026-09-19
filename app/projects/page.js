import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "Projects & Portfolio | Vuxion",
  description: "Browse Vuxion's complete portfolio — web apps, e-commerce, dashboards, and more.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        {/* No limit — show all projects */}
        <Projects />
      </div>
      <Chatbot />
      <Footer />
    </main>
  );
}
