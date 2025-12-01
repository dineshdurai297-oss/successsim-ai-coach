import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/successpilot-logo.png";

interface QuestionData {
  question: string;
  options?: string[];
  correct_answer?: string;
}

interface EvaluationData {
  score: number;
  correctness: string;
  communication: string;
  technical_accuracy: string;
  confidence: string;
  mistakes: string[];
  improvements: string[];
  perfect_answer: string;
}

const ActiveInterview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [interview, setInterview] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    loadInterview();
  }, [interviewId]);

  const loadInterview = async () => {
    try {
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("id", interviewId)
        .single();

      if (error) throw error;
      setInterview(data);
      generateNewQuestion(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const generateNewQuestion = async (interviewData: any) => {
    setLoading(true);
    setEvaluation(null);
    setUserAnswer("");

    try {
      const { data, error } = await supabase.functions.invoke("interview-ai", {
        body: {
          action: "generate_question",
          company: interviewData.company,
          jobRole: interviewData.job_role,
          roundType: interviewData.round_type,
        },
      });

      if (error) throw error;
      setCurrentQuestion(data);
    } catch (error: any) {
      toast({
        title: "Error generating question",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Empty Answer",
        description: "Please provide an answer",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: evalData, error: evalError } = await supabase.functions.invoke("interview-ai", {
        body: {
          action: "evaluate_answer",
          question: currentQuestion?.question,
          userAnswer,
        },
      });

      if (evalError) throw evalError;

      // Save to database
      const { error: dbError } = await supabase
        .from("interview_questions")
        .insert({
          interview_id: interviewId,
          question: currentQuestion?.question,
          user_answer: userAnswer,
          ai_feedback: JSON.stringify(evalData),
          score: evalData.score,
          correct_answer: evalData.perfect_answer,
        });

      if (dbError) throw dbError;

      setEvaluation(evalData);
      setQuestionCount(prev => prev + 1);
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

  const handleEndInterview = async () => {
    try {
      const { error } = await supabase
        .from("interviews")
        .update({ status: "completed" })
        .eq("id", interviewId);

      if (error) throw error;

      toast({
        title: "Interview Completed",
        description: "Great job! Check your history for results.",
      });
      navigate("/history");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src={logo} alt="SuccessPilot Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SuccessPilot
            </span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button onClick={() => navigate("/dashboard")} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Exit Interview
        </Button>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{interview.company} - {interview.job_role}</h1>
            <p className="text-muted-foreground">
              {interview.round_type.charAt(0).toUpperCase() + interview.round_type.slice(1)} Round
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Question {questionCount + 1}
          </Badge>
        </div>

        {loading && !currentQuestion ? (
          <Card className="p-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Generating your question...</p>
          </Card>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Question:</h2>
              <p className="text-lg mb-4">{currentQuestion?.question}</p>
              
              {currentQuestion?.options && (
                <div className="space-y-2">
                  {currentQuestion.options.map((option, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {!evaluation ? (
              <Card className="p-6">
                <h3 className="font-semibold mb-3">Your Answer:</h3>
                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[200px] mb-4"
                />
                <Button 
                  onClick={handleSubmitAnswer} 
                  disabled={loading}
                  className="bg-gradient-to-r from-primary to-secondary text-white"
                >
                  {loading ? "Evaluating..." : "Submit Answer"}
                </Button>
              </Card>
            ) : (
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Evaluation Results</h3>
                  <Badge 
                    className={`text-lg px-4 py-2 ${
                      evaluation.score >= 7 ? 'bg-success' : 
                      evaluation.score >= 5 ? 'bg-warning' : 'bg-destructive'
                    }`}
                  >
                    Score: {evaluation.score}/10
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Correctness</h4>
                    <p>{evaluation.correctness}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Communication</h4>
                    <p>{evaluation.communication}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Technical Accuracy</h4>
                    <p>{evaluation.technical_accuracy}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Confidence</h4>
                    <p>{evaluation.confidence}</p>
                  </div>
                </div>

                {evaluation.mistakes.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-destructive" />
                      Areas to Improve:
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {evaluation.mistakes.map((mistake, idx) => (
                        <li key={idx} className="text-muted-foreground">{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {evaluation.improvements.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      Improvement Suggestions:
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {evaluation.improvements.map((improvement, idx) => (
                        <li key={idx} className="text-muted-foreground">{improvement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Perfect Answer:</h4>
                  <p className="text-sm">{evaluation.perfect_answer}</p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => generateNewQuestion(interview)}
                    className="bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    Next Question
                  </Button>
                  <Button onClick={handleEndInterview} variant="outline">
                    End Interview
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveInterview;