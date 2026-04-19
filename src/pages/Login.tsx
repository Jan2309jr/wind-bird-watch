import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wind } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="glass-strong rounded-3xl p-8 w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4 glow-orange">
                <Wind className="h-6 w-6 text-background" />
            </div>
            <h1 className="text-3xl font-display font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-2">Sign in to EcoTurbines Dashboard</p>
        </div>

        <form className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Email Address</label>
                <Input type="email" placeholder="name@company.com" className="h-11 bg-background/50" />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Password</label>
                <Input type="password" placeholder="••••••••" className="h-11 bg-background/50" />
            </div>
            <Button asChild className="w-full h-11 glow-orange">
                <Link to="/dashboard">Sign In</Link>
            </Button>
        </form>

        <div className="text-center text-xs text-muted-foreground">
             Don't have an account? <span className="text-primary cursor-pointer hover:underline">Contact Administrator</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
