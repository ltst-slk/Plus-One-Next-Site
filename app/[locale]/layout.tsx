import {Providers} from '@/components/Providers';
import '../globals.css'
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });
export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // 重点：直接根据 locale 动态导入消息，跳过 getMessages() 查找配置的过程
    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        // 如果找不到对应的语言包，回退到默认语言或 404
        messages = (await import(`../../messages/zh.json`)).default;
    }

    return (
        <html lang={locale}>
        <body className={inter.className}>
        <Providers locale={locale} messages={messages}>
            {children}
        </Providers>
        </body>
        </html>
    );
}
