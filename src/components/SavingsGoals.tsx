import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, Plane, Home, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { useCurrency } from "@/contexts/CurrencyContext";

const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    icon: Target,
    target: 5000,
    current: 2600,
    color: "hsl(158, 60%, 48%)",
  },
  {
    id: 2,
    name: "Vacation to Bali",
    icon: Plane,
    target: 2000,
    current: 850,
    color: "hsl(205, 85%, 60%)",
  },
  {
    id: 3,
    name: "Down Payment",
    icon: Home,
    target: 15000,
    current: 4200,
    color: "hsl(280, 75%, 62%)",
  },
  {
    id: 4,
    name: "Education Fund",
    icon: GraduationCap,
    target: 3000,
    current: 1200,
    color: "hsl(38, 92%, 50%)",
  },
];

export const SavingsGoals = () => {
  const { formatAmount } = useCurrency();
  const handleCreateGoal = () => {
    toast.success("Let's create a new goal! 🎯");
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Your Goals</h1>
          <p className="text-muted-foreground">Track your progress</p>
        </div>
        <Button
          onClick={handleCreateGoal}
          className="gap-2 bg-gradient-primary hover:opacity-90 shadow-glow"
        >
          <Plus className="w-5 h-5" />
          New Goal
        </Button>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-6">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100;
          const Icon = goal.icon;

          return (
            <Card
              key={goal.id}
              className="p-6 bg-gradient-card shadow-lg border-border/50 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                  style={{ background: `linear-gradient(135deg, ${goal.color}, ${goal.color}dd)` }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-1">{goal.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{formatAmount(goal.current)}</span>
                    <span className="text-sm text-muted-foreground">
                      of {formatAmount(goal.target)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{percentage.toFixed(0)}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      background: `linear-gradient(90deg, ${goal.color}, ${goal.color}dd)`,
                    }}
                  />
                </div>
              </div>

              {percentage >= 50 && (
                <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm">
                    <span className="font-semibold">🎉 You're halfway there!</span> Keep it up!
                  </p>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => toast("Adjusting goal settings...")}
                >
                  Adjust
                </Button>
                <Button 
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                  onClick={() => toast.success(`Added money to ${goal.name}! 💰`)}
                >
                  Add Money
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Total Savings */}
      <Card className="p-6 bg-gradient-card shadow-lg border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Saved</p>
            <p className="text-3xl font-bold">
              {formatAmount(goals.reduce((sum, g) => sum + g.current, 0))}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Total Goal</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              {formatAmount(goals.reduce((sum, g) => sum + g.target, 0))}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
