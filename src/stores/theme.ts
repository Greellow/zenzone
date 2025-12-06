import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ThemeMode = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
    const mode = ref<ThemeMode>('light')

    // 应用主题
    const applyTheme = (theme: ThemeMode) => {
        mode.value = theme
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('zenzone_theme', theme)
    }

    // 切换主题
    const toggleTheme = () => {
        const newTheme = mode.value === 'light' ? 'dark' : 'light'
        applyTheme(newTheme)
    }

    // 初始化主题
    const initTheme = () => {
        const savedTheme = localStorage.getItem('zenzone_theme') as ThemeMode
        if (savedTheme) {
            applyTheme(savedTheme)
        } else {
            // 检测系统主题偏好
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            applyTheme(prefersDark ? 'dark' : 'light')
        }
    }

    return {
        mode,
        applyTheme,
        toggleTheme,
        initTheme
    }
})
