<script setup lang="ts">
import { ref } from 'vue'
import { useAudioStore } from '@/stores/audio'
import { useThemeStore } from '@/stores/theme'
import { showToast } from 'vant'

const audioStore = useAudioStore()
const themeStore = useThemeStore()

// 折叠面板激活的名称
const activeNames = ref<string[]>([])

// 团队成员信息
const teamMembers = ref([
  { name: '加哿瑞', role: '项目负责人' },
  { name: '李博睿', role: '前端开发' },
  { name: '沙援晨', role: 'UI设计' }
])

const appVersion = '1.0.0'

// 音量变化
const onVolumeChange = (value: number) => {
  audioStore.volume = value / 100
}

// 主题切换
const onThemeChange = (checked: boolean) => {
  themeStore.toggleTheme()
  showToast({
    message: checked ? '已切换到深色模式' : '已切换到日间模式',
    duration: 1500
  })
}
</script>

<template>
  <div class="settings-page">
    <div class="content">
      <div class="header">
        <h1 class="title gradient-text">设置</h1>
        <p class="subtitle">个性化你的专注体验</p>
      </div>

      <!-- 音量控制 -->
      <div class="section">
        <div class="section-title">
          <van-icon name="volume-o" />
          音量调节
        </div>
        <div class="volume-control">
          <van-icon name="volume-o" size="20" color="#999" />
          <van-slider
            :model-value="audioStore.volume * 100"
            @update:model-value="onVolumeChange"
            active-color="#667eea"
            class="volume-slider"
          />
          <van-icon name="volume" size="20" color="#667eea" />
        </div>
        <div class="volume-value">{{ Math.round(audioStore.volume * 100) }}%</div>
      </div>

      <!-- 主题切换 -->
      <div class="section">
        <div class="section-title">
          <van-icon name="star-o" />
          外观设置
        </div>
        <van-cell-group inset>
          <van-cell title="深色模式" center>
            <template #right-icon>
              <van-switch
                :model-value="themeStore.mode === 'dark'"
                @update:model-value="onThemeChange"
                size="24"
                active-color="#667eea"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <!-- 使用说明 -->
      <div class="section">
        <div class="section-title">
          <van-icon name="question-o" />
          使用说明
        </div>
        <van-cell-group inset>
          <van-collapse v-model="activeNames">
            <van-collapse-item title="如何使用？" name="1">
              <div class="help-content">
                <p>1. 在首页选择一个你喜欢的声景</p>
                <p>2. 点击声景图标开始播放白噪音</p>
                <p>3. 切换到专注页，设置专注时长</p>
                <p>4. 点击开始按钮，开启专注模式</p>
              </div>
            </van-collapse-item>
            <van-collapse-item title="什么是白噪音？" name="2">
              <div class="help-content">
                <p>白噪音是一种功率谱密度均匀的随机信号，能够有效屏蔽环境噪音，帮助你集中注意力或放松助眠。</p>
              </div>
            </van-collapse-item>
            <van-collapse-item title="番茄钟是什么？" name="3">
              <div class="help-content">
                <p>番茄工作法是一种时间管理方法，通过将工作分解为25分钟的专注时段，中间休息5分钟，提高工作效率。</p>
              </div>
            </van-collapse-item>
          </van-collapse>
        </van-cell-group>
      </div>

      <!-- 关于我们 -->
      <div class="section">
        <div class="section-title">
          <van-icon name="info-o" />
          关于我们
        </div>
        <van-cell-group inset>
          <van-cell title="应用名称" :value="'静谧空间 ZenZone'" />
          <van-cell title="版本号" :value="appVersion" />
          <van-cell title="开发团队" :value="`${teamMembers.length}人`" />
        </van-cell-group>

        <div class="team-members">
          <div class="team-title">开发团队</div>
          <div class="members-grid">
            <div
              v-for="(member, index) in teamMembers"
              :key="index"
              class="member-card"
            >
              <div class="member-avatar">
                {{ member.name.charAt(member.name.length - 1) }}
              </div>
              <div class="member-name">{{ member.name }}</div>
              <div class="member-role">{{ member.role }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部信息 -->
      <div class="footer">
        <p>@2025 ZenZone 静谧空间</p>
        <p>让专注成为习惯</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.settings-page {
  min-height: 100vh;
  background: var(--bg-secondary);
  padding-bottom: var(--spacing-xl);
}

.content {
  max-width: 500px;
  margin: 0 auto;
}

.header {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-lg);
  background: var(--bg-primary);
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.section {
  margin-top: var(--spacing-lg);
  padding: 0 var(--spacing-md);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  padding: 0 var(--spacing-sm);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.volume-slider {
  flex: 1;
}

.volume-value {
  text-align: center;
  margin-top: var(--spacing-sm);
  font-size: 14px;
  color: var(--text-secondary);
}

.help-content {
  padding: var(--spacing-md);
  line-height: 1.8;
  color: var(--text-secondary);
}

.help-content p {
  margin-bottom: var(--spacing-sm);
}

.team-members {
  margin-top: var(--spacing-md);
  background: var(--bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.team-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.member-card {
  text-align: center;
}

.member-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-gradient);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  margin: 0 auto var(--spacing-sm);
  box-shadow: var(--shadow-md);
}

.member-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.member-role {
  font-size: 12px;
  color: var(--text-secondary);
}

.footer {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-lg);
  color: var(--text-tertiary);
  font-size: 12px;
  line-height: 1.8;
}
</style>
