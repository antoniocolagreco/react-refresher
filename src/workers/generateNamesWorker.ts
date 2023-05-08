import generateName from '../utils/generateName'

onmessage = (e) => {
    const event = e as MessageEvent<GenerateNamesWorkerData>
    console.log('Worker: messaggio ricevuto')
    const { maxNumberOfCharacters, minNumberOfCharacters, numberOfNames, startingName } = event.data
    const names: Array<string> = []
    for (let index = 0; index < numberOfNames; index++) {
        const name = generateName(startingName, maxNumberOfCharacters, minNumberOfCharacters)
        names.push(name)
    }
    postMessage(names)
}

onmessageerror = (e) => {
    const event = e as MessageEvent<GenerateNamesWorkerData>
    console.log(`Worker: error. ${event}`)
}

onerror = (e) => {
    const event = e as MessageEvent<GenerateNamesWorkerData>
    console.log(`Worker: error. ${event}`)
}

export type GenerateNamesWorkerData = {
    numberOfNames: number
    startingName: string
    minNumberOfCharacters: number
    maxNumberOfCharacters: number
}
