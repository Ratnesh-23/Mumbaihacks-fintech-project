import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, TrendingUp, Shield } from "lucide-react";
import { GetStartedDialog } from "./GetStartedDialog";
import { HowItWorksDialog } from "./HowItWorksDialog";

const Hero = () => {
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 bg-gradient-hero">
        {/* Gradient Background Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-accent/10" />
        
        {/* Animated Glow Effects */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-glow opacity-40" />

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-glow-lg animate-slide-up backdrop-blur-sm">
            <Bot className="w-4 h-4" />
            AI-Powered Financial Coaching
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-fade-in">
            Your Personal
            <span className="block mt-3 bg-gradient-primary bg-clip-text text-transparent drop-shadow-sm">
              Financial Coach
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Autonomous AI that adapts to your spending patterns, income variability, and lifestyle—helping you make smarter financial decisions, proactively.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up pt-4" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              variant="hero" 
              className="gap-2 shadow-glow-lg hover:shadow-glow-lg hover:scale-105 transition-all text-base px-8"
              onClick={() => setGetStartedOpen(true)}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 hover:bg-accent/10 hover:border-accent transition-all text-base px-8"
              onClick={() => setHowItWorksOpen(true)}
            >
              See How It Works
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="group p-8 rounded-2xl bg-gradient-card backdrop-blur-sm border border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 mx-auto shadow-glow group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl mb-3">Adaptive Insights</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI learns your unique spending patterns and income cycles
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-card backdrop-blur-sm border border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-gradient-success flex items-center justify-center mb-5 mx-auto shadow-success group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7 text-success-foreground" />
              </div>
              <h3 className="font-bold text-xl mb-3">Proactive Coaching</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get personalized advice before financial mistakes happen
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-card backdrop-blur-sm border border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 mx-auto shadow-glow group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl mb-3">Built for Everyone</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Perfect for gig workers, freelancers, and everyday citizens
              </p>
            </div>
          </div>
        </div>
      </section>

      <GetStartedDialog open={getStartedOpen} onOpenChange={setGetStartedOpen} />
      <HowItWorksDialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen} />
    </>
  );
};

export default Hero;
