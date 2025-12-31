// lib/docs.ts
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getDocsList() {
    const postsDirectory = path.join(process.cwd(), 'content/posts/');
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