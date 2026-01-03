'use client';

import {AbstractIntlMessages, NextIntlClientProvider} from 'next-intl'; // 👈 導入 AbstractIntlMessages
import {LocaleProvider} from '@douyinfe/semi-ui';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';

interface ProvidersProps {
    children: React.ReactNode;
    locale: string;
    // 使用 next-intl 提供的抽象類型，它專門用於接收 JSON 消息對象
    messages: AbstractIntlMessages;
}

/**
 * 打包 react 需要的 内容，提供给 html.body
 * @param children
 * @param locale
 * @param messages
 * @constructor
 */
export function Providers({ children, locale, messages }: ProvidersProps) {
    const semiLocale = locale === 'zh' ? zh_CN : en_GB;

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <LocaleProvider locale={semiLocale}>
                {children}
            </LocaleProvider>
        </NextIntlClientProvider>
    );
}
