<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})

// 当前激活的tab
const activeTab = computed(() => {
  return route.name as string || 'home'
})

// 导航项配置
const navItems = [
  { name: 'home', icon: '🎵', label: '声景' },
  { name: 'focus', icon: '⏱️', label: '专注' },
  { name: 'settings', icon: '⚙️', label: '设置' }
]

const goTo = (name: string) => {
  router.push({ name })
}
</script>

<template>
  <div id="app">
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    
    <!-- 自定义底部导航栏 -->
    <nav class="bottom-nav">
      <div 
        v-for="item in navItems" 
        :key="item.name"
        class="nav-item"
        :class="{ active: activeTab === item.name }"
        @click="goTo(item.name)"
      >
        <div class="nav-icon">{{ item.icon }}</div>
        <div class="nav-label">{{ item.label }}</div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 90px; /* Increased padding to account for floating tabbar */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<!-- 自定义底部导航栏样式 -->
<style scoped>
/* 底部导航栏 */
.bottom-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 460px;
  height: 68px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 8px;
  z-index: 1000;
}

/* 导航项 */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 56px;
  border-radius: 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

/* 导航图标 */
.nav-icon {
  font-size: 22px;
  line-height: 1;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

/* 导航文字 */
.nav-label {
  font-size: 11px;
  font-weight: 500;
  color: #999;
  transition: all 0.3s ease;
}

/* ============ 未激活状态 ============ */
.nav-item:not(.active) .nav-icon {
  filter: grayscale(100%);
  opacity: 0.5;
}

.nav-item:not(.active) .nav-label {
  opacity: 0.6;
}

/* 未激活项hover效果 */
.nav-item:not(.active):hover {
  background: rgba(102, 126, 234, 0.05);
}

.nav-item:not(.active):hover .nav-icon {
  filter: grayscale(50%);
  opacity: 0.7;
  transform: scale(1.05);
}

/* ============ 激活状态 ============ */
.nav-item.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.25);
}

.nav-item.active .nav-icon {
  font-size: 26px;
  filter: none;
  opacity: 1;
  transform: scale(1.15);
  animation: iconBounce 0.4s ease;
}

.nav-item.active .nav-label {
  font-weight: 700;
  color: #667eea;
  font-size: 12px;
  opacity: 1;
}

/* 动画 */
@keyframes iconBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.25); }
  100% { transform: scale(1.15); }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .bottom-nav {
    background: rgba(30, 30, 30, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .nav-item.active {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
  }
  
  .nav-label {
    color: #666;
  }
  
  .nav-item.active .nav-label {
    color: #667eea;
  }
}
</style>
