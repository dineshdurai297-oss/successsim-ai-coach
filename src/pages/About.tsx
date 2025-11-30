import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Zap, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/successsim-logo.png";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="SuccessSim Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SuccessSim
            </span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About SuccessSim
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering candidates to ace their interviews with AI-powered practice
            </p>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              SuccessSim was created to bridge the gap between job seekers and their dream careers. 
              We believe that interview preparation should be accessible, personalized, and effective. 
              By leveraging cutting-edge AI technology, we provide realistic interview simulations 
              that help candidates build confidence and improve their performance.
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-lg w-fit mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Practice</h3>
              <p className="text-muted-foreground">
                Tailored interview questions based on your target company, role, and interview type
              </p>
            </Card>

            <Card className="p-6">
              <div className="bg-gradient-to-br from-secondary/10 to-accent/10 p-3 rounded-lg w-fit mb-4">
                <Zap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
              <p className="text-muted-foreground">
                Get detailed AI-powered analysis of your answers with specific improvement suggestions
              </p>
            </Card>

            <Card className="p-6">
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-3 rounded-lg w-fit mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Resources</h3>
              <p className="text-muted-foreground">
                Access study materials, technical notes, and company-specific preparation guides
              </p>
            </Card>

            <Card className="p-6">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-3 rounded-lg w-fit mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your improvement over time with detailed history and performance analytics
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Choose Your Path</h4>
                  <p className="text-muted-foreground">
                    Select your target company, desired role, and the type of interview round you want to practice
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Practice with AI</h4>
                  <p className="text-muted-foreground">
                    Answer realistic interview questions generated specifically for your chosen parameters
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Get Detailed Feedback</h4>
                  <p className="text-muted-foreground">
                    Receive comprehensive analysis including scores, mistakes, improvements, and perfect answers
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Track & Improve</h4>
                  <p className="text-muted-foreground">
                    Review your history, monitor progress, and continuously improve your interview skills
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of candidates who have improved their interview skills with SuccessSim
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
                Get Started Free
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;