import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wind } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container">
        <div className="mt-4 glass rounded-2xl flex items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center glow-orange">
              <Wind className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">EcoTurbines</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#reviews" className="hover:text-foreground transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 glow-orange">
              <Link to="/dashboard">Launch app</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
