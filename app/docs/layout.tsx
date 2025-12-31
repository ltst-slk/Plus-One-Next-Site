// app/docs/layout.tsx (Server Component)
import { getDocsList } from '@/lib/docs';
import DocsLayoutClient from '@/conponents/DocsLayoutClient';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const docs = await getDocsList();

    // 将从文件系统读取的文档列表传给侧边栏
    return <DocsLayoutClient docs={docs}>{children}</DocsLayoutClient>;
}