'use client'

import React from 'react';
import { Typography, Button, Card, Tag, CodeHighlight } from '@douyinfe/semi-ui';

const { Title, Text, Paragraph } = Typography;

// 1. 基础标签属性类型
type HTMLProps = React.HTMLAttributes<HTMLElement>;
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const MdxButton = Button;
export const MdxCard = Card;
export const MdxTag = Tag;

// 2. 标题映射 (使用 HTMLAttributes)
export const MdxH1 = (props: HTMLProps) => <Title heading={1} style={{ margin: '16px 0 8px' }} {...props} />;
export const MdxH2 = (props: HTMLProps) => <Title heading={2} style={{ margin: '14px 0 8px' }} {...props} />;
export const MdxH3 = (props: HTMLProps) => <Title heading={3} style={{ margin: '12px 0 8px' }} {...props} />;
export const MdxH4 = (props: HTMLProps) => <Title heading={4} style={{ margin: '12px 0 8px' }} {...props} />;

// 3. 段落与链接
export const MdxP = (props: HTMLProps) => <Paragraph style={{ lineHeight: '1.6', marginBottom: '1em' }} {...props} />;

/**
 * 修复 TS2769 类型冲突
 * 显式解构出 href, children，剩下的原生属性不直接传给 Text
 */
export const MdxA = ({
                         href,
                         children,
                         // 显式解构出容易冲突的属性，防止它们进入 ...rest
                         type,
                         target,
                         ...rest
                     }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return (
        <Text
            link={{
                href,
                // 如果需要支持在新窗口打开，可以手动传递
                target: target as React.HTMLAttributeAnchorTarget
            }}
            // 只传递 className 和 style 等安全属性
            className={rest.className}
            style={rest.style}
        >
            {children}
        </Text>
    );
};


// 4. 代码高亮 (关键点：处理 className)
export const MdxCode = ({ children, className, ...props }: HTMLProps) => {
    const isCodeBlock = className && className.startsWith('language-');

    if (isCodeBlock) {
        const language = className.replace('language-', '');
        console.log('language', language);
        return (
            <div style={{ margin: '16px 0', border: '1px solid var(--semi-color-border)', borderRadius: '6px', overflow: 'hidden' }}>
                <CodeHighlight
                    lineNumber={false}
                    language={language}
                    code={String(children).trim()}
                    showLineNumbers
                />
            </div>
        );
    }

    // 行内代码
    return <Text code {...props}>{children}</Text>;
};
