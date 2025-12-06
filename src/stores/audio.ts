import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface SoundScene {
    id: string
    name: string
    icon: string
    audioUrl: string
    bgImage: string
    description: string
}

export const useAudioStore = defineStore('audio', () => {
    const currentScene = ref<SoundScene | null>(null)
    const isPlaying = ref(false)
    const volume = ref(0.7)
    const audio = ref<HTMLAudioElement | null>(null)

    // 初始化音频对象
    const initAudio = () => {
        if (!audio.value) {
            audio.value = new Audio()
            audio.value.loop = true
            audio.value.volume = volume.value
        }
    }

    // 播放场景
    const playScene = (scene: SoundScene) => {
        initAudio()

        if (currentScene.value?.id === scene.id && isPlaying.value) {
            // 如果点击的是当前正在播放的场景，则暂停
            pause()
            return
        }

        currentScene.value = scene
        if (audio.value) {
            audio.value.src = scene.audioUrl
            audio.value.play()
            isPlaying.value = true
        }
    }

    // 暂停
    const pause = () => {
        if (audio.value) {
            audio.value.pause()
            isPlaying.value = false
        }
    }

    // 继续播放
    const resume = () => {
        if (audio.value && currentScene.value) {
            audio.value.play()
            isPlaying.value = true
        }
    }

    // 停止
    const stop = () => {
        if (audio.value) {
            audio.value.pause()
            audio.value.currentTime = 0
            isPlaying.value = false
        }
    }

    // 监听音量变化
    watch(volume, (newVolume) => {
        if (audio.value) {
            audio.value.volume = newVolume
        }
        // 保存到本地存储
        localStorage.setItem('zenzone_volume', String(newVolume))
    })

    // 从本地存储恢复音量
    const savedVolume = localStorage.getItem('zenzone_volume')
    if (savedVolume) {
        volume.value = parseFloat(savedVolume)
    }

    return {
        currentScene,
        isPlaying,
        volume,
        playScene,
        pause,
        resume,
        stop
    }
})
