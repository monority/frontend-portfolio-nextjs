import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { routing } from './i18n/routing';

const i18nMiddleware = createMiddleware(routing);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const ADMIN_DASHBOARD_PREFIX = '/messages/admin/conversations';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes(ADMIN_DASHBOARD_PREFIX)) {
    const response = NextResponse.next({
      request: { headers: request.headers },
    });

    const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const locale = pathname.split('/')[1] || routing.defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/messages/admin`, request.url));
    }

    return response;
  }

  return i18nMiddleware(request);
}

export const config = {
  matcher: ['/', '/en', '/fr', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
