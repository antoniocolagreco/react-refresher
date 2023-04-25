const formatDate = (date: Date): string => {
    const options1: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }
    const options2: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    }
    const formattedDate1 = new Intl.DateTimeFormat('it-IT', options1).format(date)
    const formattedDate2 = new Intl.DateTimeFormat('it-IT', options2).format(date)
    return `${formattedDate1} alle ${formattedDate2}`
}

export default formatDate
