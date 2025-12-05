import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, BookOpen, Info, ArrowRight } from "lucide-react";
import logo from "@/assets/successsim-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="SuccessSim Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SuccessSim
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Your AI-Powered Path to
            <br />
            Interview Success
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master your interviews with AI-driven practice sessions, real-time feedback, and comprehensive study materials
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
          <Card className="p-6 hover:shadow-lg transition-shadow border-primary/20 hover:border-primary/40">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-lg w-fit mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Interview Practice</h3>
            <p className="text-muted-foreground">
              Practice with AI-powered mock interviews tailored to your target company and role
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-secondary/20 hover:border-secondary/40">
            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 p-3 rounded-lg w-fit mb-4">
              <BookOpen className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Study Materials</h3>
            <p className="text-muted-foreground">
              Access comprehensive study guides, technical notes, and company-specific prep resources
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-accent/20 hover:border-accent/40">
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-3 rounded-lg w-fit mb-4">
              <Info className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Feedback</h3>
            <p className="text-muted-foreground">
              Get instant, detailed feedback on your answers with improvement suggestions
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-12 text-center bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of candidates who have successfully prepared with SuccessSim
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
              Get Started Free
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Index;