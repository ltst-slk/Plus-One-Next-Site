'use client'

import '@douyinfe/semi-ui/dist/css/semi.min.css'
import { getDocsList } from '@/lib/docs';

import {usePathname, useRouter} from 'next/navigation'
import { Layout, Nav, Button, Breadcrumb, Skeleton, Avatar } from '@douyinfe/semi-ui';
import {
    IconBell, IconHelpCircle, IconBytedanceLogo, IconHome, IconHistogram, IconLive, IconSetting, IconSemiLogo,
    IconFile
} from '@douyinfe/semi-icons';

interface DocItem {
    slug: string;
    title: string;
}
export default function DocsLayoutClient({
                                             children,
                                             docs
                                         }: {
    children: React.ReactNode,
    docs: DocItem[]
}) {
    const pathname = usePathname();
    const router = useRouter();

    // 将 docs 转换为 Semi UI Nav 的格式
    const navItems = docs.map(doc => ({
        itemKey: `/docs/${doc.slug}`, // 使用路由路径作为 key
        text: doc.title,
        icon: <IconFile />
    }));
    const { Header, Footer, Sider, Content } = Layout;
    return (
        <div style={{width:'100vw',height:'100vh'}}>
            <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
                <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                    <Nav
                        style={{height:'100vh'}}
                        selectedKeys={[pathname]}
                        items={navItems}
                        onSelect={(data) => {
                            router.push(data.itemKey as string);
                        }}
                        header={{
                            logo: <IconSemiLogo style={{ fontSize: 36 }} />,
                            text: 'Semi Design',
                        }}
                        footer={{
                            collapseButton: true,
                        }}
                    />
                </Sider>
                <Layout>
                    <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                        <Nav
                            mode="horizontal"
                            footer={
                                <>
                                    <Button
                                        theme="borderless"
                                        icon={<IconBell size="large" />}
                                        style={{
                                            color: 'var(--semi-color-text-2)',
                                            marginRight: '12px',
                                        }}
                                    />
                                    <Button
                                        theme="borderless"
                                        icon={<IconHelpCircle size="large" />}
                                        style={{
                                            color: 'var(--semi-color-text-2)',
                                            marginRight: '12px',
                                        }}
                                    />
                                    <Avatar color="orange" size="small">
                                        YJ
                                    </Avatar>
                                </>
                            }
                        ></Nav>
                    </Header>
                    <Content
                        style={{
                            width: '100vw',
                            padding: '24px',
                            backgroundColor: 'var(--semi-color-bg-0)',
                        }}
                    >
                        {children}
                    </Content>
                    <Footer
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '20px',
                            color: 'var(--semi-color-text-2)',
                            backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                        }}
                    >
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <IconBytedanceLogo size="large" style={{ marginRight: '8px' }} />
                        <span>Copyright © 2019 ByteDance. All Rights Reserved. </span>
                    </span>
                        <span>
                        <span style={{ marginRight: '24px' }}>平台客服</span>
                        <span>反馈建议</span>
                    </span>
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
}