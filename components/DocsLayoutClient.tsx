'use client'

import '@douyinfe/semi-ui/dist/css/semi.min.css'
import {usePathname, useRouter} from 'next/navigation'
import {Card, Layout, Nav} from '@douyinfe/semi-ui';
import {IconBytedanceLogo, IconFile} from '@douyinfe/semi-icons';
import {DocItem} from "@/lib/docs";
import React, {useMemo, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import Navigation from "@/components/Navigation";


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

    // 👈 动态生成带语言前缀的导航项
    const navItems = useMemo(() => docs.map(doc => ({
        itemKey: `/${locale}/docs/${doc.slug}`, // 路径变为 /zh/docs/xxx
        text: doc.title,
        icon: <IconFile/>
    })), [docs, locale]);

    const {Header, Footer, Sider, Content} = Layout;

    return (
        <div style={{width: '100vw', height: '100vh', overflow: 'hidden'}}>
            <Layout
                style={{
                    border: '1px solid var(--semi-color-border)',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'margin-left 0.2s ease',
                }}
            >
                <Header style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
                    <Navigation/>
                </Header>
                <Layout style={{
                    border: '1px solid var(--semi-color-border)',
                    height: '100vh',
                }}>
                    <Sider>
                        <Nav
                            style={{height: '100%'}}
                            selectedKeys={[pathname]} // pathname 本身已包含 /zh/...，能自动匹配
                            items={navItems}
                            onSelect={(data) => router.push(data.itemKey as string)}
                            footer={{
                                collapseButton: true,
                            }}
                            onCollapseChange={setCollapsed}
                        />
                    </Sider>
                    <Content style={{overflowY: 'auto'}}>
                        <Card
                            bordered={false}
                            headerLine={false}
                            style={{
                                flex: 1,
                                padding: '24px',
                                paddingLeft: '10%',
                                paddingRight: '10%',
                                paddingBottom: '10%',
                                backgroundColor: 'var(--semi-color-bg-0)',
                                overflowY: 'auto',
                                borderRadius: 0
                            }}
                        >
                            {children}
                        </Card>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}
