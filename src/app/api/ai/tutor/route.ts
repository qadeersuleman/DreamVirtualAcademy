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

// In-memory sliding window rate limiter for security & anti-abuse
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, limit = 20, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  // Extract client IP for rate limiting
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { error: 'Boht zyada requests bheji gayi hain. Baraye meherbani 1 minute baad dobara koshish karein.' },
      { status: 429 }
    );
  }

  const dvm_apiKey = process.env.GEMINI_API_KEY;

  if (!dvm_apiKey) {
    return NextResponse.json(
      { error: 'AI Tutor service is currently unavailable. API key not configured.' },
      { status: 503 }
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
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${dvm_apiKey}`;
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
      { error: 'Ustad AI is currently busy. Please try asking again in a moment.' },
      { status: 502 }
    );
  } catch {
    return NextResponse.json(
      { error: 'An unexpected security or processing error occurred.' },
      { status: 500 }
    );
  }
}

