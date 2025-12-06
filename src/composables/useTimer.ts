import { ref, computed } from 'vue'

export function useTimer() {
    const totalSeconds = ref(0)
    const remainingSeconds = ref(0)
    const isRunning = ref(false)
    const intervalId = ref<number | null>(null)

    // 格式化时间显示
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    const displayTime = computed(() => formatTime(remainingSeconds.value))
    const progress = computed(() => {
        if (totalSeconds.value === 0) return 0
        return ((totalSeconds.value - remainingSeconds.value) / totalSeconds.value) * 100
    })

    // 开始计时
    const start = (minutes: number) => {
        if (isRunning.value) return

        totalSeconds.value = minutes * 60
        remainingSeconds.value = totalSeconds.value
        isRunning.value = true

        intervalId.value = window.setInterval(() => {
            if (remainingSeconds.value > 0) {
                remainingSeconds.value--
            } else {
                complete()
            }
        }, 1000)
    }

    // 暂停
    const pause = () => {
        if (intervalId.value) {
            clearInterval(intervalId.value)
            intervalId.value = null
        }
        isRunning.value = false
    }

    // 继续
    const resume = () => {
        if (remainingSeconds.value > 0 && !isRunning.value) {
            isRunning.value = true
            intervalId.value = window.setInterval(() => {
                if (remainingSeconds.value > 0) {
                    remainingSeconds.value--
                } else {
                    complete()
                }
            }, 1000)
        }
    }

    // 重置
    const reset = (newMinutes?: number) => {
        pause()
        if (newMinutes !== undefined) {
            totalSeconds.value = newMinutes * 60
        }
        remainingSeconds.value = totalSeconds.value
    }

    // 完成
    const complete = () => {
        pause()
        // 播放提示音
        const audio = new Audio('/audio/complete.mp3')
        audio.play().catch(() => {
            // 如果音频文件不存在，使用系统提示
            console.log('Timer completed!')
        })

        // 显示通知
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('专注时间结束', {
                body: '恭喜你完成了一个专注时段！',
                icon: '/favicon.ico'
            })
        }
    }

    // 请求通知权限
    const requestNotificationPermission = () => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission()
        }
    }

    return {
        totalSeconds,
        remainingSeconds,
        isRunning,
        displayTime,
        progress,
        start,
        pause,
        resume,
        reset,
        formatTime,
        requestNotificationPermission
    }
}
