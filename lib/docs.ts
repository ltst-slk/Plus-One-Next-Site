import {promises as fs} from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * 文档 Item
 */
export interface DocItem {
    slug: string;
    title: string;
}

// 基礎目錄
export const docsDir = "content/posts";

/**
 * 獲取目標語言目錄下的所有 mdx 文件 生成 文檔列表
 * @param locale 當前語言代碼 (如 'zh', 'en')
 */
export async function getDocsList(locale: string): Promise<DocItem[]> {
    // 1. 根據 locale 拼接路徑：content/posts/zh 或 content/posts/en
    console.log('locale', locale);
    const postsDirectory = path.join(process.cwd(), docsDir, locale);
    console.log('postsDirectory',postsDirectory);
    // 2. 防禦性檢查：如果該語言目錄不存在，返回空列表
    try {
        await fs.access(postsDirectory);
    } catch {
        console.warn(`Directory not found: ${postsDirectory}`);
        return [];
    }

    const files = await fs.readdir(postsDirectory);

    const docs = await Promise.all(
        files
            .filter((file) => file.endsWith('.mdx'))
            .map(async (file) => {
                const filePath = path.join(postsDirectory, file);
                const source = await fs.readFile(filePath, 'utf8');
                const { data } = matter(source);

                return {
                    slug: file.replace(/\.mdx$/, ''),
                    title: data.title || file.replace(/\.mdx$/, ''),
                };
            })
    );

    return docs;
}

/**
 * 獲取單個文檔內容
 */
export async function getDocContent(locale: string, slug: string) {
    const filePath = path.join(process.cwd(), docsDir, locale, `${slug}.mdx`);

    try {
        const source = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(source);
        return { data, content };
    } catch {
        return null;
    }
}

