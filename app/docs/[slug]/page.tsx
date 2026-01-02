import { compileMDX } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { docsDir } from "@/lib/docs";
// 重点：必须从标记了 'use client' 的文件中导入组件
import {
    MdxButton,
    MdxCard,
    MdxTag,
    MdxCode,
    MdxH1,
    MdxH2,
    MdxH3,
    MdxH4,
    MdxP, MdxA
} from '@/components/mdx-client-components';

async function getPost(slug: string) {
    try {
        // 1. 定位文件路径
        const filePath = path.join(process.cwd(), docsDir, `${slug}.mdx`);

        // 2. 获取 source (这就是 MDX 字符串源码)
        const source = await fs.readFile(filePath, 'utf8');

        // 3. 编译 MDX
        const { content, frontmatter } = await compileMDX({
            source,
            options: { parseFrontmatter: true },
            components: {
                // 映射原生 HTML 标签到 Semi UI 包装组件
                h1: MdxH1,
                h2: MdxH2,
                h3: MdxH3,
                h4: MdxH4,
                p: MdxP,
                a: MdxA,
                code: MdxCode,
                // 记得移除 pre 的默认渲染，否则会和 CodeHighlight 冲突产生双重背景
                pre: ({ children }: { children?: React.ReactNode }) => <>{children}</>,

                // 业务自定义组件
                Button: MdxButton,
                Card: MdxCard,
                Tag: MdxTag,
            },
        });

        return { content, frontmatter };
    } catch (error) {
        console.error("MDX 编译错误:", error);
        return null;
    }
}

// 页面组件保持不变
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="prose max-w-none">
            {/* 这里的 post.content 已经是编译好的 React 节点 */}
            {post.content}
        </article>
    );
}

// 强制 SSG
export const dynamicParams = false;

export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), docsDir);
    const files = await fs.readdir(postsDirectory);
    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => ({
            slug: file.replace(/\.mdx$/, ''),
        }));
}
