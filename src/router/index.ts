import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        title?: string
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '声景选择' }
    },
    {
        path: '/focus',
        name: 'focus',
        component: () => import('@/views/Focus.vue'),
        meta: { title: '专注' }
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/Settings.vue'),
        meta: { title: '设置' }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, _from, next) => {
    document.title = `${to.meta.title || 'ZenZone'} - 静谧空间`
    next()
})

export default router
