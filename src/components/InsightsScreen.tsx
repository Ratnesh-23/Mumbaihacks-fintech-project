import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Target, Zap, Award, Flame } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const insights = [
  {
    title: "Spending Streak",
    description: "You've stayed under budget for 7 days straight!",
    icon: Flame,
    color: "hsl(0, 70%, 60%)",
    streak: "7 days",
  },
  {
    title: "Savings Champion",
    description: "You saved 25% more than last month",
    icon: Trophy,
    color: "hsl(38, 92%, 50%)",
    achievement: "+25%",
  },
  {
    title: "Smart Spender",
    description: "Your grocery spending is 15% below average",
    icon: Award,
    color: "hsl(158, 60%, 48%)",
    badge: "Top 10%",
  },
];

const badges = [
  { name: "Week Warrior", icon: "🎯", earned: true },
  { name: "Savings Star", icon: "⭐", earned: true },
  { name: "Budget Boss", icon: "💪", earned: true },
  { name: "Goal Getter", icon: "🏆", earned: false },
  { name: "Money Master", icon: "👑", earned: false },
];

export const InsightsScreen = () => {
  const { formatAmount } = useCurrency();
  
  const tips = [
    {
      title: "Cut Coffee Costs",
      description: `Making coffee at home could save you ${formatAmount(120)}/month`,
      icon: "☕",
      impact: "High",
    },
    {
      title: "Bundle Subscriptions",
      description: "You have 3 streaming services. Consider sharing with family",
      icon: "📺",
      impact: "Medium",
    },
    {
      title: "Pack Lunch Twice a Week",
      description: `Save ${formatAmount(40)} weekly by bringing lunch from home`,
      icon: "🍱",
      impact: "High",
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-hero p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Insights & Achievements</h1>
        <p className="text-muted-foreground">You're doing amazing! 🌟</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card
              key={index}
              className="p-6 bg-gradient-card shadow-lg border-border/50 hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md animate-bounce-gentle"
                  style={{ background: `linear-gradient(135deg, ${insight.color}, ${insight.color}dd)` }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{insight.title}</h3>
                    {insight.streak && (
                      <Badge className="bg-gradient-primary text-primary-foreground border-0 shadow-sm">
                        {insight.streak}
                      </Badge>
                    )}
                    {insight.achievement && (
                      <Badge className="bg-gradient-success text-success-foreground border-0 shadow-sm">
                        {insight.achievement}
                      </Badge>
                    )}
                    {insight.badge && (
                      <Badge className="bg-gradient-accent text-accent-foreground border-0 shadow-sm">
                        {insight.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Badges</h2>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <Card
              key={index}
              className={`p-4 text-center shadow-md border-border/50 transition-all ${
                badge.earned
                  ? "bg-gradient-card hover:shadow-lg hover:scale-105 cursor-pointer"
                  : "bg-muted/50 opacity-60"
              }`}
            >
              <div className={`text-4xl mb-2 ${badge.earned ? "animate-bounce-gentle" : "grayscale"}`}>
                {badge.icon}
              </div>
              <p className="text-xs font-medium">{badge.name}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Smart Tips */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Smart Tips for You</h2>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <Card
              key={index}
              className="p-5 bg-gradient-card shadow-md border-border/50 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{tip.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold">{tip.title}</h3>
                    <Badge
                      variant={tip.impact === "High" ? "default" : "secondary"}
                      className={
                        tip.impact === "High"
                          ? "bg-gradient-success text-success-foreground border-0"
                          : ""
                      }
                    >
                      {tip.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Streak Counter */}
      <Card className="p-6 bg-gradient-calm shadow-lg border-primary/30">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Flame className="w-8 h-8 text-warning animate-bounce-gentle" />
            <span className="text-5xl font-bold">7</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Day Streak!</h3>
            <p className="text-sm text-muted-foreground">
              Keep going! You're building amazing financial habits 💪
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
