import { NextConfig } from 'next';
import createMDX from '@next/mdx';

// 1. 初始化 MDX 插件
const withMDX = createMDX({
  // 这里可以保持你之前的 remark/rehype 插件配置
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // 必须保留，否则 MDX 无法作为路由
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // 显式禁用引起 WASM 报错的实验性插件功能
  experimental: {
    // 确保这里没有任何 next-intl 相关的编译器插件
  }
};

// 2. 只导出 MDX 包装后的配置，不再包装 next-intl
export default withMDX(nextConfig);
