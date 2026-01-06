'use client';

import React from 'react';
import {useTranslations} from 'next-intl';
import {Banner, Button, Card, Col, Divider, Layout, MarkdownRender, Row, Space, Typography} from '@douyinfe/semi-ui';
import Navigation, {useIsMounted} from './Navigation';
import {useRouter} from 'next/navigation'
import {useTheme} from "@/components/ThemeProvider";
import {AdvantageCards} from "@/lib/configCard";
import {developmentAdvantages} from "@/lib/config";


/**
 * 首页客户端 封装页面
 * @constructor
 */
export default function HomePageClient() {
    const {theme} = useTheme();
    const t = useTranslations('HomePage');
    const isMounted = useIsMounted();
    const router = useRouter();
    // 在服务端或挂载前，渲染一个简单的占位符，避免 Class Component 报错
    if (!isMounted) {
        return <div style={{minHeight: '100vh'}}>Loading...</div>;
    }

    const {Header, Footer, Content} = Layout;
    const {Text, Title} = Typography;
    const src = theme === 'dark' ? '/screenshot_dark.jpg' : '/screenshot_light.jpg';

    return (
        <Layout style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Card
                bordered={false}
                headerLine={false}
                bodyStyle={{padding: 0}}
                style={{padding: 0, borderRadius: 0, minHeight: '20px'}}
            >
                <Banner type="success" description={<Text>{t('banner')}</Text>} style={{padding: '5px'}}
                        closeIcon={null}/>
            </Card>
            <Header style={{
                backgroundColor: 'var(--semi-color-bg-1)',
                paddingLeft: 'calc(4.16667% + 24px)',
                paddingRight: '24px'
            }}>
                <Navigation/>
            </Header>
            <Content>
                <Card
                    bordered={false}
                    headerLine={false}
                    style={{padding: '24px', flex: 1, overflow: 'auto', borderRadius: 0, height: '100%'}}
                >
                    <Row gutter={24} type="flex" justify="space-around" align="middle">
                        <Col span={6} offset={1}>
                            <Space vertical align="start">
                                <Text style={{
                                    margin: '8px 0',
                                    fontSize: '48px',
                                    fontWeight: 600,
                                    lineHeight: '67px'
                                }}>{t('title')}</Text>
                                <Text style={{
                                    margin: '8px 0',
                                    fontSize: '35px',
                                    fontWeight: 600,
                                    lineHeight: '57px'
                                }}>{t('subtitle')}</Text>
                                <Text style={{
                                    margin: '8px 0',
                                    fontSize: '25px',
                                    lineHeight: '42px'
                                }}>{t('descLine1')}</Text>
                                <Text style={{
                                    margin: '8px 0',
                                    fontSize: '18px',
                                    lineHeight: '32px'
                                }}>{t('descLine2')}</Text>
                            </Space>
                            <Space align="center" style={{marginTop: '20px'}}>
                                <Button style={{borderRadius: '20px'}} theme='solid' type='primary' size='large'
                                        onClick={() => router.push('/docs/getting-started')}>{t('btnStart')}</Button>
                                <Button style={{borderRadius: '20px'}} theme='solid' type='primary' size='large'
                                        onClick={() => window.open('http://base.plus-one.cn/', '_blank')}>{t('btnPre')}</Button>
                            </Space>
                        </Col>
                        <Col span={16} offset={1}>
                            <div>
                                <img
                                    src={src}
                                    alt="preview"
                                    style={{
                                        width: '100%',
                                        borderRadius: '10px',
                                        border: theme === 'dark' ? '2px dashed #fff' : '2px dashed #000' // 虚线边框样式，颜色为黑色，宽度为2px
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Divider margin='24px' style={{paddingTop: '52px'}}/>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{margin: '8px 0', fontSize: '33px', lineHeight: '42px'}}>Semi.Design</Text>
                        </Col>
                        <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{margin: '8px 0', fontSize: '33px', lineHeight: '42px'}}>Spring Boot</Text>
                        </Col>
                        <Col span={8} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{margin: '8px 0', fontSize: '33px', lineHeight: '42px'}}>React</Text>
                        </Col>
                    </Row>
                    <Divider margin='24px'/>
                    <div style={{paddingLeft: '15%', paddingRight: '15%'}}>
                        <div style={{padding: '5%'}}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={24}
                                     style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{
                                        margin: '8px 0',
                                        fontSize: '48px',
                                        fontWeight: 600,
                                        lineHeight: '67px'
                                    }}>Plus One 适合谁</Text>
                                </Col>
                            </Row>
                            <div style={{paddingTop: '52px'}}>
                                <Row gutter={24} type="flex" justify="space-around" align="middle">
                                    <Col span={12}>
                                        <Card style={{height: 'auto'}} bordered={false}>
                                            <MarkdownRender raw={`## 企业人员优势

#### **开箱即用的企业级功能**
   - 提供完整的用户认证、权限管理、组织架构管理等企业级功能模块
   - 通过 OneTable 等组件简化了企业级数据展示和交互，减少重复开发工作
   - 菜单后端配置实现动态加载，适应企业业务变化需求

#### **工程化实践先进**
   - 采用 TypeScript 保证类型安全，提高代码质量
   - 集成国际化的 i18n 支持，适应多语言企业环境
   - 提供 Mock 数据方案，实现前后端分离开发，提高团队协作效率

#### **定制化与扩展性强**
   - Semi Design 组件库支持主题定制，可匹配企业品牌风格
   - OneSelect 基于系统配置表动态渲染下拉选项，灵活适应业务变化
   - 项目结构清晰，便于团队协作和长期维护`}/>
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        <Card style={{height: 'auto'}} bordered={false}>
                                            <MarkdownRender raw={`## 学生党优势

#### **高价值学习资源**
   - 作为完整的现代企业级后台管理系统，展示了从基础架构到高级功能的实现
   - 包含 React、TypeScript、Semi Design、Spring Boot 等主流技术栈
   - 项目文档详细，提供清晰的开发流程和最佳实践

#### **实战项目经验**
   - 可直接用于课程设计、毕业设计，丰富个人作品集
   - 项目结构清晰，适合学习和模仿，理解大型项目的组织方式
   - 提供了从开发到部署的完整流程，帮助学生了解企业级项目生命周期

#### **学习曲线友好**
   - 使用的 React 和 Semi Design 是目前主流且文档丰富的技术
   - 项目有明确的快速开始指南，学生可快速上手
   - 提供了 前后全分离全栈方案`}/>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                            <Divider margin='24px'/>
                            <div style={{padding: '5%'}}>
                                <Row type="flex" justify="space-around" align="middle">
                                    <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ margin: '8px 0', fontSize: '48px',fontWeight: 600, lineHeight: '67px'}}>先进的开发体验</Text>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    {AdvantageCards({developments:developmentAdvantages.slice(0,3)})} {/* 第一行3个 */}
                                </Row>
                                <Row gutter={[16, 16]}>
                                    {AdvantageCards({developments:developmentAdvantages.slice(3,6)})} {/* 第一行3个 */}
                                </Row>
                                <Row gutter={[16, 16]}>
                                    {AdvantageCards({developments:developmentAdvantages.slice(6,9)})} {/* 第一行3个 */}
                                </Row>
                            </div>
                            <Divider margin='24px'/>
                            {/*<div style={{padding: '5%'}}>*/}
                            {/*    <Row gutter={[16, 16]}>*/}
                            {/*        <Col span={12} >*/}
                            {/*            <Card title='Card Title' style={{height:'300px'}}>*/}
                            {/*                完全开源*/}
                            {/*            </Card>*/}
                            {/*        </Col>*/}
                            {/*        <Col span={12}>*/}
                            {/*            <Card title='Card Title' style={{height:'300px'}}>*/}
                            {/*                构建现代化*/}
                            {/*            </Card>*/}
                            {/*        </Col>*/}
                            {/*    </Row>*/}
                            {/*</div>*/}
                    </div>
                </Card>
            </Content>
            <Footer>
                <Card
                    bordered={false}
                    headerLine={false}
                    bodyStyle={{padding: '10px'}}
                    style={{borderRadius: 0, textAlign: 'center'}}
                >
                    Copyright ©2026 Plus One. All Rights Reserved.
                </Card>
            </Footer>
        </Layout>
    );
}
