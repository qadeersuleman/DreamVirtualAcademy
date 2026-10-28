import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GEMINI_MODELS = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];

const SYSTEM_INSTRUCTION = `
You are "Ustad AI" (استاد اي آءِ), the official AI science tutor and mentor at Dreams Virtual Academy (DVA), Sindh, Pakistan.
Your mission is to help Sindhi and Pakistani students excel in:
1. Sindh Textbook Board (STBB) Science, Physics, Chemistry, Biology, and Math (Classes 6th to 12th).
2. STS / IBA Sukkur BPS-05 to 15, JST (Junior School Teacher), PST, and SPSC Educator and competitive job exam preparations.

Guidelines:
- Language: Respond in the language requested by the student or match their input language. You are fluent in Sindhi (سنڌي), Urdu (اردو), and English. When explaining in Sindhi, use authentic, clear Sindhi educational terminology.
- Tone: Warm, respectful, encouraging, and academic (like a dedicated teacher).
- Formatting: Use concise bullet points, bold key definitions, and clear examples from daily life in Sindh (e.g., farming, solar energy, river Indus, local vehicles).
- For MCQs: If asked to explain an MCQ, clearly explain WHY the correct answer is right and WHY the incorrect options are wrong, with a golden rule to remember for the STS exam.
- Safety: Strictly answer educational, scientific, academic, career guidance, and test-prep related questions. Keep responses polite and under 300 words.
`;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Gemini API key is not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { prompt, context, mode = 'ask' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'A valid prompt is required.' },
        { status: 400 }
      );
    }

    // Limit input length for safety & rate limiting
    const safePrompt = prompt.slice(0, 1500).trim();
    const safeContext = context ? String(context).slice(0, 1500).trim() : '';

    let userContent = safePrompt;
    if (mode === 'explain_mcq' && safeContext) {
      userContent = `[CONTEXT: MCQ QUESTION REVIEW]\n${safeContext}\n\nStudent question / request: ${safePrompt}`;
    }

    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userContent }]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 800,
      }
    };

    // Try models with automatic fallback
    let lastError = '';
    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({
              reply: replyText,
              model: model,
            });
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = errData.error?.message || `Model ${model} returned ${response.status}`;
        }
      } catch (err: unknown) {
        const e = err as Error;
        lastError = e.message;
      }
    }

    return NextResponse.json(
      { error: lastError || 'Unable to generate response from Gemini AI. Please try again.' },
      { status: 502 }
    );
  } catch (err: unknown) {
    const e = err as Error;
    return NextResponse.json(
      { error: e.message || 'Internal server error while processing AI request.' },
      { status: 500 }
    );
  }
}

