import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Features } from "@/components/landing/Features";
import { Reviews } from "@/components/landing/Reviews";
import { Contact } from "@/components/landing/Contact";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Reviews />
      <Contact />
    </main>
  );
};

export default Index;
