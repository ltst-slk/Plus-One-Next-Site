'use client';

import React, {useSyncExternalStore} from 'react';
import {Button, Nav} from '@douyinfe/semi-ui';
import {useTranslations} from "next-intl";
import {
    IconArticle,
    IconGithubLogo,
    IconHelpCircle,
    IconLanguage,
    IconMoon,
    IconSemiLogo,
    IconSun
} from "@douyinfe/semi-icons";
import {usePathname, useRouter} from "next/navigation";
import {useLocale} from "use-intl";
// ... 其他导入

// 这是一个简单的客户端订阅逻辑
const emptySubscribe = () => () => {};
export function useIsMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,  // 客户端返回 true
        () => false  // 服务端返回 false
    );
}

/**
 * 首页的 顶部导航栏
 * @constructor
 */
export default function Navigation() {
    const isMounted = useIsMounted();
    const t = useTranslations('Nav');
    // ... 其他逻辑
    const pathname = usePathname(); // 获取当前路径，例如 "/zh/docs/getting-started"
    const router = useRouter();
    const locale = useLocale();
    const toggleLanguage = () => {
        // 1. 分割路径
        const segments = pathname.split('/');

        // 2. 假设路径格式始终是 /locale/path...
        // segments[0] 是空字符串，segments[1] 是当前语言 'zh' 或 'en'
        const newLocale = locale === 'zh' ? 'en' : 'zh';
        segments[1] = newLocale;

        // 3. 拼接新路径
        const newPath = segments.join('/');

        // 4. 执行跳转（Next.js 16 会自动处理平滑过渡）
        router.push(newPath);
    };
    // 如果未挂载，返回占位符。这不再触发同步 setState 警告。
    if (!isMounted) return <div style={{ height: '60px' }} />;

    return (
        <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
            <Nav.Header>
                <IconSemiLogo style={{fontSize: 36}}/>
            </Nav.Header>
            <Nav.Item itemKey="Docs" text="快速开始" link={'/docs/getting-started'} icon={<IconArticle size="large"/>}/>
            <Nav.Footer>
                <Button
                    theme="borderless"
                    icon={<IconSun size="large"/>}
                    style={{
                        color: 'var(--semi-color-text-2)',
                        marginRight: '8px',
                    }}
                />
                <Button
                    theme="borderless"
                    icon={<IconMoon size="large"/>}
                    style={{
                        color: 'var(--semi-color-text-2)',
                        marginRight: '8px',
                    }}
                />
                <Button
                    theme="borderless"
                    icon={<IconHelpCircle size="large"/>}
                    style={{
                        color: 'var(--semi-color-text-2)',
                        marginRight: '8px',
                    }}
                />
                <Button
                    theme="borderless"
                    icon={<IconGithubLogo size="large"/>}
                    style={{
                        color: 'var(--semi-color-text-2)',
                        marginRight: '8px',
                    }}
                />
                <Button
                    theme="borderless"
                    icon={<IconLanguage size="large"/>}
                    style={{
                        color: 'var(--semi-color-text-2)',
                        marginRight: '8px',
                    }}
                    onClick={toggleLanguage}
                />
            </Nav.Footer>
        </Nav>
    );
}
