export const cLog = (debug: boolean, value: any) => {
    if (debug) {
        console.log(value)
    }
}

export const cClear = (debug: boolean) => {
    if (debug) {
        console.clear()
    }
}
