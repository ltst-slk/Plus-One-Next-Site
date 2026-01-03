'use client';

import {useTheme} from '@/components/ThemeProvider';
import Link from 'next/link';
import {type ImgHTMLAttributes} from 'react'; // 👈 只用 img 的属性

export interface LogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
    width?: number;
    height?: number;
    href?: string; // 自定义跳转链接
}

export default function Logo({
                                 width = 65,
                                 height = 32,
                                 href = '/',
                                 style,
                                 className,
                                 ...props // 剩下的都是 img 的合法属性
                             }: LogoProps) {
    const { theme } = useTheme();
    const src = theme === 'dark' ? '/logo_w.svg' : '/logo_b.svg';

    return (
        <Link href={href} passHref>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt="My Brand"
                width={width}
                height={height}
                style={{
                    display: 'block',
                    cursor: 'pointer', // 👈 关键：显示小手
                    ...style
                }}
                className={className}
                {...props}
            />
        </Link>
    );
}