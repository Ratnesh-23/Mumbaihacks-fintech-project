import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Wallet, Target, ArrowRight, Sparkles, Pencil } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const insights = [
  {
    icon: "🎯",
    title: "Great job on groceries!",
    description: "You've spent 15% less this week",
    action: "View details",
  },
  {
    icon: "💡",
    title: "Upcoming bill alert",
    description: "Your rent is due in 3 days",
    action: "Set reminder",
  },
  {
    icon: "🌟",
    title: "Savings milestone",
    description: "You're halfway to your emergency fund!",
    action: "Celebrate",
  },
];

export const HomeDashboard = ({ onNavigate }: { onNavigate?: (screen: string) => void }) => {
  const { formatAmount, currency } = useCurrency();
  const [activeTab, setActiveTab] = useState<"home" | "goals" | "insights" | "profile">("home");
  
  // Editable financial data
  const [balance, setBalance] = useState(4250);
  const [weeklySpent, setWeeklySpent] = useState(280);
  const [weeklyBudget, setWeeklyBudget] = useState(400);
  
  // Dialog states
  const [balanceDialogOpen, setBalanceDialogOpen] = useState(false);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);
  const [tempBalance, setTempBalance] = useState("");
  const [tempSpent, setTempSpent] = useState("");
  const [tempBudget, setTempBudget] = useState("");
  
  const healthScore = 78;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (healthScore / 100) * circumference;

  const handleUpdateBalance = () => {
    const newBalance = parseFloat(tempBalance);
    if (!isNaN(newBalance) && newBalance >= 0) {
      setBalance(newBalance);
      setBalanceDialogOpen(false);
      toast.success("Balance updated successfully!");
    } else {
      toast.error("Please enter a valid amount");
    }
  };

  const handleUpdateBudget = () => {
    const newSpent = parseFloat(tempSpent);
    const newBudget = parseFloat(tempBudget);
    if (!isNaN(newSpent) && !isNaN(newBudget) && newSpent >= 0 && newBudget > 0) {
      setWeeklySpent(newSpent);
      setWeeklyBudget(newBudget);
      setBudgetDialogOpen(false);
      toast.success("Budget updated successfully!");
    } else {
      toast.error("Please enter valid amounts");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Good morning, Alex 👋</h1>
          <p className="text-muted-foreground">Let's make today count</p>
        </div>
      </div>

      {/* Financial Health Score */}
      <div className="px-6 pb-6">
        <Card className="p-8 bg-gradient-card shadow-lg border-border/50">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-muted/30"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="text-primary" stopColor="currentColor" />
                    <stop offset="100%" className="text-accent" stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{healthScore}</span>
                <span className="text-sm text-muted-foreground">Health Score</span>
              </div>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-xl font-semibold">Looking Good! 💪</h3>
              <p className="text-sm text-muted-foreground">You're doing better than last month</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-6 pb-6 grid grid-cols-2 gap-4">
        <Dialog open={balanceDialogOpen} onOpenChange={setBalanceDialogOpen}>
          <DialogTrigger asChild>
            <Card className="p-5 bg-gradient-card shadow-md border-border/50 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-sm">
                  <Wallet className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground mb-1">Balance</p>
                    <Pencil className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-bold">{formatAmount(balance)}</p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Balance</DialogTitle>
              <DialogDescription>
                Enter your current account balance
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="balance">Balance</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {currency.symbol}
                  </span>
                  <Input
                    id="balance"
                    type="number"
                    placeholder={balance.toString()}
                    value={tempBalance}
                    onChange={(e) => setTempBalance(e.target.value)}
                    className="pl-8"
                    onKeyPress={(e) => e.key === "Enter" && handleUpdateBalance()}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setBalanceDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateBalance}
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                >
                  Update
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Card className="p-5 bg-gradient-card shadow-md border-border/50 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-success flex items-center justify-center shadow-sm">
              <Target className="w-5 h-5 text-success-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Goal Progress</p>
              <p className="text-2xl font-bold">52%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Insights Carousel */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Smart Insights</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 text-primary"
            onClick={() => {
              toast.success("Viewing all insights");
              onNavigate?.("insights");
            }}
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <Card
              key={index}
              className="p-5 bg-gradient-card shadow-md border-border/50 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
              onClick={() => toast(insight.title, { description: insight.description })}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl animate-bounce-gentle">{insight.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-primary font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success(`${insight.action} complete!`);
                    }}
                  >
                    {insight.action} →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Budget This Week */}
      <div className="px-6 pb-24">
        <h2 className="text-xl font-semibold mb-4">This Week's Budget</h2>
        <Dialog open={budgetDialogOpen} onOpenChange={setBudgetDialogOpen}>
          <DialogTrigger asChild>
            <Card className="p-6 bg-gradient-card shadow-lg border-border/50 cursor-pointer hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Spent</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{formatAmount(weeklySpent)} / {formatAmount(weeklyBudget)}</span>
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <Progress value={(weeklySpent / weeklyBudget) * 100} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  You have <span className="font-semibold text-foreground">{formatAmount(weeklyBudget - weeklySpent)}</span> left for the rest of the week
                </p>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Weekly Budget</DialogTitle>
              <DialogDescription>
                Update your spending and budget for this week
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="spent">Amount Spent</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {currency.symbol}
                  </span>
                  <Input
                    id="spent"
                    type="number"
                    placeholder={weeklySpent.toString()}
                    value={tempSpent}
                    onChange={(e) => setTempSpent(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Weekly Budget</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {currency.symbol}
                  </span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder={weeklyBudget.toString()}
                    value={tempBudget}
                    onChange={(e) => setTempBudget(e.target.value)}
                    className="pl-8"
                    onKeyPress={(e) => e.key === "Enter" && handleUpdateBudget()}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setBudgetDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateBudget}
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                >
                  Update
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-xl">
        <div className="flex items-center justify-around py-3 px-6 max-w-lg mx-auto">
          <button 
            className="flex flex-col items-center gap-1 text-primary"
            onClick={() => {
              setActiveTab("home");
              toast("Home");
            }}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => {
              setActiveTab("goals");
              onNavigate?.("goals");
              toast("Opening Goals");
            }}
          >
            <Target className="w-6 h-6" />
            <span className="text-xs">Goals</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => {
              setActiveTab("insights");
              onNavigate?.("insights");
              toast("Opening Insights");
            }}
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-xs">Insights</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => {
              setActiveTab("profile");
              onNavigate?.("profile");
              toast("Opening Profile");
            }}
          >
            <Wallet className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
