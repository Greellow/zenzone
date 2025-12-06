# 静谧空间 (ZenZone)

<div align="center">

🎵 一款专注于提升专注力和改善睡眠质量的移动端 Web 应用

[![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![Vant](https://img.shields.io/badge/Vant-4.x-blue.svg)](https://vant-ui.github.io/vant/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[在线演示](#) | [功能特性](#功能特性) | [快速开始](#快速开始) | [项目文档](#项目文档)

</div>

## 📖 项目简介

静谧空间（ZenZone）是一款基于 Vue 3 + Vant UI 开发的移动端网页应用，旨在帮助用户：

- 🎧 通过白噪音屏蔽环境干扰，提升专注力
- ⏰ 使用番茄钟进行时间管理，提高工作效率
- 😴 改善睡眠质量，快速进入放松状态
- 🧘 营造沉浸式的专注环境

## ✨ 功能特性

### 🌟 声景选择
- 6 种精选白噪音场景：雨夜、森林、篝火、海浪、咖啡厅、白噪音
- 高质量音频循环播放
- 动态背景图片切换
- 沉浸式全屏体验

### ⏱️ 番茄钟倒计时
- 多种预设时长：15/25/45/60 分钟
- 大尺寸圆形倒计时器
- 实时进度显示
- 倒计时结束通知提醒

### ⚙️ 个性化设置
- 音量自由调节
- 日间/深色主题切换
- 使用说明和帮助文档
- 团队信息展示

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖
```bash
cd zenzone
npm install
```

### 开发模式
```bash
npm run dev
```


### 生产构建
```bash
npm run build
```

构建产物将生成在 `dist` 目录

### 预览构建
```bash
npm run preview
```

## 📱 使用指南

### 1. 选择声景
- 在首页浏览不同的声音场景
- 点击场景卡片开始播放白噪音
- 背景图片会随选中的场景切换

### 2. 开启专注模式
- 切换到"专注"页面
- 选择专注时长（15/25/45/60分钟）
- 点击"开始专注"按钮
- 倒计时期间白噪音持续播放

### 3. 个性化设置
- 在"设置"页面调节音量
- 切换日间/深色主题
- 查看使用说明和团队信息

## 🎨 技术栈

- **前端框架**：Vue 3 (Composition API)
- **UI 组件库**：Vant 4.x
- **开发语言**：TypeScript
- **构建工具**：Vite
- **状态管理**：Pinia
- **路由管理**：Vue Router 4
- **样式方案**：CSS Variables + Scoped CSS

## 📂 项目结构

```
zenzone/
├── public/                 # 静态资源
│   ├── audio/             # 音频文件
│   └── images/            # 图片资源
├── src/
│   ├── views/             # 页面组件
│   │   ├── Home.vue       # 首页 - 声景选择
│   │   ├── Focus.vue      # 专注页 - 番茄钟
│   │   └── Settings.vue   # 设置页
│   ├── stores/            # 状态管理
│   │   ├── audio.ts       # 音频状态
│   │   └── theme.ts       # 主题状态
│   ├── composables/       # 组合式函数
│   │   └── useTimer.ts    # 计时器逻辑
│   ├── router/            # 路由配置
│   ├── styles/            # 全局样式
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── 需求分析.md             # 需求分析文档
├── 设计报告.md             # 设计报告文档
└── README.md              # 项目说明文档
```

## 📝 项目文档

- [需求分析文档](./需求分析.md) - 详细的功能需求和用户需求分析
- [设计报告文档](./设计报告.md) - 系统架构、UI/UX 设计和技术实现方案

## 🎯 核心功能实现

### 音频播放管理
使用 HTML5 Audio API 实现音频播放控制，支持：
- 场景切换
- 音量调节
- 播放状态管理
- 设置持久化

### 番茄钟计时器
基于 `setInterval` 实现精确的倒计时功能：
- 多种预设时长
- 实时进度计算
- 完成通知提醒
- 暂停/继续/重置

### 主题切换
使用 CSS Variables 实现主题切换：
- 日间/深色两种主题
- 平滑过渡动画
- 自动检测系统主题
- 主题持久化保存

## 🌐 浏览器兼容性

- iOS Safari 12+
- Android Chrome 80+
- 微信内置浏览器
- 其他现代移动端浏览器

## 📦 音频资源

项目使用的白噪音音频文件需要自行准备，推荐来源：
- [Freesound](https://freesound.org/) - 免费音效库
- [Zapsplat](https://www.zapsplat.com/) - 免费音效资源
- [Mixkit](https://mixkit.co/free-sound-effects/) - 免费音效

详见 `public/audio/README.md` 获取音频文件说明


## 📄 开源协议

本项目采用 [MIT](https://opensource.org/licenses/MIT) 协议

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vant](https://vant-ui.github.io/vant/) - 轻量、可靠的移动端组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具


---

<div align="center">

**让专注成为习惯，在静谧中找到力量** 💪

Made with ❤️ by ZenZone Team

</div>
