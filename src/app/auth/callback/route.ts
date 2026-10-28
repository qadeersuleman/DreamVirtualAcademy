import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Sanitize redirect target to strictly prevent Open Redirect & SSRF attacks.
 * Only internal relative paths starting with a single '/' are permitted.
 */
function sanitizeRedirectPath(path: string | null): string {
  if (!path) return '/dashboard';
  // Disallow protocol relative URLs (//attacker.com), absolute URLs, or Windows backslashes
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) {
    return '/dashboard';
  }
  return path;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const rawNext = requestUrl.searchParams.get('next');
  const safeNext = sanitizeRedirectPath(rawNext);

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in or password reset process completes (strictly sanitized)
  return NextResponse.redirect(new URL(safeNext, requestUrl.origin));
}
