import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// 定义支持的语言列表
const locales = ['zh', 'en'];

/**
 * i18n 配置加载
 */
export default getRequestConfig(async ({ locale }) => {
    // 1. 验证 locale 是否存在且合法
    if (!locale || !locales.includes(locale)) {
        notFound();
    }

    // 2. 此时经过上面的 if 判断，TypeScript 知道 locale 一定是 string 类型
    return {
        locale: locale, // 这里的 locale 不再是 undefined
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
