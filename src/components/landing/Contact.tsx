import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[160px]" />
      <div className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-secondary/30 blur-[160px]" />

      <div className="container relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl font-bold"
        >
          Contact
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div 
            className="cursor-pointer group"
            onClick={() => {
                navigator.clipboard.writeText(" hello@ecoturbines.io");
                toast.success("Email address copied to clipboard");
            }}
          >
            <div className="flex items-center gap-2 text-lg font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" /> Email
            </div>
            <div className="text-muted-foreground">hello@ecoturbines.io</div>
          </div>
          <div 
            className="cursor-pointer group"
            onClick={() => {
                navigator.clipboard.writeText("(123) 456 7890");
                toast.success("Phone number copied to clipboard");
            }}
          >
            <div className="flex items-center gap-2 text-lg font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" /> Phone
            </div>
            <div className="text-muted-foreground">(123) 456 7890</div>
          </div>
          <div>
            <div className="text-lg font-display font-semibold mb-3">Social</div>
            <div className="flex gap-3">
              {[
                { i: Facebook, l: "https://facebook.com/ecoturbines" },
                { i: Instagram, l: "https://instagram.com/ecoturbines" },
                { i: Twitter, l: "https://twitter.com/ecoturbines" }
              ].map((social, i) => (
                <a 
                    key={i} 
                    href={social.l} 
                    target="_blank" 
                    rel="noreferrer"
                    className="h-11 w-11 rounded-xl glass flex items-center justify-center hover:glow-orange transition-all"
                >
                  <social.i className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mt-24 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between text-xs text-muted-foreground gap-2">
        <div>© {new Date().getFullYear()} EcoTurbines. All rights reserved.</div>
        <div>Predict. Protect. Power.</div>
      </div>
    </section>
  );
};
