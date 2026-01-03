'use client';

import {createContext, useContext, useEffect, useState} from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
}>({
    theme: 'light',
    setTheme: () => {},
});

// 安全获取初始主题（SSR 返回 light）
function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'light';
    return document.body.hasAttribute('theme-mode') ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    // 同步主题到 body
    useEffect(() => {
        if (theme === 'dark') {
            document.body.setAttribute('theme-mode', 'dark');
            document.documentElement.style.colorScheme = 'dark'; // 可选：影响浏览器 UI
        } else {
            document.body.removeAttribute('theme-mode');
            document.documentElement.style.colorScheme = 'light';
        }
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('semi-theme', newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);