// mdx-components.tsx （项目根目录或 src/ 下）
'use client'

import type { MDXComponents } from 'mdx/types'
import { Button, Tag, Card, Typography } from '@douyinfe/semi-ui'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        Button,
        Tag,
        Card,
        code: (props) => <Typography.Text code {...props} />,
    }
}