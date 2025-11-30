import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Code, Users, Briefcase, FileText, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logo from "@/assets/successsim-logo.png";

const StudyMaterials = () => {
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
          Study Materials
        </h1>
        <p className="text-muted-foreground mb-8">Comprehensive resources for interview preparation</p>

        <div className="grid gap-6 animate-fade-in">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Aptitude & Reasoning</h2>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Number Systems</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• HCF and LCM formulas</li>
                    <li>• Divisibility rules (2, 3, 4, 5, 6, 8, 9, 10, 11)</li>
                    <li>• Prime numbers and composite numbers</li>
                    <li>• Practice: Find LCM of 12, 15, 20</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Percentage & Profit/Loss</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Percentage = (Part/Whole) × 100</li>
                    <li>• Profit% = (Profit/CP) × 100</li>
                    <li>• Loss% = (Loss/CP) × 100</li>
                    <li>• Successive discounts formula</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Time & Work</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Work = Time × Efficiency</li>
                    <li>• If A can do work in x days, work done in 1 day = 1/x</li>
                    <li>• Combined work formula</li>
                    <li>• Practice problems with multiple workers</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-6 w-6 text-secondary" />
              <h2 className="text-2xl font-semibold">Technical Topics</h2>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="tech-1">
                <AccordionTrigger>Data Structures</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Arrays: Time complexity O(1) for access, O(n) for search</li>
                    <li>• Linked Lists: Dynamic size, O(n) access</li>
                    <li>• Stacks: LIFO - push, pop, peek operations</li>
                    <li>• Queues: FIFO - enqueue, dequeue operations</li>
                    <li>• Trees: Binary trees, BST, AVL trees</li>
                    <li>• Hash Tables: O(1) average case for search/insert</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-2">
                <AccordionTrigger>Algorithms</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Sorting: Bubble O(n²), Merge O(n log n), Quick O(n log n)</li>
                    <li>• Searching: Binary search O(log n)</li>
                    <li>• Dynamic Programming: Memoization vs Tabulation</li>
                    <li>• Greedy Algorithms: Activity selection, Huffman coding</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-3">
                <AccordionTrigger>OOP Concepts</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Encapsulation: Bundling data and methods</li>
                    <li>• Inheritance: Parent-child relationship</li>
                    <li>• Polymorphism: Method overloading and overriding</li>
                    <li>• Abstraction: Hiding complex implementation</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-semibold">Group Discussion Topics</h2>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">Technology Impact</p>
                <p className="text-sm text-muted-foreground">AI replacing human jobs - boon or bane?</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">Work Culture</p>
                <p className="text-sm text-muted-foreground">Remote work vs Office work - which is better?</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">Leadership</p>
                <p className="text-sm text-muted-foreground">What makes a good team leader?</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">Current Affairs</p>
                <p className="text-sm text-muted-foreground">Social media impact on society</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">HR Questions & Answers</h2>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="hr-1">
                <AccordionTrigger>Tell me about yourself</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    <strong>Tip:</strong> Follow the Present-Past-Future formula. Start with your current role/studies, 
                    mention relevant past experiences, and conclude with your future goals aligned with the company.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="hr-2">
                <AccordionTrigger>Why should we hire you?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    <strong>Tip:</strong> Focus on your unique skills that match the job requirements. 
                    Mention specific achievements and how you can add value to the company.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="hr-3">
                <AccordionTrigger>What are your strengths and weaknesses?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    <strong>Strengths:</strong> Choose 2-3 strengths relevant to the job with examples.<br/>
                    <strong>Weaknesses:</strong> Mention a genuine weakness and how you're working to improve it.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-secondary" />
              <h2 className="text-2xl font-semibold">Resume Tips</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                Keep it to 1-2 pages maximum
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                Use action verbs (Developed, Implemented, Managed)
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                Quantify achievements with numbers and percentages
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                Tailor resume for each job application
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                Include relevant projects with tech stack
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                Proofread for grammar and spelling errors
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-semibold">Company-Specific Preparation</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">TCS/Infosys/Wipro</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Strong aptitude skills required</li>
                  <li>• Focus on communication skills</li>
                  <li>• Basic programming concepts</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Amazon/Google/Microsoft</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Data structures & algorithms</li>
                  <li>• System design for senior roles</li>
                  <li>• Behavioral questions (STAR method)</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;