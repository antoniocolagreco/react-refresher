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

export default Letter
