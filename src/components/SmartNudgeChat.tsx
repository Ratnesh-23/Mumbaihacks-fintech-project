import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Clock, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Message {
  id: number;
  type: "bot" | "user" | "nudge";
  content: string;
  actions?: { label: string; variant?: "default" | "outline" | "ghost" }[];
}

export const SmartNudgeChat = () => {
  const { formatAmount } = useCurrency();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "Hey! 👋 I noticed you've spent quite a bit on dining out this week. Want to save some money?",
    },
    {
      id: 2,
      type: "nudge",
      content: `💡 Try cooking at home 3 times this week and save ~${formatAmount(60)}`,
      actions: [
        { label: "Save", variant: "default" },
        { label: "Skip", variant: "outline" },
        { label: "Remind Later", variant: "ghost" },
      ],
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: input,
    };

    const botResponse: Message = {
      id: Date.now() + 1,
      type: "bot",
      content: `Great question! Based on your spending patterns, I'd recommend setting aside ${formatAmount(150)} each week for groceries. This gives you flexibility while staying on track.`,
    };

    setMessages([...messages, userMessage, botResponse]);
    setInput("");
  };

  const handleAction = (action: string) => {
    if (action === "Save") {
      toast.success("Goal added! I'll help you track this 🎯");
    } else if (action === "Skip") {
      toast("No worries! Let me know if you change your mind");
    } else {
      toast("I'll remind you tomorrow ⏰");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <div className="p-6 bg-card border-b border-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Your Financial Coach</h1>
            <p className="text-sm text-muted-foreground">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            {message.type === "bot" || message.type === "nudge" ? (
              <div className="max-w-[85%] space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <Card
                    className={`p-4 shadow-md border-border/50 ${
                      message.type === "nudge"
                        ? "bg-gradient-calm border-primary/30"
                        : "bg-card"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant={action.variant || "default"}
                            size="sm"
                            onClick={() => handleAction(action.label)}
                            className={
                              action.variant === "default"
                                ? "bg-gradient-primary hover:opacity-90 shadow-sm"
                                : ""
                            }
                          >
                            {action.label === "Save" && <CheckCircle className="w-4 h-4 mr-1" />}
                            {action.label === "Skip" && <X className="w-4 h-4 mr-1" />}
                            {action.label === "Remind Later" && <Clock className="w-4 h-4 mr-1" />}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="max-w-[85%] p-4 bg-primary text-primary-foreground shadow-md">
                <p className="text-sm leading-relaxed">{message.content}</p>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-6 bg-card border-t border-border shadow-lg">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything about your finances..."
            className="flex-1 border-2"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-gradient-primary hover:opacity-90 shadow-md"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
