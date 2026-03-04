import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['sr', 'hu'],

    // Used when no locale matches
    defaultLocale: 'sr',

    // Don't prefix the default locale (sr) in the URL
    // e.g. /about (sr) vs /hu/about (hu)
    localePrefix: 'as-needed',

    // Disable automatic locale detection from browser cookies/Accept-Language header
    // This ensures SR is always the default unless URL explicitly contains /hu/
    localeDetection: false
});

export const config = {
    // Match all routes except Next.js internals, API routes, and static files
    // This ensures the middleware handles /projekti/..., /blog/..., /shop/... etc.
    matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)']
};
