import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/successsim-logo.png";

const COMPANIES = [
  "TCS", "Infosys", "Wipro", "Amazon", "Google", "Microsoft", "Meta", "Apple",
  "Accenture", "Cognizant", "HCL", "Tech Mahindra"
];

const JOB_ROLES = [
  "Software Engineer", "Data Analyst", "HR Manager", "Business Analyst",
  "DevOps Engineer", "Full Stack Developer", "Product Manager", "QA Engineer"
];

const ROUND_TYPES = [
  { value: "aptitude", label: "Aptitude Round" },
  { value: "technical", label: "Technical Round" },
  { value: "gd", label: "Group Discussion" },
  { value: "personal", label: "Personal Interview" }
];

const InterviewSetup = () => {
  const [company, setCompany] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [roundType, setRoundType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStart = async () => {
    if (!company || !jobRole || !roundType) {
      toast({
        title: "Missing Information",
        description: "Please select all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: interview, error } = await supabase
        .from("interviews")
        .insert({
          user_id: user.id,
          company,
          job_role: jobRole,
          round_type: roundType,
          status: "in_progress"
        })
        .select()
        .single();

      if (error) throw error;

      navigate(`/interview/${interview.id}`);
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

        <Card className="max-w-2xl mx-auto p-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Setup Your Interview
          </h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Target Company</Label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Job Role</Label>
              <Select value={jobRole} onValueChange={setJobRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Round Type</Label>
              <Select value={roundType} onValueChange={setRoundType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select round type" />
                </SelectTrigger>
                <SelectContent>
                  {ROUND_TYPES.map((round) => (
                    <SelectItem key={round.value} value={round.value}>
                      {round.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleStart} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
              size="lg"
            >
              {loading ? "Starting..." : "Start Interview"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InterviewSetup;