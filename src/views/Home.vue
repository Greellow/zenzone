<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAudioStore, type SoundScene } from '@/stores/audio'
import { showToast } from 'vant'

const audioStore = useAudioStore()

// 声音场景数据
const scenes = ref<SoundScene[]>([
  {
    id: 'rain',
    name: '雨夜',
    icon: '🌧️',
    audioUrl: '/audio/rain.mp3',
    bgImage: '/images/rain.jpg',
    description: '淅淅沥沥的雨声，带你进入宁静的雨夜'
  },
  {
    id: 'forest',
    name: '森林',
    icon: '🌲',
    audioUrl: '/audio/forest.mp3',
    bgImage: '/images/forest.jpg',
    description: '鸟鸣虫叫，仿佛置身于大自然的怀抱'
  },
  {
    id: 'fire',
    name: '篝火',
    icon: '🔥',
    audioUrl: '/audio/fire.mp3',
    bgImage: '/images/fire.jpg',
    description: '噼啪作响的火焰，温暖而舒适'
  },
  {
    id: 'ocean',
    name: '海浪',
    icon: '🌊',
    audioUrl: '/audio/ocean.mp3',
    bgImage: '/images/ocean.jpg',
    description: '海浪拍打沙滩，聆听大海的呼吸'
  },
  {
    id: 'cafe',
    name: '咖啡厅',
    icon: '☕',
    audioUrl: '/audio/cafe.mp3',
    bgImage: '/images/cafe.jpg',
    description: '咖啡厅的环境音，营造专注氛围'
  },
  {
    id: 'whitenoise',
    name: '白噪音',
    icon: '🎵',
    audioUrl: '/audio/whitenoise.mp3',
    bgImage: '/images/whitenoise.jpg',
    description: '纯粹的白噪音，屏蔽一切干扰'
  }
])

// 当前背景图
const currentBg = computed(() => {
  return audioStore.currentScene?.bgImage || '/images/default.jpg'
})

// 点击场景
const onSceneClick = (scene: SoundScene) => {
  audioStore.playScene(scene)
  const action = audioStore.isPlaying ? '播放' : '暂停'
  showToast({
    message: `${action} ${scene.name}`,
    duration: 1500
  })
}

// 判断是否正在播放
const isScenePlaying = (sceneId: string) => {
  return audioStore.currentScene?.id === sceneId && audioStore.isPlaying
}
</script>

<template>
  <div class="home-page">
    <!-- 背景图片 -->
    <div class="bg-image" :style="{ backgroundImage: `url(${currentBg})` }">
      <div class="bg-overlay"></div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <div class="header">
        <h1 class="title gradient-text">静谧空间</h1>
        <p class="subtitle">选择一个声景，开始你的专注之旅</p>
      </div>

      <!-- 声景网格 -->
      <div class="scenes-grid">
        <div
          v-for="scene in scenes"
          :key="scene.id"
          class="scene-card"
          :class="{ active: isScenePlaying(scene.id) }"
          @click="onSceneClick(scene)"
        >
          <div class="scene-icon">{{ scene.icon }}</div>
          <div class="scene-name">{{ scene.name }}</div>
          <div v-if="isScenePlaying(scene.id)" class="playing-indicator">
            <van-icon name="music-o" size="24" color="#fff" />
          </div>
        </div>
      </div>

      <!-- 当前播放信息 -->
      <div v-if="audioStore.currentScene" class="now-playing glass-effect">
        <div class="np-info">
          <span class="np-icon">{{ audioStore.currentScene.icon }}</span>
          <div class="np-text">
            <div class="np-name">{{ audioStore.currentScene.name }}</div>
            <div class="np-desc">{{ audioStore.currentScene.description }}</div>
          </div>
        </div>
        <van-button
          round
          size="small"
          :icon="audioStore.isPlaying ? 'pause' : 'play'"
          @click="audioStore.isPlaying ? audioStore.pause() : audioStore.resume()"
        >
          {{ audioStore.isPlaying ? '暂停' : '播放' }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.6s ease;
  z-index: 0;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%);
}

.content {
  position: relative;
  z-index: 1;
  padding: var(--spacing-lg);
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: white;
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.scenes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.scene-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  color: white;
}

.scene-card:active {
  transform: scale(0.95);
}

.scene-card.active {
  background: rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
}

.scene-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
}

.scene-name {
  font-size: 16px;
  font-weight: 500;
}

.playing-indicator {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
}

.now-playing {
  position: fixed;
  bottom: 110px;
  left: var(--spacing-md);
  right: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  color: white;
}

.np-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
  min-width: 0;
}

.np-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.np-text {
  flex: 1;
  min-width: 0;
}

.np-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.np-desc {
  font-size: 12px;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
