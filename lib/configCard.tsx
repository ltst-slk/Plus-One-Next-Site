// advantageCards.tsx 或相关文件
import {Card, Col, Row, Typography} from "@douyinfe/semi-ui";
import type { development } from "@/lib/config";
import React from "react";

export interface AdvantageCardProps {
    developments: development[];
}

/**
 * 渲染开发体验优势卡片列表
 */
export function AdvantageCards({ developments }: AdvantageCardProps) {
    const {Text, Title} = Typography;

    return (
        <>
            {developments.map((item) => (
                <Col span={8} key={item.id}>
                    <Card style={{ height: '200px' }} bordered={false}>
                        <Row>
                            <Title heading={4} style={{lineHeight:'50px'}}>{item.title}</Title>
                        </Row>
                        <Row>
                            <Text>{item.content}</Text>
                        </Row>
                    </Card>
                </Col>
            ))}
        </>
    );
}