import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

interface GetStartedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GetStartedDialog = ({ open, onOpenChange }: GetStartedDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome to FinanceAI! 🎉",
      description: `Account created for ${name}. You're all set to start your financial journey!`,
    });
    
    onOpenChange(false);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-card border-border shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Get Started Free
          </DialogTitle>
          <DialogDescription>
            Create your account and start your journey to smarter financial decisions.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border-border"
            />
          </div>

          <Button type="submit" variant="hero" className="w-full gap-2 shadow-glow-lg">
            Create Account
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
