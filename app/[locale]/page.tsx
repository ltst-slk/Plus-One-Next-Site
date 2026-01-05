import HomePageClient from '@/components/HomePageClient';

export function generateStaticParams() {
    return [{locale: 'zh'}, {locale: 'en'}];
}

export default function Page() {
    // 这里直接渲染，HomePageClient 内部会处理 Semi UI 的兼容性

    return <>
        <link rel="preload" href="/screenshot_light.jpg" as="image"/>
        <link rel="preload" href="/screenshot_dark.jpg" as="image"/>
        <HomePageClient/>
    </>;
}
