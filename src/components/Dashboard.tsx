import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Wallet } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const monthlyBudget = 3000;
  const currentSpending = 1850;
  const percentageUsed = (currentSpending / monthlyBudget) * 100;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">Financial Overview</h2>
          <p className="text-lg text-muted-foreground">Your financial health at a glance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="group p-7 bg-gradient-card border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                <p className="text-4xl font-bold">$4,250.00</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-success">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+12.5% from last month</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                <Wallet className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
          </Card>

          <Card className="group p-7 bg-gradient-card border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Monthly Income</p>
                <p className="text-4xl font-bold">$3,650.00</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-success">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+8.2% from last month</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-success flex items-center justify-center shadow-success group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-success-foreground" />
              </div>
            </div>
          </Card>

          <Card className="group p-7 bg-gradient-card border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Monthly Spending</p>
                <p className="text-4xl font-bold">$1,850.00</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-destructive">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>61.7% of budget used</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-7 h-7 text-destructive" />
              </div>
            </div>
          </Card>
        </div>

        {/* Budget Progress */}
        <Card className="p-7 bg-gradient-card border-border shadow-lg hover:shadow-xl transition-all">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl">Monthly Budget</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  ${currentSpending.toFixed(2)} of ${monthlyBudget.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{percentageUsed.toFixed(1)}%</p>
                <p className="text-sm font-medium text-muted-foreground">used</p>
              </div>
            </div>
            <Progress value={percentageUsed} className="h-4" />
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-7 bg-gradient-card border-border shadow-lg hover:shadow-xl transition-all">
          <h3 className="font-bold text-xl mb-5">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { name: "Grocery Store", amount: -85.32, category: "Food", date: "Today" },
              { name: "Freelance Payment", amount: 450.00, category: "Income", date: "Yesterday" },
              { name: "Gas Station", amount: -45.00, category: "Transport", date: "2 days ago" },
              { name: "Subscription Service", amount: -12.99, category: "Entertainment", date: "3 days ago" },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 rounded-xl bg-card/80 border border-border hover:bg-card hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${
                    transaction.amount > 0 ? 'bg-success/10' : 'bg-destructive/10'
                  }`}>
                    <DollarSign className={`w-6 h-6 ${
                      transaction.amount > 0 ? 'text-success' : 'text-destructive'
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className={`font-bold text-lg ${
                  transaction.amount > 0 ? 'text-success' : 'text-foreground'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
