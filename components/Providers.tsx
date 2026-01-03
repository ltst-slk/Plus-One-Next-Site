'use client';

import {AbstractIntlMessages, NextIntlClientProvider} from 'next-intl';
import {LocaleProvider} from '@douyinfe/semi-ui';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';

import {ThemeProvider} from '@/components/ThemeProvider';

interface ProvidersProps {
    children: React.ReactNode;
    locale: string;
    messages: AbstractIntlMessages;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
    const semiLocale = locale === 'zh' ? zh_CN : en_GB;

    return (
        <ThemeProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <LocaleProvider locale={semiLocale}>
                    {children}
                </LocaleProvider>
            </NextIntlClientProvider>
        </ThemeProvider>
    );
}