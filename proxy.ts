// proxy.ts (原 middleware.ts)
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // 必须与您 [locale] 支持的语言一致
    locales: ['zh', 'en'],
    // 默认语言
    defaultLocale: 'zh',
    // 强制在 URL 中显示语言前缀 (如 /zh)
    localePrefix: 'always'
});

export const config = {
    // 这里的 Matcher 必须覆盖根路径 / 以及所有带 locale 的路径
    // 排除静态资源、favicon 等
    matcher: [
        '/',
        '/(zh|en)/:path*',
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};
