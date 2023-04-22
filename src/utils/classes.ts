const classes = (...names: Array<string | undefined>) => {
    let result = ''

    for (const name of names) {
        if (!name || name.trim().length === 0) continue
        result += name + ' '
    }

    return result.trimEnd()
}

export default classes
