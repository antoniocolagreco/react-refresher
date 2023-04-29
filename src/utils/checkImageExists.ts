const checkImageExists = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url, { method: 'HEAD' })
        if (response.status !== 200) return false
        if (!response.headers.get('content-type')?.startsWith('image/')) return false
        return true
    } catch (error) {
        return false
    }
}

export default checkImageExists
