import { compileMDX } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

// 1. 独立获取数据的函数
async function getPost(slug: string) {
    try {
        const filePath = path.join(process.cwd(), 'content/posts/', `${slug}.mdx`);
        const source = await fs.readFile(filePath, 'utf8');

        const { content, frontmatter } = await compileMDX({
            source,
            options: { parseFrontmatter: true },
        });

        return { content, frontmatter };
    } catch (error) {
        // 如果文件不存在，触发 404
        return null;
    }
}

export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), 'content/posts/');
    const files = await fs.readdir(postsDirectory);

    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => ({
            slug: file.replace(/\.mdx$/, ''),
        }));
}

// 2. 干净的页面组件
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    // 如果找不到内容，调用 Next.js 内置的 notFound()
    if (!post) {
        notFound();
    }

    // JSX 现在在 try/catch 之外
    return (
        <article className="prose">
            {post.content}
        </article>
    );
}

export const dynamicParams = false;
