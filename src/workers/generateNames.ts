/// DICHIARAZIONE CLASSE LETTER

class Letter {
    private value: string
    private vocal: boolean
    private consonant: boolean
    private endSyllable: boolean
    private endWord: boolean
    private startSyllable: boolean
    private startWord: boolean
    private nextCompatibleLetters: Array<Letter>

    constructor(
        value: string,
        vocal: boolean,
        consonant: boolean,
        endSyllable: boolean,
        endWord: boolean,
        startSyllable: boolean,
        startWord: boolean,
        nextCompatibleLetters: Array<Letter>
    ) {
        this.value = value
        this.vocal = vocal
        this.consonant = consonant
        this.vocal = vocal
        this.endSyllable = endSyllable
        this.endWord = endWord
        this.startSyllable = startSyllable
        this.startWord = startWord
        this.nextCompatibleLetters = nextCompatibleLetters
    }

    public toString() {
        return this.value
    }

    public isVocal(): boolean {
        return this.vocal
    }
    public isConsonant(): boolean {
        return this.consonant
    }

    public canEndSyllable(): boolean {
        return this.endSyllable
    }

    public canEndWord(): boolean {
        return this.endWord
    }

    public canStartSyllable(): boolean {
        return this.startSyllable
    }

    public canStartWord(): boolean {
        return this.startWord
    }

    public getNextCompatibleLetters(): Array<Letter> {
        return this.nextCompatibleLetters
    }

    public setNextCompatibleLetters(nextCompatibleLetters: Array<Letter>): void {
        this.nextCompatibleLetters = nextCompatibleLetters
    }
}

/// CREAZIONE LETTERS

const a = new Letter('a', true, false, true, true, true, true, [])
const e = new Letter('e', true, false, true, true, true, true, [])
const i = new Letter('i', true, false, true, true, true, true, [])
const o = new Letter('o', true, false, true, true, true, true, [])
const u = new Letter('u', true, false, true, true, true, true, [])

const b = new Letter('b', false, true, false, false, true, true, [])
const d = new Letter('d', false, true, false, false, true, true, [])
const f = new Letter('f', false, true, false, false, true, true, [])
const p = new Letter('p', false, true, false, false, true, true, [])

const t = new Letter('t', false, true, false, false, true, true, [])
const v = new Letter('v', false, true, false, false, true, true, [])
const z = new Letter('z', false, true, false, false, true, true, [])

const c = new Letter('c', false, true, false, false, true, true, [])
const g = new Letter('g', false, true, false, false, true, true, [])

const l = new Letter('l', false, true, true, false, true, true, [])
const r = new Letter('r', false, true, true, false, true, true, [])
const n = new Letter('n', false, true, true, false, true, true, [])
const m = new Letter('m', false, true, true, false, true, true, [])

const q = new Letter('q', false, true, false, false, true, true, [])

const s = new Letter('s', false, true, false, false, true, true, [])

const h = new Letter('h', false, true, false, false, false, false, [])

const alphabet = [a, b, c, d, e, f, g, h, i, l, m, n, o, p, q, r, s, t, u, v, z]

/// CONFIGURAZIONE LETTERS

a.setNextCompatibleLetters([e, i, u, b, c, d, f, g, l, m, n, p, q, r, s, t, v, z])
e.setNextCompatibleLetters([a, i, o, u, b, c, d, f, g, l, m, n, p, q, r, s, t, v, z])
i.setNextCompatibleLetters([a, e, o, u, b, c, d, f, g, l, m, n, p, q, r, s, t, v, z])
o.setNextCompatibleLetters([a, e, i, b, c, d, f, g, l, m, n, p, q, r, s, t, v, z])
u.setNextCompatibleLetters([a, e, i, o, b, c, d, f, g, l, m, n, p, q, r, s, t, v, z])

b.setNextCompatibleLetters([a, b, e, i, l, o, r, u])
c.setNextCompatibleLetters([a, c, e, h, i, l, o, q, r, u])
d.setNextCompatibleLetters([a, d, e, i, l, o, r, u])
f.setNextCompatibleLetters([a, f, e, i, l, o, r, u])
g.setNextCompatibleLetters([a, g, e, h, i, l, o, r, u])
h.setNextCompatibleLetters([e, i])
l.setNextCompatibleLetters([a, b, c, d, e, f, g, i, l, m, n, o, p, q, s, t, u, v, z])
m.setNextCompatibleLetters([a, b, e, i, m, o, p, u])
n.setNextCompatibleLetters([a, c, d, e, f, g, i, n, o, q, s, t, u, v, z])
p.setNextCompatibleLetters([a, e, i, l, o, p, r, u])
q.setNextCompatibleLetters([u])
r.setNextCompatibleLetters([a, b, c, d, e, f, g, i, l, m, n, o, p, q, r, s, t, u, v, z])
s.setNextCompatibleLetters([a, b, c, d, e, f, g, i, l, m, n, o, p, q, r, s, t, u, v])
t.setNextCompatibleLetters([a, e, i, l, o, r, t, u])
v.setNextCompatibleLetters([a, e, i, l, o, r, u, v])
z.setNextCompatibleLetters([a, e, i, o, u, z])

const DEBUG_MODE = false

const generateName = (startingName: string = '', maxLength: number = 10, minLegth: number = 3): string => {
    let name = startingName
    const numberOfCharacters = getRandomNumber(
        maxLength,
        startingName.length > minLegth ? startingName.length : minLegth
    )
    cLog(`Numero di caratteri scelto: ${numberOfCharacters}`)

    let theNameHasTheRightNumberOfCharacters = name.length >= numberOfCharacters
    let lastLetter = getLetterFromString(name)
    let theLastLetterCanEndTheName = lastLetter?.canEndWord()

    while (!theNameHasTheRightNumberOfCharacters || !theLastLetterCanEndTheName) {
        cLog(`||||||||||||||||| Il nome corrente è: ${name} |||||||||||||||||`)
        name = addLetter(name)

        if (name.length >= numberOfCharacters) {
            theNameHasTheRightNumberOfCharacters = true
        }

        lastLetter = getLetterFromString(name)

        if (lastLetter && lastLetter.canEndWord()) {
            theLastLetterCanEndTheName = true
        } else {
            theLastLetterCanEndTheName = false
        }
    }

    cLog(`Il nome finale è: ${name}`)
    return name
}

const addLetter = (currentName?: string) => {
    const name = currentName || ''
    const lastLetter = getLetterFromString(name)
    cLog(`L'ultima lettera di name è : ${lastLetter ? lastLetter.toString() : lastLetter}`)
    let pickedLetter

    //Se il nome è vuoto, prendo la prima lettera dall'alfabeto
    if (!lastLetter) {
        cLog(`Il nome è vuoto, scelgo una lettera dall'alfabeto`)
        while (!pickedLetter || (pickedLetter && !pickedLetter.canStartWord())) {
            pickedLetter = getRandomLetterFromSelection(alphabet)
            cLog(`Verifico la lettera: ${pickedLetter.toString()}`)
        }
        cLog(`Scelta la lettera: ${pickedLetter.toString()}`)
    }
    //altrimenti trovo una lettera compatibile con i caratteri precedenti
    else {
        let secondToLastLetter
        let compatible = false

        cLog(`Cerco una lettera compatibile con ${name}`)

        let limit = 0

        while (!compatible) {
            compatible = true

            limit += 1
            if (limit > 50) {
                return name
            }

            //Prova un raddoppio consonante iniziale
            const randomNumber = getRandomNumber(2)
            if (
                name.length > 2 &&
                lastLetter.isConsonant() &&
                randomNumber === 0 &&
                lastLetter !== h &&
                lastLetter !== q
            ) {
                pickedLetter = lastLetter
                cLog(`------------------Raddoppio lettere ${lastLetter}${pickedLetter}`)
            } else {
                //Pesca una lettera
                pickedLetter = getRandomLetterFromSelection(lastLetter.getNextCompatibleLetters())
            }

            //Effettuo verifiche compatibilità
            cLog(`Verifico la lettera: ${pickedLetter.toString()}`)

            //Evita doppie consonanti ad inizio parola a meno che la prima si una s. "rd" no, "sd" si
            if (
                (name.length === 1 && lastLetter.isConsonant() && lastLetter !== s && pickedLetter.isConsonant()) ||
                (lastLetter === s && pickedLetter === s)
            ) {
                cLog(
                    `All'inizio della parola non è possibile avere due consonanti delle quali la prima non è s oppure due s consecutive ${lastLetter}${pickedLetter}`
                )
                compatible = false
            }
            //Verifica che dopo qu venga aggiunta una vocale
            if (lastLetter === q && pickedLetter === u) {
                cLog(`Trovata la sequenza 'qu', aggiungo una vocale e break`)
                pickedLetter = getRandomLetterFromSelection([a, e, i, o])
                return name + u.toString() + pickedLetter.toString()
            }

            secondToLastLetter = getLetterFromString(name, 2)
            if (secondToLastLetter) {
                //Verifica che non ci siano già due lettere uguali prima. "ss" ok, "sss" no
                if (secondToLastLetter === pickedLetter && lastLetter === pickedLetter) {
                    cLog(
                        `${pickedLetter.toString()} non è valido quando già precedeuto da ${secondToLastLetter.toString()}${lastLetter.toString()}, aggiungo vocale e break`
                    )
                    pickedLetter = getRandomLetterFromSelection([a, e, i, o, u])
                    return name + pickedLetter.toString()
                }

                //Verifica che non ci siano 3 consonanti consecutive, a meno che la prima sia una s e la terza, l o r. "plo"
                if (
                    secondToLastLetter.isConsonant() &&
                    secondToLastLetter !== s &&
                    lastLetter.isConsonant() &&
                    pickedLetter.isConsonant() &&
                    (pickedLetter != r || pickedLetter != l)
                ) {
                    cLog(
                        `Non è possibile avere 3 consonanti consecutive di questo tipo ${secondToLastLetter.toString()}${lastLetter.toString()}${pickedLetter.toString()}`
                    )
                    compatible = false
                }
                //Verifica che non ci siano 2 consonanti uguali consecutive, dopo una prima "s"
                if (secondToLastLetter === s && (lastLetter === s || lastLetter === r) && pickedLetter === lastLetter) {
                    cLog(
                        `Non è possibile avere 2 r o l dopo 1 s ${secondToLastLetter.toString()}${lastLetter.toString()}${pickedLetter.toString()}`
                    )
                    compatible = false
                }
                //Se la sillaba inizia per s, la seconda lettera è una cosonante, la terza è una cosonante ma diversa da l o r. "snqui"
                if (
                    secondToLastLetter == s &&
                    lastLetter.isConsonant() &&
                    pickedLetter.isConsonant() &&
                    pickedLetter !== l &&
                    pickedLetter !== r
                ) {
                    cLog(
                        `Non è possibile avere 2 consonanti consecutive di questo tipo dopo la s: ${secondToLastLetter.toString()}${lastLetter.toString()}${pickedLetter.toString()}`
                    )
                    compatible = false
                }
                //Verifica che la penultima consonante non sia uguale a quella pescata "srs"
                if (
                    secondToLastLetter.isConsonant() &&
                    pickedLetter.isConsonant() &&
                    pickedLetter === secondToLastLetter
                ) {
                    cLog(
                        `Non è possibile avere la penultima consonante uguale alla prima ${secondToLastLetter}${lastLetter}${pickedLetter}`
                    )
                    compatible = false
                }
                //Non è possibile avere tre vocali consecutive a meno che la seconda non sia una i. "uio" si, "uao" no
                if (
                    secondToLastLetter.isVocal() &&
                    pickedLetter.isVocal() &&
                    lastLetter.isVocal() &&
                    lastLetter !== i
                ) {
                    cLog(
                        `Non è possibile avere tre vocali consecutive a meno che la seconda non sia una i: ${secondToLastLetter}${lastLetter}${pickedLetter}`
                    )
                    compatible = false
                }
            }
        }
    }

    if (!pickedLetter) return name
    return name + pickedLetter.toString()
}

const getRandomNumber = (maxValue: number, minValue: number = 0) => {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
}

const getRandomLetterFromSelection = (selection: Array<Letter>): Letter => {
    const randomIndex = getRandomNumber(selection.length - 1, 0)
    cLog(`Selection è lungo ${selection.length}, l'indice random è ${randomIndex}`)
    const randomLetter = selection[randomIndex]
    cLog(`L'elemento numero ${randomIndex} di ${selection} è ${randomLetter.toString()}`)
    return randomLetter
}

const convertStringToLetter = (string: string, letters: Array<Letter> = alphabet): Letter | null => {
    for (let l of letters) {
        if (string === l.toString()) return l
    }
    return null
}

const getLetterFromString = (string: string, fromEnd: number = 1): Letter | null => {
    const letter = convertStringToLetter(string[string.length - fromEnd], alphabet)
    return letter
}

const cLog = (string: string) => {
    if (DEBUG_MODE) {
        cLog(string)
    }
}

onmessage = (e) => {
    const event = e as MessageEvent<GenerateNamesWorkerData>
    const { maxNumberOfCharacters, minNumberOfCharacters, numberOfNames, startingName } = event.data
    const names: Array<string> = []
    for (let index = 0; index < numberOfNames; index++) {
        const name = generateName(startingName, maxNumberOfCharacters, minNumberOfCharacters)
        names.push(name)
    }
    postMessage(names)
}

type GenerateNamesWorkerData = {
    numberOfNames: number
    startingName: string
    minNumberOfCharacters: number
    maxNumberOfCharacters: number
}
