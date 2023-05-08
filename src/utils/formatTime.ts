const formatTime = (timeInMilliseconds: number, locale: string = navigator.language): string => {
    const millisecondsInSecond = 1000
    const millisecondsInMinute = 60 * millisecondsInSecond
    const millisecondsInHour = 60 * millisecondsInMinute
    const millisecondsInDay = 24 * millisecondsInHour

    const days = Math.floor(timeInMilliseconds / millisecondsInDay)
    const hours = Math.floor((timeInMilliseconds % millisecondsInDay) / millisecondsInHour)
    const minutes = Math.floor((timeInMilliseconds % millisecondsInHour) / millisecondsInMinute)
    const seconds = Math.floor((timeInMilliseconds % millisecondsInMinute) / millisecondsInSecond)
    const milliseconds = Math.floor(timeInMilliseconds % millisecondsInSecond)

    const timeParts = []

    if (days > 0) {
        timeParts.push(
            new Intl.PluralRules(locale, { type: 'ordinal' }).select(days) +
                ' ' +
                days.toLocaleString(locale, { minimumIntegerDigits: 1 }) +
                'd'
        )
    }

    if (hours > 0) {
        timeParts.push(hours.toLocaleString(locale, { minimumIntegerDigits: 2 }) + 'h')
    }

    if (minutes > 0) {
        timeParts.push(minutes.toLocaleString(locale, { minimumIntegerDigits: 2 }) + 'm')
    }

    if (seconds > 0 || timeParts.length === 0) {
        timeParts.push(seconds.toLocaleString(locale, { minimumIntegerDigits: 2 }) + 's')
    }

    if (milliseconds > 0) {
        timeParts.push(milliseconds.toLocaleString(locale, { minimumIntegerDigits: 3 }) + 'ms')
    }

    return timeParts.join(' ')
}

export default formatTime
