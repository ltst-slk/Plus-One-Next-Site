// advantageCards.tsx 或相关文件
import { Card, Col, MarkdownRender } from "@douyinfe/semi-ui";
import type { development } from "@/lib/config"; // 假设这是您的类型定义

export interface AdvantageCardProps {
    developments: development[];
}

/**
 * 渲染开发体验优势卡片列表
 */
export function AdvantageCards({ developments }: AdvantageCardProps) {
    return (
        <>
            {developments.map((item) => (
                <Col span={8} key={item.id}>
                    <Card style={{ height: '200px' }} bordered={false}>
                        <MarkdownRender raw={item.content} />
                    </Card>
                </Col>
            ))}
        </>
    );
}