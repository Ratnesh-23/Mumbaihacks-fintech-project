import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

export const BudgetForecast = () => {
  const { formatAmount } = useCurrency();
  const categories = [
    { name: "Food", amount: 450, color: "hsl(158, 60%, 48%)", percentage: 30 },
    { name: "Transport", amount: 200, color: "hsl(205, 85%, 60%)", percentage: 13 },
    { name: "Bills", amount: 600, color: "hsl(280, 75%, 62%)", percentage: 40 },
    { name: "Entertainment", amount: 150, color: "hsl(38, 92%, 50%)", percentage: 10 },
    { name: "Other", amount: 100, color: "hsl(0, 0%, 60%)", percentage: 7 },
  ];

  const monthlyData = [
    { month: "Jan", income: 3200, expenses: 2800 },
    { month: "Feb", income: 2900, expenses: 2600 },
    { month: "Mar", income: 3400, expenses: 2900 },
    { month: "Apr", income: 3100, expenses: 3200 },
    { month: "May", income: 3500, expenses: 2700 },
    { month: "Jun", income: 3300, expenses: 2950 },
  ];

  const maxValue = Math.max(...monthlyData.flatMap(d => [d.income, d.expenses]));

  return (
    <div className="min-h-screen bg-gradient-hero p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Budget & Forecast</h1>
        <p className="text-muted-foreground">Your income vs expenses trends</p>
      </div>

      {/* Alert Banner */}
      <Alert className="border-warning/50 bg-warning/5">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <AlertDescription className="text-foreground">
          <span className="font-semibold">Heads up!</span> You might run short by {formatAmount(150)} next week based on your spending pattern.
        </AlertDescription>
      </Alert>

      {/* Income vs Expense Graph */}
      <Card className="p-6 bg-gradient-card shadow-lg border-border/50">
        <h2 className="text-xl font-semibold mb-6">Income vs Expenses</h2>
        <div className="space-y-6">
          {monthlyData.map((data, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium w-12">{data.month}</span>
                <div className="flex-1 mx-4 flex gap-1">
                  <div
                    className="h-10 bg-gradient-success rounded-lg transition-all hover:opacity-80 flex items-center justify-end px-3 text-white text-sm font-medium shadow-sm"
                    style={{ width: `${(data.income / maxValue) * 100}%` }}
                  >
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {formatAmount(data.income)}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="w-12"></span>
                <div className="flex-1 mx-4 flex gap-1">
                  <div
                    className="h-10 bg-gradient-accent rounded-lg transition-all hover:opacity-80 flex items-center justify-end px-3 text-white text-sm font-medium shadow-sm"
                    style={{ width: `${(data.expenses / maxValue) * 100}%` }}
                  >
                    <TrendingDown className="w-4 h-4 mr-1" />
                    {formatAmount(data.expenses)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-success"></div>
            <span className="text-sm text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-accent"></div>
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card className="p-6 bg-gradient-card shadow-lg border-border/50">
        <h2 className="text-xl font-semibold mb-6">Spending by Category</h2>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{category.name}</span>
                <span className="text-muted-foreground">{formatAmount(category.amount)}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${category.percentage}%`,
                    backgroundColor: category.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total Spending</span>
            <span className="text-2xl font-bold">{formatAmount(categories.reduce((sum, c) => sum + c.amount, 0))}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
