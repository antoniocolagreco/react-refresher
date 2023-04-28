const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    let dateString = ''
    try {
        dateString = Intl.DateTimeFormat(
            'it-IT',
            options
                ? options
                : {
                      dateStyle: 'long',
                      timeStyle: 'short',
                  }
        ).format(date)
    } catch (error) {
        console.error((error as Error).message)
    }

    return dateString
}

export default formatDate
