import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Building, Briefcase, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import logo from "@/assets/successsim-logo.png";

const History = () => {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("interviews")
        .select(`
          *,
          interview_questions (
            id,
            score
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Calculate average scores for each interview
      const interviewsWithScores = data.map(interview => {
        const questions = interview.interview_questions;
        const avgScore = questions.length > 0
          ? Math.round(questions.reduce((sum: number, q: any) => sum + (q.score || 0), 0) / questions.length)
          : 0;
        return { ...interview, avgScore, questionCount: questions.length };
      });

      setInterviews(interviewsWithScores);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoundLabel = (roundType: string) => {
    const labels: Record<string, string> = {
      aptitude: "Aptitude",
      technical: "Technical",
      gd: "Group Discussion",
      personal: "Personal Interview",
    };
    return labels[roundType] || roundType;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src={logo} alt="SuccessSim Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SuccessSim
            </span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <Link to="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Interview History
        </h1>
        <p className="text-muted-foreground mb-8">Review your past interviews and track your progress</p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your history...</p>
          </div>
        ) : interviews.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No interviews yet. Start your first one!</p>
            <Link to="/interview-setup">
              <Button className="bg-gradient-to-r from-primary to-secondary text-white">
                Start Interview
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 animate-fade-in">
            {interviews.map((interview) => (
              <Card key={interview.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-semibold">{interview.company}</h3>
                      <Badge variant="outline" className="text-sm">
                        {getRoundLabel(interview.round_type)}
                      </Badge>
                      {interview.status === "completed" && (
                        <Badge className="bg-success text-success-foreground">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                      {interview.status === "in_progress" && (
                        <Badge variant="secondary">In Progress</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {interview.job_role}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(interview.created_at)}
                      </div>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Questions Answered: </span>
                        <span className="font-semibold">{interview.questionCount}</span>
                      </div>
                      {interview.avgScore > 0 && (
                        <div>
                          <span className="text-muted-foreground">Avg Score: </span>
                          <span className={`font-semibold ${
                            interview.avgScore >= 7 ? 'text-success' :
                            interview.avgScore >= 5 ? 'text-warning' : 'text-destructive'
                          }`}>
                            {interview.avgScore}/10
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {interview.status === "in_progress" && (
                    <Link to={`/interview/${interview.id}`}>
                      <Button className="bg-gradient-to-r from-primary to-secondary text-white">
                        Continue Interview
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Progress Summary */}
        {interviews.length > 0 && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-primary">
                  {interviews.filter(i => i.status === "completed").length}
                </p>
                <p className="text-muted-foreground">Completed Interviews</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">
                  {interviews.reduce((sum, i) => sum + i.questionCount, 0)}
                </p>
                <p className="text-muted-foreground">Total Questions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">
                  {interviews.length > 0
                    ? Math.round(
                        interviews.reduce((sum, i) => sum + i.avgScore, 0) / interviews.length
                      )
                    : 0}
                  /10
                </p>
                <p className="text-muted-foreground">Overall Average Score</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default History;