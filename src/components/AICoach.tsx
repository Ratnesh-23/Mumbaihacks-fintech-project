import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AICoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI financial coach. I've been analyzing your spending patterns and I have some insights to share. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your spending patterns, I notice you typically spend more on weekends. Consider setting a weekend budget to stay on track.",
        "Your income varies month to month. I'd recommend building an emergency fund of 3-6 months of expenses.",
        "Great question! Let me analyze your recent transactions and provide personalized advice.",
        "I've noticed you're doing well with grocery budgeting. Consider applying the same strategy to your entertainment spending.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }]);
    }, 1000);

    setInput("");
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = { role: "user", content: question };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const responses: { [key: string]: string } = {
        "How can I save more each month?": "Great question! Based on your spending history, I've identified 3 key areas: 1) Dining out ($450/mo) - try meal prepping 2 days/week to save ~$150. 2) Subscriptions ($89/mo) - you have 4 unused services. 3) Impulse purchases - setting up a 24-hour rule could save $200/mo.",
        "Analyze my spending patterns": "I've analyzed your last 90 days. Key insights: Your spending is highest on Fridays (32% above average), you have irregular income but consistent expenses, and you're trending 12% over budget this month. Your biggest category is groceries ($620/mo), which is actually well-managed for your income level!",
      };
      const response = responses[question] || "Let me help you with that. I'm analyzing your financial data to provide personalized insights.";
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 1200);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-glow-lg">
            <Sparkles className="w-4 h-4" />
            AI-Powered Insights
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mt-4">Chat with Your Coach</h2>
          <p className="text-lg text-muted-foreground">Get personalized financial advice anytime</p>
        </div>

        <Card className="bg-gradient-card border-border shadow-xl overflow-hidden hover:shadow-2xl transition-all">
          <ScrollArea className="h-[500px] p-6">
            <div className="space-y-5">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 animate-fade-in ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm ${
                      message.role === "user"
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-5 border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about your finances..."
                className="flex-1 border-border focus:ring-primary"
              />
              <Button 
                onClick={handleSend} 
                size="icon" 
                variant="hero" 
                className="shadow-glow hover:scale-105 transition-transform"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className="p-5 bg-primary/5 border-primary/20 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => handleQuickQuestion("How can I save more each month?")}
          >
            <p className="text-sm font-semibold group-hover:text-primary transition-colors">💡 How can I save more each month?</p>
          </Card>
          <Card 
            className="p-5 bg-success/5 border-success/20 hover:border-success/50 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => handleQuickQuestion("Analyze my spending patterns")}
          >
            <p className="text-sm font-semibold group-hover:text-success transition-colors">📊 Analyze my spending patterns</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AICoach;
