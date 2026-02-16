import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['sr', 'hu'],

    // Used when no locale matches
    defaultLocale: 'sr',

    // Don't prefix the default locale (sr) in the URL
    // e.g. /about (sr) vs /hu/about (hu)
    localePrefix: 'as-needed'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(sr|hu)/:path*']
};
