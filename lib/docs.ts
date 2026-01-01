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

/**
 * 获取目标目录下的 素有 mdx 文件 生成 文档列表
 */
export async function getDocsList(filePath: string): Promise<DocItem[]> {
    const postsDirectory = path.join(process.cwd(), filePath);
    const files = await fs.readdir(postsDirectory);

    const docs = await Promise.all(
        files
            .filter((file) => file.endsWith('.mdx'))
            .map(async (file) => {
                const filePath = path.join(postsDirectory, file);
                const source = await fs.readFile(filePath, 'utf8');
                const { data } = matter(source); // 提取标题等 metadata

                return {
                    slug: file.replace(/\.mdx$/, ''),
                    title: data.title || file.replace(/\.mdx$/, ''), // 如果没有 title 则用文件名
                };
            })
    );

    return docs;
}