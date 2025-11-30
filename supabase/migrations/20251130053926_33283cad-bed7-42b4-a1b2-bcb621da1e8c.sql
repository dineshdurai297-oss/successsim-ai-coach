-- Create interviews table to store interview sessions
CREATE TABLE public.interviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company TEXT NOT NULL,
  job_role TEXT NOT NULL,
  round_type TEXT NOT NULL CHECK (round_type IN ('aptitude', 'technical', 'gd', 'personal')),
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interview_questions table to store questions and answers
CREATE TABLE public.interview_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  interview_id UUID NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  user_answer TEXT,
  ai_feedback TEXT,
  score INTEGER,
  correct_answer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_questions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for interviews
CREATE POLICY "Users can view their own interviews"
  ON public.interviews FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interviews"
  ON public.interviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interviews"
  ON public.interviews FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for interview_questions
CREATE POLICY "Users can view their own interview questions"
  ON public.interview_questions FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM public.interviews WHERE id = interview_id
  ));

CREATE POLICY "Users can create questions for their interviews"
  ON public.interview_questions FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM public.interviews WHERE id = interview_id
  ));

CREATE POLICY "Users can update their own interview questions"
  ON public.interview_questions FOR UPDATE
  USING (auth.uid() IN (
    SELECT user_id FROM public.interviews WHERE id = interview_id
  ));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_interviews_updated_at
  BEFORE UPDATE ON public.interviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();