import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bot, TrendingUp, Shield, Zap, BarChart3, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HowItWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HowItWorksDialog = ({ open, onOpenChange }: HowItWorksDialogProps) => {
  const steps = [
    {
      icon: Zap,
      title: "Connect Your Accounts",
      description: "Securely link your bank accounts and financial services in seconds.",
      gradient: "bg-gradient-primary",
    },
    {
      icon: BarChart3,
      title: "AI Analyzes Your Patterns",
      description: "Our AI learns your income cycles, spending habits, and financial behavior.",
      gradient: "bg-gradient-success",
    },
    {
      icon: Bell,
      title: "Get Proactive Insights",
      description: "Receive personalized recommendations before financial mistakes happen.",
      gradient: "bg-gradient-primary",
    },
    {
      icon: TrendingUp,
      title: "Achieve Your Goals",
      description: "Watch your financial health improve with AI-powered guidance.",
      gradient: "bg-gradient-success",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gradient-card border-border shadow-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            How FinanceAI Works
          </DialogTitle>
          <DialogDescription>
            Your autonomous financial coach in 4 simple steps
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 mt-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-5 bg-card/80 backdrop-blur-sm border-border hover:shadow-lg transition-all group">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl ${step.gradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Bank-Level Security</h4>
              <p className="text-xs text-muted-foreground">
                Your data is encrypted and secure. We never share your information with third parties.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
