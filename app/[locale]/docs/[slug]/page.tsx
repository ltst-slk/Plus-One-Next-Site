import {compileMDX} from 'next-mdx-remote/rsc';
import {promises as fs} from 'fs';
import path from 'path';
import {notFound} from 'next/navigation';
import {
    MdxA,
    MdxButton,
    MdxCard,
    MdxCode,
    MdxH1,
    MdxH2,
    MdxH3,
    MdxH4,
    MdxP,
    MdxTag
} from '@/components/mdx-client-components';
import {docsDir} from "@/lib/docs";

async function getPost(locale: string, slug: string) {
    try {
        // 1. 核心改动：路径中加入 locale 维度
        const filePath = path.join(process.cwd(), docsDir, locale, `${slug}.mdx`);

        // 检查文件是否存在
        try {
            await fs.access(filePath);
        } catch {
            return null;
        }

        const source = await fs.readFile(filePath, 'utf8');

        // 2. 编译 MDX (逻辑保持不变)
        const { content, frontmatter } = await compileMDX({
            source,
            options: { parseFrontmatter: true },
            components: {
                h1: MdxH1,
                h2: MdxH2,
                h3: MdxH3,
                h4: MdxH4,
                p: MdxP,
                a: MdxA,
                code: MdxCode,
                pre: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
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

// 页面组件适配 locale 参数
export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params; // 2026 规范：必须 await params
    const post = await getPost(locale, slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="prose max-w-none">
            {post.content}
        </article>
    );
}

// 强制 SSG
export const dynamicParams = false;

/**
 * 2026 规范：静态参数生成必须包含 locale 和 slug
 */
export async function generateStaticParams() {
    const locales = ['zh', 'en'];
    const paths = [];

    for (const locale of locales) {
        const localeDir = path.join(process.cwd(), docsDir, locale);

        try {
            const files = await fs.readdir(localeDir);
            const localePaths = files
                .filter((file) => file.endsWith('.mdx'))
                .map((file) => ({
                    locale: locale,
                    slug: file.replace(/\.mdx$/, ''),
                }));
            paths.push(...localePaths);
        } catch (e) {
            console.warn(`跳过不存在的目录: ${localeDir}`);
        }
    }

    return paths;
}
