import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, company, jobRole, roundType, userAnswer, question } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (action === 'generate_question') {
      // Generate a question based on company, role, and round type
      systemPrompt = `You are an expert interview coach. Generate realistic, challenging interview questions based on the company, job role, and interview round type provided.`;
      
      if (roundType === 'aptitude') {
        userPrompt = `Generate 1 aptitude/reasoning question suitable for ${company} ${jobRole} position. Include the question and 4 options (A, B, C, D). Format as JSON: {"question": "...", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "correct_answer": "A"}`;
      } else if (roundType === 'technical') {
        userPrompt = `Generate 1 technical question for ${jobRole} role at ${company}. Make it role-specific and challenging. Format as JSON: {"question": "..."}`;
      } else if (roundType === 'gd') {
        userPrompt = `Generate 1 group discussion topic relevant to ${company} or ${jobRole}. Format as JSON: {"question": "Group Discussion Topic: ..."}`;
      } else if (roundType === 'personal') {
        userPrompt = `Generate 1 HR/behavioral interview question for ${jobRole} at ${company}. Format as JSON: {"question": "..."}`;
      }
    } else if (action === 'evaluate_answer') {
      // Evaluate user's answer
      systemPrompt = `You are an expert interview evaluator. Analyze the candidate's answer thoroughly and provide detailed feedback.`;
      userPrompt = `Question: ${question}\n\nCandidate's Answer: ${userAnswer}\n\nProvide evaluation in JSON format:
{
  "score": 7,
  "correctness": "Brief assessment of correctness",
  "communication": "Brief assessment of communication clarity",
  "technical_accuracy": "Brief assessment of technical accuracy (if applicable)",
  "confidence": "Brief assessment of confidence level",
  "mistakes": ["Mistake 1", "Mistake 2"],
  "improvements": ["Improvement suggestion 1", "Improvement suggestion 2"],
  "perfect_answer": "A model answer to this question"
}

Score out of 10. Be constructive but honest.`;
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API Error:', errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Try to parse JSON from the response
    let result;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1]);
      } else {
        result = JSON.parse(content);
      }
    } catch (e) {
      console.error('JSON Parse Error:', e);
      result = { raw_response: content };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in interview-ai function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});