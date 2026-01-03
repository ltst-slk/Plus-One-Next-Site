import {redirect} from 'next/navigation';

export default async function DocsHome({
                                           params
                                       }: {
    params: Promise<{ locale: string }>;
}) {
    // 1. 获取当前 URL 中的语言前缀（如 'zh' 或 'en'）
    const { locale } = await params;

    // 2. 重定向到带语言前缀的完整路径
    // 例如：从 /zh/docs 重定向到 /zh/docs/getting-started
    redirect(`/${locale}/docs/getting-started`);
}
