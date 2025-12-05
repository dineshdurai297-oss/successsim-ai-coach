import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Target, BookOpen, History, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import logo from "@/assets/successsim-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <img src={logo} alt="SuccessSim Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SuccessSim
              </span>
            </Link>
            <Button onClick={handleLogout} variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to Your Dashboard
        </h1>
        <p className="text-muted-foreground mb-12">Choose an option to begin your preparation</p>

        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          <Link to="/interview-setup">
            <Card className="p-8 hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-primary/20 hover:border-primary/40">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-lg w-fit mb-4">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Start Interview</h3>
              <p className="text-muted-foreground">
                Begin a new AI-powered mock interview session
              </p>
            </Card>
          </Link>

          <Link to="/study-materials">
            <Card className="p-8 hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-secondary/20 hover:border-secondary/40">
              <div className="bg-gradient-to-br from-secondary/10 to-accent/10 p-4 rounded-lg w-fit mb-4">
                <BookOpen className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Study Materials</h3>
              <p className="text-muted-foreground">
                Access preparation guides and resources
              </p>
            </Card>
          </Link>

          <Link to="/history">
            <Card className="p-8 hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-accent/20 hover:border-accent/40">
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-4 rounded-lg w-fit mb-4">
                <History className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Interview History</h3>
              <p className="text-muted-foreground">
                Review past interviews and track progress
              </p>
            </Card>
          </Link>
        </div>

        {/* Motivational Quote */}
        <Card className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <p className="text-lg italic text-center">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </p>
          <p className="text-center text-muted-foreground mt-2">- Winston Churchill</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;