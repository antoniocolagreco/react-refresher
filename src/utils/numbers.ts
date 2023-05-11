const numbers = (from: number = 0, to: number = from + 99): number[] => {
    const result: number[] = []
    for (let index = from; index < to + 1; index++) {
        result.push(index)
    }
    return result
}

export default numbers
