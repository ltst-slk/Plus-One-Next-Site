import {docsDir, getDocsList} from '@/lib/docs';
import DocsLayoutClient from '@/components/DocsLayoutClient';

/**
 * 获取 docItem List 并 引用 Layout配置
 * @param children
 * @constructor
 */
export default async function Layout({ children }: { children: React.ReactNode }) {
    const docs = await getDocsList(docsDir);
    // 将从文件系统读取的文档列表传给侧边栏
    return <DocsLayoutClient docs={docs}>{children}</DocsLayoutClient>;
}