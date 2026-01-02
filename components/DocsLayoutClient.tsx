'use client'

import '@douyinfe/semi-ui/dist/css/semi.min.css'
import {usePathname, useRouter} from 'next/navigation'
import {Avatar, Button, Layout, Nav} from '@douyinfe/semi-ui';
import {IconBell, IconBytedanceLogo, IconFile, IconHelpCircle, IconSemiLogo} from '@douyinfe/semi-icons';
import {DocItem} from "@/lib/docs";
import {useState} from 'react';

export default function DocsLayoutClient({
                                             children,
                                             docs
                                         }: {
    children: React.ReactNode,
    docs: DocItem[]
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    const siderWidth = collapsed ? 60 : 240;

    const navItems = docs.map(doc => ({
        itemKey: `/docs/${doc.slug}`,
        text: doc.title,
        icon: <IconFile/>
    }));

    const {Header, Footer, Sider, Content} = Layout;

    return (
        <div style={{width: '100vw', height: '100vh', overflow: 'hidden'}}>
            {/* 固定 Sider，宽度随 collapsed 变化 */}
            <Sider
                style={{
                    backgroundColor: 'var(--semi-color-bg-1)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: siderWidth,
                    zIndex: 10,
                    transition: 'width 0.2s ease', // 可选：加个过渡更流畅
                }}
            >
                <Nav
                    style={{height: '100%'}}
                    selectedKeys={[pathname]}
                    items={navItems}
                    onSelect={(data) => router.push(data.itemKey as string)}
                    header={{
                        logo: <IconSemiLogo style={{fontSize: 36}}/>,
                        text: 'Plus One',
                        link: '/'
                    }}
                    footer={{
                        collapseButton: true,
                    }}
                    onCollapseChange={setCollapsed} // 👈 关键！同步状态
                />
            </Sider>

            {/* 主内容区：动态 marginLeft */}
            <Layout
                style={{
                    border: '1px solid var(--semi-color-border)',
                    marginLeft: siderWidth,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'margin-left 0.2s ease', // 可选
                }}
            >
                <Header style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
                    <Nav
                        mode="horizontal"
                        footer={
                            <>
                                <Button
                                    theme="borderless"
                                    icon={<IconBell size="large"/>}
                                    style={{color: 'var(--semi-color-text-2)', marginRight: '12px'}}
                                />
                                <Button
                                    theme="borderless"
                                    icon={<IconHelpCircle size="large"/>}
                                    style={{color: 'var(--semi-color-text-2)', marginRight: '12px'}}
                                />
                                <Avatar color="orange" size="small">
                                    YJ
                                </Avatar>
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
                        padding: '20px',
                        color: 'var(--semi-color-text-2)',
                        backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                    }}
                >
          <span style={{display: 'flex', alignItems: 'center'}}>
            <IconBytedanceLogo size="large" style={{marginRight: '8px'}}/>
            <span>Copyright © 2019 ByteDance. All Rights Reserved.</span>
          </span>
                    <span>
            <span style={{marginRight: '24px'}}>平台客服</span>
            <span>反馈建议</span>
          </span>
                </Footer>
            </Layout>
        </div>
    );
}