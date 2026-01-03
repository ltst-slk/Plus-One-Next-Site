'use client'

import '@douyinfe/semi-ui/dist/css/semi.min.css'
import {usePathname, useRouter} from 'next/navigation'
import {Button, Layout, Nav} from '@douyinfe/semi-ui';
import {IconBell, IconBytedanceLogo, IconFile, IconHelpCircle, IconLanguage, IconSemiLogo} from '@douyinfe/semi-icons';
import {DocItem} from "@/lib/docs";
import React, {useMemo, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl'; // 👈 引入国际化 Hook


/**
 * 文档 layout 封装页
 * @param children
 * @param docs
 * @constructor
 */
export default function DocsLayoutClient({
                                             children,
                                             docs
                                         }: {
    children: React.ReactNode,
    docs: DocItem[]
}) {
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale(); // 👈 获取当前语言（zh 或 en）
    const t = useTranslations('DocsLayout'); // 👈 获取翻译

    const [collapsed, setCollapsed] = useState(false);
    const siderWidth = collapsed ? 60 : 240;

    // 👈 动态生成带语言前缀的导航项
    const navItems = useMemo(() => docs.map(doc => ({
        itemKey: `/${locale}/docs/${doc.slug}`, // 路径变为 /zh/docs/xxx
        text: doc.title,
        icon: <IconFile />
    })), [docs, locale]);

    const { Header, Footer, Sider, Content } = Layout;

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
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <Sider
                style={{
                    backgroundColor: 'var(--semi-color-bg-1)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: siderWidth,
                    zIndex: 10,
                    transition: 'width 0.2s ease',
                }}
            >
                <Nav
                    style={{ height: '100%' }}
                    selectedKeys={[pathname]} // pathname 本身已包含 /zh/...，能自动匹配
                    items={navItems}
                    onSelect={(data) => router.push(data.itemKey as string)}
                    header={{
                        logo: <IconSemiLogo style={{ fontSize: 36 }} />,
                        text: 'Plus One',
                        link: `/${locale}` // 👈 回到当前语言首页
                    }}
                    footer={{
                        collapseButton: true,
                    }}
                    onCollapseChange={setCollapsed}
                />
            </Sider>

            <Layout
                style={{
                    border: '1px solid var(--semi-color-border)',
                    marginLeft: siderWidth,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'margin-left 0.2s ease',
                }}
            >
                <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                    <Nav
                        mode="horizontal"
                        footer={
                            <>
                                <Button
                                    theme="borderless"
                                    icon={<IconBell size="large" />}
                                    style={{ color: 'var(--semi-color-text-2)', marginRight: '12px' }}
                                />
                                <Button
                                    theme="borderless"
                                    icon={<IconHelpCircle size="large" />}
                                    style={{ color: 'var(--semi-color-text-2)', marginRight: '12px' }}
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
                            </>
                        }
                    />
                </Header>

                <Content
                    style={{
                        flex: 1,
                        padding: '24px',
                        backgroundColor: 'var(--semi-color-bg-0)',
                        overflowY: 'auto',
                        maxWidth: '80%', margin: '0 auto'
                    }}
                >
                    {children}
                </Content>

                <Footer
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px',
                        color: 'var(--semi-color-text-2)',
                        backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                    }}
                >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <IconBytedanceLogo size="large" style={{ marginRight: '8px' }} />
                        <span>{t('copyright')}</span> {/* 👈 国际化版权 */}
                    </span>
                    <span>
                        <span style={{ marginRight: '24px' }}>{t('customerService')}</span> {/* 👈 国际化文字 */}
                        <span>{t('feedback')}</span>
                    </span>
                </Footer>
            </Layout>
        </div>
    );
}
