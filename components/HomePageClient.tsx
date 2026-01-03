'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
// 导入 Semi UI 组件
import { Banner, Button, Col, Layout, Row, Space, Typography } from '@douyinfe/semi-ui';
import Navigation, {useIsMounted} from './Navigation';


export default function HomePageClient() {
    const t = useTranslations('HomePage');
    const isMounted = useIsMounted();

    // 在服务端或挂载前，渲染一个简单的占位符，避免 Class Component 报错
    if (!isMounted) {
        return <div style={{ minHeight: '100vh' }}>Loading...</div>;
    }

    const { Header, Footer, Content } = Layout;
    const { Text } = Typography;

    return (
        <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Banner type="success" description={t('banner')} style={{ padding: '5px' }} closeIcon={null} />
            <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                <Navigation />
            </Header>
            <Content style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
                <Row gutter={24} type="flex" justify="space-around" align="middle">
                    <Col span={6} offset={1}>
                        <Space vertical align="start">
                            <Text style={{margin: '8px 0',fontSize:'48px',fontWeight:600,lineHeight:'67px'}}>{t('title')}</Text>
                            <Text style={{margin: '8px 0',fontSize:'18px',lineHeight:'32px'}}>{t('subtitle')}</Text>
                            <Text style={{margin: '8px 0',fontSize:'18px',lineHeight:'32px'}}>{t('description')}</Text>
                        </Space>
                        <Space align="center" style={{ marginTop: '20px' }}>
                            <Button theme='solid' type='primary' size='large'>{t('btnStart')}</Button>
                        </Space>
                    </Col>
                    <Col span={16} offset={1}>
                        <img src="/screenshot.png" alt="preview" style={{ width: '100%', borderRadius: '10px' }} />
                    </Col>
                </Row>
            </Content>
            <Footer style={{ padding: '10px', textAlign: 'center' }}>
                Copyright ©2026 Plus One. All Rights Reserved.
            </Footer>
        </Layout>
    );
}
