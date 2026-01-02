import type {Metadata} from "next";
import './globals.css'

export const metadata: Metadata = {
  title: "Plus One",
  description: "Plus One UI 是一个基于 React 与 Semi Design 构建的现代化后台管理系统模板。项目源自 semi-design-pro，在保留其优秀架构的基础上，聚焦于企业级后台管理场景，进行了针对性增强。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{margin:0}}>
        {children}
      </body>
    </html>
  );
}

