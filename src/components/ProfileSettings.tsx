import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, Globe, Moon, Shield, Bell, HelpCircle, LogOut, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { useCurrency, currencies } from "@/contexts/CurrencyContext";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProfileSettings = () => {
  const [notifications, setNotifications] = useState(true);
  const { currency, setCurrency } = useCurrency();
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-gradient-hero p-6 space-y-6">
      {/* Profile Header */}
      <Card className="p-6 bg-gradient-card shadow-lg border-border/50">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-glow">
            A
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">Alex Johnson</h2>
            <p className="text-sm text-muted-foreground">alex.johnson@email.com</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toast("Opening profile editor...")}
          >
            Edit
          </Button>
        </div>
      </Card>

      {/* Preferences */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold px-1">Preferences</h2>

        <Card className="p-5 bg-gradient-card shadow-md border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <Label className="text-base font-medium cursor-pointer">Currency</Label>
                <p className="text-sm text-muted-foreground">Select your preferred currency</p>
              </div>
            </div>
            <Select
              value={currency.code}
              onValueChange={(code) => {
                const selected = currencies.find((c) => c.code === code);
                if (selected) {
                  setCurrency(selected);
                  toast.success(`Currency changed to ${selected.name} (${selected.symbol})`);
                }
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.symbol} {curr.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card shadow-md border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="text-base font-medium cursor-pointer">Language</Label>
                <p className="text-sm text-muted-foreground">English (US)</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => toast("Opening language selector...")}
            >
              Change
            </Button>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card shadow-md border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label htmlFor="dark-mode" className="text-base font-medium cursor-pointer">
                  Dark Mode
                </Label>
                <p className="text-sm text-muted-foreground">Easier on the eyes</p>
              </div>
            </div>
            <Switch 
              id="dark-mode" 
              checked={theme === "dark"}
              onCheckedChange={(checked) => {
                setTheme(checked ? "dark" : "light");
                toast(checked ? "Dark mode enabled 🌙" : "Light mode enabled ☀️");
              }}
            />
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card shadow-md border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label htmlFor="notifications" className="text-base font-medium cursor-pointer">
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Get smart nudges & alerts</p>
              </div>
            </div>
            <Switch 
              id="notifications" 
              checked={notifications}
              onCheckedChange={(checked) => {
                setNotifications(checked);
                toast(checked ? "Notifications enabled 🔔" : "Notifications disabled 🔕");
              }}
            />
          </div>
        </Card>
      </div>

      {/* Privacy & Security */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold px-1">Privacy & Security</h2>

        <Card 
          className="p-5 bg-gradient-card shadow-md border-border/50 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => toast("Opening privacy settings...")}
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Privacy Settings</p>
              <p className="text-sm text-muted-foreground">Manage your data & privacy</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-5 bg-gradient-card shadow-md border-border/50 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => toast("Opening 2FA settings...")}
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add extra security</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Support */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold px-1">Support</h2>

        <Card 
          className="p-5 bg-gradient-card shadow-md border-border/50 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => toast("Opening help center...")}
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Help Center</p>
              <p className="text-sm text-muted-foreground">FAQs & guides</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-5 bg-gradient-card shadow-md border-border/50 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => toast("Contacting support...")}
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Contact Support</p>
              <p className="text-sm text-muted-foreground">We're here to help</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
        onClick={() => toast("Logged out successfully")}
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </Button>

      <div className="text-center text-sm text-muted-foreground pb-8">
        Version 1.0.0 • Made with 💚
      </div>
    </div>
  );
};
