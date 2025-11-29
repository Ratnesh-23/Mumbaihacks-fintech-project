import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Calendar, Wallet, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useCurrency } from "@/contexts/CurrencyContext";

const goals = [
  { id: "emergency", icon: "🛡️", title: "Build Emergency Fund", description: "Save for unexpected expenses" },
  { id: "debt", icon: "💳", title: "Pay Off Debt", description: "Reduce and eliminate debt" },
  { id: "savings", icon: "🎯", title: "Save More Money", description: "Increase monthly savings" },
  { id: "income", icon: "📈", title: "Manage Variable Income", description: "Plan for income fluctuations" },
];

const incomeFrequencies = [
  { id: "weekly", title: "Weekly", description: "I get paid every week" },
  { id: "biweekly", title: "Bi-weekly", description: "Every two weeks" },
  { id: "monthly", title: "Monthly", description: "Once a month" },
  { id: "variable", title: "Variable", description: "It changes (gig work)" },
];

export const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const { currency } = useCurrency();
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [income, setIncome] = useState("");

  const handleComplete = () => {
    toast.success("Welcome! Your finances aren't perfect — and that's okay 💪");
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-card shadow-xl border-border/50">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Goal Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Target className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl font-semibold">What's your main goal?</h2>
              <p className="text-muted-foreground">We'll help you get there, step by step</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all hover:scale-105 ${
                    selectedGoal === goal.id
                      ? "border-primary bg-primary/5 shadow-glow"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="text-4xl mb-3">{goal.icon}</div>
                  <h3 className="font-semibold text-lg mb-1">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!selectedGoal}
              className="w-full gap-2 bg-gradient-primary hover:opacity-90"
              size="lg"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 2: Income Frequency */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Calendar className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl font-semibold">How often do you get paid?</h2>
              <p className="text-muted-foreground">This helps us plan your budget better</p>
            </div>

            <div className="space-y-3">
              {incomeFrequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => setSelectedFrequency(freq.id)}
                  className={`w-full p-5 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                    selectedFrequency === freq.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-1">{freq.title}</h3>
                  <p className="text-sm text-muted-foreground">{freq.description}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="gap-2"
                size="lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedFrequency}
                className="flex-1 gap-2 bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Income Input */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Wallet className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl font-semibold">What's your typical income?</h2>
              <p className="text-muted-foreground">An estimate is fine — you can adjust this later</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="income" className="text-base">
                  {selectedFrequency === "variable" ? "Average" : "Typical"} Income
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground">{currency.symbol}</span>
                  <Input
                    id="income"
                    type="number"
                    placeholder="0"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="pl-10 h-14 text-2xl border-2"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  💡 <span className="font-medium text-foreground">Pro tip:</span> If your income varies, enter your average monthly income. We'll help you plan for the ups and downs.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="gap-2"
                size="lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!income}
                className="flex-1 gap-2 bg-gradient-primary hover:opacity-90 shadow-glow"
                size="lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
