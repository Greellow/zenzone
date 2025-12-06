<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTimerStore } from '@/stores/timer'
import { useAudioStore } from '@/stores/audio'
import { showToast } from 'vant'

const audioStore = useAudioStore()
const timerStore = useTimerStore()

// 预设时长选项（分钟）
const durationOptions = [
  { label: '15分钟', value: 15 },
  { label: '25分钟', value: 25 },
  { label: '45分钟', value: 45 },
  { label: '60分钟', value: 60 }
]

const selectedDuration = ref(25)

// 判断是否已开始(计时器在运行或有剩余时间且不等于初始值)
const hasStarted = computed(() => {
  return timerStore.isRunning || 
    (timerStore.remainingSeconds > 0 && timerStore.remainingSeconds !== timerStore.totalSeconds)
})

// 显示时间：未开始时显示选中时长，已开始后显示剩余时间
const displayTimeText = computed(() => {
  if (!hasStarted.value && timerStore.remainingSeconds === 0) {
    // 还未开始过，显示选中的时长
    return timerStore.formatTime(selectedDuration.value * 60)
  }
  return timerStore.displayTime
})

// 开始专注
const startFocus = () => {
  if (!audioStore.currentScene) {
    showToast('请先选择一个声景')
    return
  }
  
  timerStore.start(selectedDuration.value)
  timerStore.requestNotificationPermission()
  
  // 确保音频正在播放
  if (!audioStore.isPlaying) {
    audioStore.resume()
  }
  
  showToast(`开始 ${selectedDuration.value} 分钟专注`)
}

// 暂停/继续
const toggleTimer = () => {
  if (timerStore.isRunning) {
    timerStore.pause()
    showToast('已暂停')
  } else {
    timerStore.resume()
    showToast('继续专注')
  }
}

// 重置 - 完全重置到初始状态
const resetTimer = () => {
  timerStore.reset()
  showToast('已重置')
}

// 格式化进度百分比
const progressPercent = computed(() => {
  if (!hasStarted.value && timerStore.remainingSeconds === 0) {
    return 0
  }
  return Math.round(timerStore.progress)
})

// 当前背景图（根据选择的声景）
const currentBg = computed(() => {
  return audioStore.currentScene?.bgImage || '/images/default.jpg'
})

// 圆形进度条的样式
const circleStyle = computed(() => {
  const percent = progressPercent.value
  const radius = 120
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  
  return {
    strokeDasharray: circumference,
    strokeDashoffset: offset
  }
})
</script>

<template>
  <div class="focus-page">
    <!-- 背景图片 -->
    <div class="bg-image" :style="{ backgroundImage: `url(${currentBg})` }">
      <div class="bg-overlay"></div>
    </div>

    <div class="content">
      <div class="header">
        <h1 class="title gradient-text">专注时刻</h1>
        <p class="subtitle">保持专注，享受当下</p>
      </div>

      <!-- 圆形计时器 -->
      <div class="timer-container">
        <svg class="timer-svg" viewBox="0 0 280 280">
          <!-- 背景圆 -->
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="var(--border-color)"
            stroke-width="12"
          />
          <!-- 进度圆 -->
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="url(#gradient)"
            stroke-width="12"
            stroke-linecap="round"
            :style="circleStyle"
            class="progress-circle"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#667eea" />
              <stop offset="100%" stop-color="#764ba2" />
            </linearGradient>
          </defs>
        </svg>
        
        <div class="timer-display">
          <div class="time-text">{{ displayTimeText }}</div>
          <div class="progress-text">{{ progressPercent }}%</div>
        </div>
      </div>

      <!-- 时长选择 -->
      <div class="duration-selector">
        <div class="duration-label">专注时长</div>
        <div class="duration-buttons">
          <van-button
            v-for="option in durationOptions"
            :key="option.value"
            :type="selectedDuration === option.value ? 'primary' : 'default'"
            size="small"
            round
            @click="selectedDuration = option.value"
            :disabled="hasStarted"
          >
            {{ option.label }}
          </van-button>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="controls">
        <van-button
          v-if="!hasStarted"
          type="primary"
          size="large"
          round
          block
          @click="startFocus"
          class="control-btn"
        >
          <van-icon name="play-circle" size="20" />
          开始专注
        </van-button>

        <template v-else>
          <van-button
            :type="timerStore.isRunning ? 'warning' : 'success'"
            size="large"
            round
            @click="toggleTimer"
            class="control-btn"
          >
            <van-icon :name="timerStore.isRunning ? 'pause-circle' : 'play-circle'" size="20" />
            {{ timerStore.isRunning ? '暂停' : (timerStore.remainingSeconds === timerStore.totalSeconds ? '开始' : '继续') }}
          </van-button>
          
          <van-button
            type="default"
            size="large"
            round
            @click="resetTimer"
            class="control-btn"
          >
            <van-icon name="replay" size="20" />
            重置
          </van-button>
        </template>
      </div>

      <!-- 当前声景提示 -->
      <div v-if="audioStore.currentScene" class="current-scene">
        <div class="scene-info">
          <span class="scene-icon">{{ audioStore.currentScene.icon }}</span>
          <span class="scene-name">{{ audioStore.currentScene.name }}</span>
        </div>
        <van-switch
          :model-value="audioStore.isPlaying"
          @update:model-value="audioStore.isPlaying ? audioStore.pause() : audioStore.resume()"
          size="20"
          active-color="#667eea"
        />
      </div>
      <div v-else class="no-scene">
        <van-icon name="info-o" />
        <span>请先在首页选择一个声景</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.focus-page {
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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%);
}

.content {
  position: relative;
  z-index: 1;
  max-width: 500px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: white;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.timer-container {
  position: relative;
  width: 280px;
  height: 280px;
  margin: var(--spacing-xl) auto;
}

.timer-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-circle {
  transition: stroke-dashoffset 0.3s ease;
}

.timer-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.time-text {
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin-bottom: var(--spacing-sm);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.progress-text {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.duration-selector {
  margin-bottom: var(--spacing-xl);
}

.duration-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--spacing-md);
  text-align: center;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.duration-buttons {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
}

.controls {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center; /* Center the icon and text */
  gap: var(--spacing-sm);
  font-weight: 600;
}

.current-scene,
.no-scene {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  margin-top: auto; /* Push to bottom if container allows, though structure is static here */
}

@media (prefers-color-scheme: dark) {
  .current-scene,
  .no-scene {
    background: rgba(30, 30, 30, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

.scene-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.scene-icon {
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.scene-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.no-scene {
  justify-content: center;
  gap: 10px;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
  min-height: 76px; /* Match height of active scene player */
}
</style>
