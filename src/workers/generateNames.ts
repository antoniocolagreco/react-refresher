/// DICHIARAZIONE CLASSE CHARACTER

class Character {
    private value: string
    private vocal: boolean
    private consonant: boolean
    private endSyllable: boolean
    private endWord: boolean
    private startSyllable: boolean
    private startWord: boolean
    private nextCompatibleCharacters: Array<Character>

    constructor(
        value: string,
        vocal: boolean,
        consonant: boolean,
        endSyllable: boolean,
        endWord: boolean,
        startSyllable: boolean,
        startWord: boolean,
        nextCompatibleCharacters: Array<Character>
    ) {
        this.value = value
        this.vocal = vocal
        this.consonant = consonant
        this.vocal = vocal
        this.endSyllable = endSyllable
        this.endWord = endWord
        this.startSyllable = startSyllable
        this.startWord = startWord
        this.nextCompatibleCharacters = nextCompatibleCharacters
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

    public getNextCompatibleCharacters(): Array<Character> {
        return this.nextCompatibleCharacters
    }

    public setNextCompatibleCharacters(nextCompatibleCharacters: Array<Character>): void {
        this.nextCompatibleCharacters = nextCompatibleCharacters
    }
}

/// CREAZIONE CHARACTERS

const a = new Character('a', true, false, true, true, true, true, [])
const e = new Character('e', true, false, true, true, true, true, [])
const i = new Character('i', true, false, true, true, true, true, [])
const o = new Character('o', true, false, true, true, true, true, [])
const u = new Character('u', true, false, true, false, true, true, [])

const b = new Character('b', false, true, false, false, true, true, [])
const d = new Character('d', false, true, false, false, true, true, [])
const f = new Character('f', false, true, false, false, true, true, [])
const p = new Character('p', false, true, false, false, true, true, [])

const t = new Character('t', false, true, false, false, true, true, [])
const v = new Character('v', false, true, false, false, true, true, [])
const z = new Character('z', false, true, false, false, true, true, [])

const c = new Character('c', false, true, false, false, true, true, [])
const g = new Character('g', false, true, false, false, true, true, [])

const l = new Character('l', false, true, true, false, true, true, [])
const r = new Character('r', false, true, true, false, true, true, [])
const n = new Character('n', false, true, true, false, true, true, [])
const m = new Character('m', false, true, true, false, true, true, [])

const q = new Character('q', false, true, false, false, true, true, [])

const s = new Character('s', false, true, false, false, true, true, [])

const h = new Character('h', false, true, false, false, false, false, [])

const alphabet = [a, b, c, d, e, f, g, h, i, l, m, n, o, p, q, r, s, t, u, v, z]

/// CONFIGURAZIONE CHARACTERS

a.setNextCompatibleCharacters([e, i, u, b, c, d, f, g, l, m, n, p, q, r, s, t, v, z])
e.setNextCompatibleCharacters([a, i, o, u, b, c, d, f, g, l, m, n, p, q, r, s, t, v, z])
i.setNextCompatibleCharacters([a, e, o, u, b, c, d, f, g, l, m, n, p, q, r, s, t, v, z])
o.setNextCompatibleCharacters([a, e, i, b, c, d, f, g, l, m, n, p, q, r, s, t, v, z])
u.setNextCompatibleCharacters([a, e, i, o, b, c, d, f, g, l, m, n, p, q, r, s, t, v, z])

b.setNextCompatibleCharacters([a, b, e, i, l, o, r, u])
c.setNextCompatibleCharacters([a, c, e, h, i, l, o, q, r, u])
d.setNextCompatibleCharacters([a, d, e, i, l, o, r, u])
f.setNextCompatibleCharacters([a, f, e, i, l, o, r, u])
g.setNextCompatibleCharacters([a, g, e, h, i, l, o, r, u])
h.setNextCompatibleCharacters([e, i])
l.setNextCompatibleCharacters([a, b, c, d, e, f, g, i, l, m, n, o, p, q, s, t, u, v, z])
m.setNextCompatibleCharacters([a, b, e, i, m, o, p, u])
n.setNextCompatibleCharacters([a, c, d, e, f, g, i, n, o, q, s, t, u, v, z])
p.setNextCompatibleCharacters([a, e, i, l, o, p, r, u])
q.setNextCompatibleCharacters([u])
r.setNextCompatibleCharacters([a, b, c, d, e, f, g, i, l, m, n, o, p, q, r, s, t, u, v, z])
s.setNextCompatibleCharacters([a, b, c, d, e, f, g, i, l, m, n, o, p, q, r, s, t, u, v])
t.setNextCompatibleCharacters([a, e, i, l, o, r, t, u])
v.setNextCompatibleCharacters([a, e, i, l, o, r, u, v])
z.setNextCompatibleCharacters([a, e, i, o, u, z])

const DEBUG_MODE = false

const generateName = (startingName: string = '', maxLength: number = 10, minLegth: number = 3): string => {
    cClear(DEBUG_MODE)

    let name = startingName
    const numberOfCharacters = getRandomNumber(
        maxLength,
        startingName.length > minLegth ? startingName.length : minLegth
    )
    cLog(DEBUG_MODE, `Numero di caratteri scelto: ${numberOfCharacters}`)

    let theNameHasTheRightNumberOfCharacters = name.length >= numberOfCharacters
    let lastCharacter = getCharacterFromString(name)
    let theLastCharacterCanEndTheName = lastCharacter?.canEndWord()

    while (!theNameHasTheRightNumberOfCharacters || !theLastCharacterCanEndTheName) {
        cLog(DEBUG_MODE, `||||||||||||||||| Il nome corrente è: ${name} |||||||||||||||||`)
        name = addCharacter(name)

        if (name.length >= numberOfCharacters) {
            theNameHasTheRightNumberOfCharacters = true
        }

        lastCharacter = getCharacterFromString(name)

        if (lastCharacter && lastCharacter.canEndWord()) {
            theLastCharacterCanEndTheName = true
        } else {
            theLastCharacterCanEndTheName = false
        }
    }

    cLog(DEBUG_MODE, `Il nome finale è: ${name}`)
    return name
}

const addCharacter = (currentName?: string) => {
    const name = currentName || ''
    const lastCharacter = getCharacterFromString(name)
    cLog(DEBUG_MODE, `L'ultima lettera di name è : ${lastCharacter ? lastCharacter.toString() : lastCharacter}`)
    let pickedCharacter

    //Se il nome è vuoto, prendo la prima lettera dall'alfabeto
    if (!lastCharacter) {
        cLog(DEBUG_MODE, `Il nome è vuoto, scelgo una lettera dall'alfabeto`)
        while (!pickedCharacter || (pickedCharacter && !pickedCharacter.canStartWord())) {
            pickedCharacter = getRandomCharacterFromSelection(alphabet)
            cLog(DEBUG_MODE, `Verifico la lettera: ${pickedCharacter.toString()}`)
        }
        cLog(DEBUG_MODE, `Scelta la lettera: ${pickedCharacter.toString()}`)
    }
    //altrimenti trovo una lettera compatibile con i caratteri precedenti
    else {
        let secondToLastCharacter
        let compatible = false

        cLog(DEBUG_MODE, `Cerco una lettera compatibile con ${name}`)

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
                lastCharacter.isConsonant() &&
                randomNumber === 0 &&
                lastCharacter !== h &&
                lastCharacter !== q
            ) {
                pickedCharacter = lastCharacter
                cLog(DEBUG_MODE, `------------------Raddoppio lettere ${lastCharacter}${pickedCharacter}`)
            } else {
                //Pesca una lettera
                pickedCharacter = getRandomCharacterFromSelection(lastCharacter.getNextCompatibleCharacters())
            }

            //Effettuo verifiche compatibilità
            cLog(DEBUG_MODE, `Verifico la lettera: ${pickedCharacter.toString()}`)

            //Evita doppie consonanti ad inizio parola a meno che la prima sia una s. "rd" no, "sd" si
            if (
                (name.length === 1 &&
                    lastCharacter.isConsonant() &&
                    lastCharacter !== s &&
                    pickedCharacter.isConsonant()) ||
                (lastCharacter === s && pickedCharacter === s)
            ) {
                cLog(
                    DEBUG_MODE,
                    `All'inizio della parola non è possibile avere due consonanti delle quali la prima non è s oppure due s consecutive ${lastCharacter}${pickedCharacter}`
                )
                compatible = false
            }
            //Verifica che dopo qu venga aggiunta una vocale
            if (lastCharacter === q && pickedCharacter === u) {
                cLog(DEBUG_MODE, `Trovata la sequenza 'qu', aggiungo una vocale e break`)
                pickedCharacter = getRandomCharacterFromSelection([a, e, i, o])
                return name + u.toString() + pickedCharacter.toString()
            }

            secondToLastCharacter = getCharacterFromString(name, 2)
            if (secondToLastCharacter) {
                //Verifica che non ci siano già due lettere uguali prima. "ss" ok, "sss" no
                if (secondToLastCharacter === pickedCharacter && lastCharacter === pickedCharacter) {
                    cLog(
                        DEBUG_MODE,
                        `${pickedCharacter.toString()} non è valido quando già precedeuto da ${secondToLastCharacter.toString()}${lastCharacter.toString()}, aggiungo vocale e break`
                    )
                    pickedCharacter = getRandomCharacterFromSelection([a, e, i, o, u])
                    return name + pickedCharacter.toString()
                }

                //Verifica che non ci siano 3 consonanti consecutive, a meno che la prima sia una s e la terza, l o r. "spremere" si "spdemere" no
                if (
                    secondToLastCharacter.isConsonant() &&
                    secondToLastCharacter !== s &&
                    lastCharacter.isConsonant() &&
                    pickedCharacter.isConsonant() &&
                    (pickedCharacter != r || pickedCharacter != l)
                ) {
                    cLog(
                        DEBUG_MODE,
                        `Non è possibile avere 3 consonanti consecutive di questo tipo ${secondToLastCharacter.toString()}${lastCharacter.toString()}${pickedCharacter.toString()}`
                    )
                    compatible = false
                }
                //Verifica che non ci siano 2 consonanti uguali consecutive, dopo una prima "s", "sggatto" no
                if (
                    secondToLastCharacter === s &&
                    (lastCharacter === s || lastCharacter === r) &&
                    pickedCharacter === lastCharacter
                ) {
                    cLog(
                        DEBUG_MODE,
                        `Non è possibile avere 2 r o l dopo 1 s ${secondToLastCharacter.toString()}${lastCharacter.toString()}${pickedCharacter.toString()}`
                    )
                    compatible = false
                }
                //Se la sillaba inizia per s, la seconda lettera è una cosonante, la terza è una cosonante ma diversa da l o r. "snqui"
                if (
                    secondToLastCharacter == s &&
                    lastCharacter.isConsonant() &&
                    pickedCharacter.isConsonant() &&
                    pickedCharacter !== l &&
                    pickedCharacter !== r
                ) {
                    cLog(
                        DEBUG_MODE,
                        `Non è possibile avere 2 consonanti consecutive di questo tipo dopo la s: ${secondToLastCharacter.toString()}${lastCharacter.toString()}${pickedCharacter.toString()}`
                    )
                    compatible = false
                }
                //Verifica che la prima consonante non sia uguale a quella pescata, "srs".
                if (
                    secondToLastCharacter.isConsonant() &&
                    pickedCharacter.isConsonant() &&
                    pickedCharacter === secondToLastCharacter
                ) {
                    cLog(
                        DEBUG_MODE,
                        `Non è possibile avere la penultima consonante uguale alla prima ${secondToLastCharacter}${lastCharacter}${pickedCharacter}`
                    )
                    compatible = false
                }
                //Non è possibile avere tre vocali consecutive a meno che la seconda non sia una i. "uio" si, "uao" no
                if (
                    secondToLastCharacter.isVocal() &&
                    pickedCharacter.isVocal() &&
                    lastCharacter.isVocal() &&
                    lastCharacter !== i
                ) {
                    cLog(
                        DEBUG_MODE,
                        `Non è possibile avere tre vocali consecutive a meno che la seconda non sia una i: ${secondToLastCharacter}${lastCharacter}${pickedCharacter}`
                    )
                    compatible = false
                }
            }
        }
    }

    if (!pickedCharacter) return name
    return name + pickedCharacter.toString()
}

const getRandomNumber = (maxValue: number, minValue: number = 0) => {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
}

const getRandomCharacterFromSelection = (selection: Array<Character>): Character => {
    const randomIndex = getRandomNumber(selection.length - 1, 0)
    cLog(DEBUG_MODE, `Selection è lungo ${selection.length}, l'indice random è ${randomIndex}`)
    const randomCharacter = selection[randomIndex]
    cLog(DEBUG_MODE, `L'elemento numero ${randomIndex} di ${selection} è ${randomCharacter.toString()}`)
    return randomCharacter
}

const convertStringToCharacter = (string: string, characters: Array<Character> = alphabet): Character | null => {
    for (let l of characters) {
        if (string === l.toString()) return l
    }
    return null
}

const getCharacterFromString = (string: string, fromEnd: number = 1): Character | null => {
    const character = convertStringToCharacter(string[string.length - fromEnd], alphabet)
    return character
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

const cLog = (debug: boolean, value: any) => {
    if (debug) {
        console.log(value)
    }
}

const cClear = (debug: boolean) => {
    if (debug) {
        console.clear()
    }
}
