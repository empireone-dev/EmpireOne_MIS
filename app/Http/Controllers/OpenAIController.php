<?php

namespace App\Http\Controllers;

use App\Models\GuideQuestions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OpenAIController extends Controller
{
    public function ai_initial_interview(Request $request)
    {
        $userPrompt = $request->input('prompt');
        $appId = $request->input('app_id');

        // Get guide questions from database
        $guideQuestions = \App\Models\GuideQuestion::all();
        $questionsList = $guideQuestions->pluck('guideqs')->toArray();

        // Get applicant information if app_id is provided
        $applicantInfo = '';
        if ($appId) {
            $applicant = \App\Models\Applicant::where('app_id', $appId)->first();
            if ($applicant) {
                $applicantInfo = "\n\nApplicant Information:\n";
                $applicantInfo .= "Name: {$applicant->fname} {$applicant->mname} {$applicant->lname}\n";
                $applicantInfo .= "Position Applied: {$applicant->position}\n";
                $applicantInfo .= "Site: {$applicant->site}\n";
            }
        }

        // Load and parse the PDF from public path (simplified approach)
        $pdfPath = public_path('pdf/cocd.pdf');
        $pdfText = '';

        // For now, we'll skip PDF parsing and focus on the interview functionality
        // You can implement PDF parsing later with appropriate libraries
        if (file_exists($pdfPath)) {
            // $pdfText = "Company policies and guidelines from COCD document";
            $pdfText = '';
        }

        // Create comprehensive prompt with guide questions
        $guideQuestionsText = implode("\n", array_map(function ($q, $i) {
            return ($i + 1) . ". " . $q;
        }, $questionsList, array_keys($questionsList)));

        $systemPrompt = "You are an AI interviewer conducting an initial interview for EmpireOne BPO Solutions Inc. Your role is to:

1. Ask interview questions based on the provided guide questions
2. Evaluate responses professionally and constructively
3. Provide follow-up questions when appropriate
4. Reference company policies from the COCD document when relevant
5. Maintain a professional, friendly tone throughout the interview

Guide Questions to use:
{$guideQuestionsText}

Use these questions as a foundation but feel free to ask follow-up questions based on the applicant's responses. Respond in clean HTML suitable for WYSIWYG editors. Do not use markdown or code fences.";

        // Combine all information
        $fullPrompt = $userPrompt . $applicantInfo . "\n\nReference Document:\n" . $pdfText;

        $response = Http::withToken(env('OPENAI_API_KEY'))->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => $systemPrompt,
                ],
                [
                    'role' => 'user',
                    'content' => $fullPrompt,
                ],
            ],
            'temperature' => 0.7,
            'max_tokens' => 1024,
        ]);

        if ($response->status() == 200) {
            $rawOutput = trim($response['choices'][0]['message']['content']);

            return response()->json([
                'result' => $rawOutput,
                'guide_questions' => $questionsList,
            ]);
        } else {
            // Provide a fallback response when OpenAI API fails
            $fallbackResponses = [
                "Thank you for your response. That's a great answer that shows your experience and dedication.",
                "I appreciate your detailed response. Your perspective on this matter is valuable.",
                "Thank you for sharing that insight. It demonstrates your understanding of the role.",
                "That's an excellent point. Your experience clearly shows through your answer.",
                "I value your thoughtful response. It gives me a good sense of your capabilities."
            ];

            $randomResponse = $fallbackResponses[array_rand($fallbackResponses)];

            return response()->json([
                'result' => "<p>{$randomResponse}</p>",
                'guide_questions' => $questionsList,
                'fallback' => true,
                'error_message' => 'OpenAI API temporarily unavailable, using fallback response'
            ]);
        }
    }

    public function get_guide_questions_for_ai()
    {
        $guideQuestions = \App\Models\GuideQuestion::all();

        // Randomly select 5 questions if there are more than 5
        if ($guideQuestions->count() > 5) {
            $guideQuestions = $guideQuestions->random(5);
        }

        return response()->json([
            'data' => $guideQuestions->values(), // Reset array keys after random selection
            'status' => 'success'
        ]);
    }

    public function save_ai_interview_response(Request $request)
    {
        $request->validate([
            'app_id'     => 'required|string',
            'question'   => 'required|string',
            'answer'     => 'required|string',
            'ai_feedback' => 'nullable|string'
        ]);

        // System and user prompts
        $systemPrompt = "You are an experienced interviewer. 
    Your role is to provide clear, constructive, and professional feedback on candidate responses. 
    Focus only on strengths, weaknesses, and suggestions for improvement. 
    Do NOT ask follow-up questions, do NOT suggest another question, and do NOT include unrelated content.";

        $userPrompt = "Interview Question: {$request->question}\n\n"
            . "Candidate's Answer: {$request->answer}\n\n"
            . "Provide feedback in 3–5 sentences, focusing on clarity, relevance, and professionalism.";

        // Call OpenAI API
        $response = Http::withToken(env('OPENAI_API_KEY'))
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o',
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $userPrompt],
                ],
                'max_tokens' => 300,
            ]);

        // Default feedback
        $aiFeedback = "No feedback generated.";

        if ($response->successful() && isset($response['choices'][0]['message']['content'])) {
            $aiFeedback = trim($response['choices'][0]['message']['content']);
        }

        // Save to GuideQuestions table
        GuideQuestions::create([
            'app_id'      => $request->app_id,
            'guideqs'     => $request->question,
            'answer'      => $request->answer,
            'ai_feedback' => $aiFeedback,
            'int_id'      => 'AI_' . time(), // Unique interview ID
        ]);

        return response()->json([
            'status'         => 'success',
            'ai_feedback'    => $aiFeedback,
            'guide_question' => $request->question,
        ], 200);
    }


    public function get_ai_interview_results($app_id)
    {
        $interviewResults = \App\Models\GuideQuestions::where('app_id', $app_id)
            ->where('int_id', 'like', 'AI_%')
            ->get();

        return response()->json([
            'data' => $interviewResults,
            'status' => 'success'
        ]);
    }
}
