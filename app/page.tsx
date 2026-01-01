'use client' // 👈 添加这一行！

import React from 'react';
import {Banner, Button, Col, Layout, Nav, Row, Space, Typography} from '@douyinfe/semi-ui';
import {
    IconArticle,
    IconGithubLogo,
    IconHelpCircle,
    IconHome,
    IconLanguage,
    IconMoon,
    IconSemiLogo,
    IconSun
} from '@douyinfe/semi-icons';


export default function HomePage() {
    const {Header, Footer, Content} = Layout;
    const {Title,Text} = Typography;
    const banner = (
        <Banner type="success" style={{padding:'5px'}} closeIcon={null} description="Plus One UI 1.0 已全新发布 > "/>
    );
    return (
        <Layout style={{
            border: '1px solid var(--semi-color-border)',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {banner}
            <Header style={{
                backgroundColor: 'var(--semi-color-bg-1)',
                flexShrink: 0, // 防止被压缩
            }}>
                <div>
                    <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
                        <Nav.Header>
                            <IconSemiLogo style={{fontSize: 36}}/>
                        </Nav.Header>
                        <Nav.Item itemKey="Home" text="主页" icon={<IconHome size="large"/>}/>
                        <Nav.Item itemKey="Docs" text="文档" icon={<IconArticle size="large"/>}/>
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
                            />
                        </Nav.Footer>
                    </Nav>
                </div>
            </Header>
            <Content
                style={{
                    padding: '24px',
                    backgroundColor: 'var(--semi-color-bg-0)',
                    position: 'relative',
                    overflow: 'auto',
                    flex: 1, // 👈 让它自动占满剩余空间
                }}
            >
                <div>
                    <div
                        style={{
                            position: 'absolute',
                            width: '840px',
                            height: '840px',
                            // left: '-50px',   // 不用了
                            // top: '-20px',    // 不用了
                            right: '100px',        // 从右边出去 100px
                            top: '50%',             // 上边放到中间
                            transform: 'translateY(-50%)', // 向上提自身一半高度 → 垂直居中
                            filter: 'blur(120px)',
                            opacity: 0.6,
                            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent 70%)',
                        }}
                    />
                    <Row gutter={24} type="flex" justify="space-around" align="middle">
                        <Col span={6} offset={1}>
                            <Space vertical align="start">
                                <Text style={{margin: '8px 0',fontSize:'48px',fontWeight:600,lineHeight:'67px'}}>连接设计师与开发者</Text>
                                <Text style={{margin: '8px 0',fontSize:'18px',lineHeight:'32px'}}>连接设计师与开发者</Text>
                                <Text style={{margin: '8px 0',fontSize:'18px',lineHeight:'32px'}}>由抖音前端与 UED
                                    团队维护，易于定制的现代化设计系统，帮助设计师与开发者打造高质量产品。</Text>
                            </Space>
                            <Space align="center">
                                <Button theme='solid' type='primary' size={'large'} style={{height:'48px',padding:'12px 24px',borderRadius:'6px',fontSize:'16px',lineHeight:'22px'}}> 快速开始 </Button>
                                <Button type="tertiary" size={'large'} style={{height:'48px',padding:'12px 24px',borderRadius:'6px',fontSize:'16px',lineHeight:'22px'}}> GibHub </Button>
                            </Space>
                        </Col>
                        <Col span={16} offset={1}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/screenshot.png"
                                alt="Semi Design 示例截图"
                                style={{
                                    width: '100%', // 增加宽度以补偿左右各裁剪的5px
                                    height: '100%', // 增加高度以补偿底部裁剪的5px
                                    marginLeft: '-5px', // 左移5px以裁剪左边
                                    marginTop: '-5px', // 上移5px以裁剪顶部
                                    objectFit: 'cover', // 按比例缩放并覆盖整个容器
                                    borderRadius: '10px', // 圆角半径
                                    transform: 'translate(5px, 5px)', // 调整位置以实现裁剪效果
                                    display: 'block', // 确保没有额外的下方间距
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer
                style={{
                    flexShrink: 0, // 👈 加上这行！防止被压缩
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px',
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
                    {/*<IconBytedanceLogo size="large" style={{marginRight: '8px'}}/>*/}
                    <span>Copyright ©2025 Plus One. All Rights Reserved. </span>
                </span>
                {/*<span>*/}
                {/*    <span style={{marginRight: '24px'}}>平台客服</span>*/}
                {/*    <span>反馈建议</span>*/}
                {/*</span>*/}
            </Footer>
        </Layout>
    );
}