const throttle = (func: (...args: any[]) => void | {}, delay: number) => {
    let timeoutId: NodeJS.Timeout | null
    let lastExecTime = 0

    const throttledFunction = (...args: any[]) => {
        const currentTime = Date.now()
        const elapsed = currentTime - lastExecTime

        const execute = () => {
            func.apply(this, args)
            lastExecTime = currentTime
        }

        if (!timeoutId) {
            execute()
            timeoutId = setTimeout(() => {
                timeoutId = null
                if (elapsed >= delay) {
                    execute()
                }
            }, delay)
        }
    }

    return throttledFunction
}

export default throttle
