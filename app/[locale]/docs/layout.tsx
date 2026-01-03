import {getDocsList} from '@/lib/docs';
import DocsLayoutClient from '@/components/DocsLayoutClient';

/**
 * 獲取對應語言的文檔列表並應用布局
 */
export default async function Layout({
                                         children,
                                         params
                                     }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>; // 👈 Next.js 16 規範：params 是 Promise
}) {
    // 1. 解析 locale 參數
    const { locale } = await params;

    // 2. 傳入 locale 而非 docsDir
    // 這樣 lib/docs.ts 內部會去讀取 content/posts/{locale} 目錄
    const docs = await getDocsList(locale);

    console.log(`[DocsLayout] 加載語言: ${locale}, 文檔數量: ${docs.length}`);

    return (
        <DocsLayoutClient docs={docs}>
            {children}
        </DocsLayoutClient>
    );
}
