'use client';

import React from 'react';
import {useTranslations} from 'next-intl';
import {Banner, Button, Card, CardGroup, Col, Divider, Layout, Row, Space, Typography} from '@douyinfe/semi-ui';
import Navigation, {useIsMounted} from './Navigation';
import {usePathname, useRouter} from 'next/navigation'


/**
 * 首页客户端 封装页面
 * @constructor
 */
export default function HomePageClient() {
    const t = useTranslations('HomePage');
    const isMounted = useIsMounted();
    const router = useRouter();
    // 在服务端或挂载前，渲染一个简单的占位符，避免 Class Component 报错
    if (!isMounted) {
        return <div style={{minHeight: '100vh'}}>Loading...</div>;
    }

    const {Header, Footer, Content} = Layout;
    const {Text , Title} = Typography;

    return (
        <Layout style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Card
                bordered={false}
                headerLine={false}
                bodyStyle={{padding: 0}}
                style={{padding: 0, borderRadius: 0,minHeight: '20px'}}
            >
                <Banner type="success" description={<Text>{t('banner')}</Text>} style={{padding: '5px'}}
                        closeIcon={null}/>
            </Card>
            <Header style={{backgroundColor: 'var(--semi-color-bg-1)',paddingLeft:'calc(4.16667% + 24px)',paddingRight:'24px'}}>
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
                                    fontSize: '48px',
                                    fontWeight: 600,
                                    lineHeight: '67px'
                                }}>{t('subtitle')}</Text>
                                <Text style={{
                                    margin: '8px 0',
                                    fontSize: '33px',
                                    lineHeight: '42px'
                                }}>{t('descLine1')}</Text>
                                <Text style={{
                                    margin: '8px 0',
                                    fontSize: '18px',
                                    lineHeight: '32px'
                                }}>{t('descLine2')}</Text>
                            </Space>
                            <Space align="center" style={{marginTop: '20px'}}>
                                <Button style={{borderRadius: '20px'}} theme='solid' type='primary' size='large' onClick={() => router.push('/docs/getting-started')}>{t('btnStart')}</Button>
                                <Button style={{borderRadius: '20px'}} theme='solid' type='primary' size='large' onClick={()=>window.open('http://base.plus-one.cn/', '_blank')}>{t('btnPre')}</Button>
                            </Space>
                        </Col>
                        <Col span={16} offset={1}>
                            <img src="/screenshot.png" alt="preview" style={{width: '100%', borderRadius: '10px'}}/>
                        </Col>
                    </Row>
                    <Divider margin='24px' style={{paddingTop: '52px'}}/>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ margin: '8px 0', fontSize: '33px', lineHeight: '42px'}}>Semi.Design</Text>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ margin: '8px 0', fontSize: '33px', lineHeight: '42px'}}>Spring Boot</Text>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ margin: '8px 0', fontSize: '33px', lineHeight: '42px'}}>React</Text>
                        </Col>
                    </Row>
                    <Divider margin='24px'/>
                    <div style={{paddingLeft: '25%' ,paddingRight: '25%'}}>
                        <div style={{padding: '5%'}}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ margin: '8px 0', fontSize: '48px',fontWeight: 600, lineHeight: '67px'}}>Plus One 适合谁</Text>
                                </Col>
                            </Row>
                            <div style={{paddingTop: '52px'}}>
                                <Card style={{height:'300px'}}>
                                    企业人员
                                </Card>
                            </div>
                            <div style={{paddingTop: '52px'}}>
                                <Card style={{height:'300px'}}>
                                    在校学生
                                </Card>
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
                                <Col span={8} >
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        Card Content
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        Card Content
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        Card Content
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        Card Content
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        Card Content
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        Card Content
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        Card Content
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        Card Content
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        Card Content
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <Divider margin='24px'/>
                        <div style={{padding: '5%'}}>
                            <Row gutter={[16, 16]}>
                                <Col span={12} >
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        完全开源
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card title='Card Title' style={{height:'300px'}}>
                                        构建现代化
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>
            </Content>
            <Footer>
                <Card
                    bordered={false}
                    headerLine={false}
                    bodyStyle={{padding: '10px'}}
                    style={{ borderRadius: 0, textAlign: 'center'}}
                >
                    Copyright ©2026 Plus One. All Rights Reserved.
                </Card>
            </Footer>
        </Layout>
    );
}
