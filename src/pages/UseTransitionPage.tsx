import classes from '@utils/classes'
import React, { FC, HTMLAttributes, useEffect, useState, useTransition } from 'react'
import Button from '../components/button/Button'
import IconOK from '../icons/IconOK'
import styles from './UseTransitionPage.module.css'

type UseTransitionPageProps = {}

const DEFAULT_NUMBER_OF_NAMES_VALUE = 100
const DEFAULT_NUMBER_OF_CHARACTERS_VALUE = 10

const UseTransitionPage: FC<HTMLAttributes<HTMLDivElement> & UseTransitionPageProps> = (props) => {
    const { children, className, ...otherProps } = props
    const [names, setNames] = useState<Array<string>>([])
    const [isPending, startTransition] = useTransition()
    const [numberOfNames, setNumberOfNames] = useState<number>(DEFAULT_NUMBER_OF_NAMES_VALUE)
    const [name, setName] = useState<string>('')
    const [maxNumberOfCharacters, setMaxNumberOfCharacters] = useState<number>(DEFAULT_NUMBER_OF_CHARACTERS_VALUE)
    const [numberOfNamesSize, setNumberOfNamesSize] = useState<number>(0)
    const [nameSize, setNameSize] = useState<number>(0)
    const [maxNumberOfCharactersSize, setMaxNumberOfCharactersSize] = useState<number>(0)

    useEffect(() => {
        setNumberOfNamesSize(numberOfNames.toString().length + 1)
        setNameSize(name.length + 1)
        setMaxNumberOfCharactersSize(maxNumberOfCharacters.toString().length + 1)
        generate()
    }, [])

    useEffect(() => {
        generate()
    }, [name, numberOfNames, maxNumberOfCharacters])

    const numberOfNamesChangeHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number.parseInt(e.target.value)
        const correctValue = Number.isNaN(inputValue) ? DEFAULT_NUMBER_OF_NAMES_VALUE : inputValue
        setNumberOfNames(correctValue)
        setNumberOfNamesSize(correctValue.toString().length + 1)
    }

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!/^[A-Za-z]*$/.test(e.target.value)) return
        setName(e.target.value)
        setNameSize(e.target.value.length + 1)
    }

    const nameLengthChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number.parseInt(e.target.value)
        const correctValue = Number.isNaN(inputValue) ? DEFAULT_NUMBER_OF_CHARACTERS_VALUE : inputValue
        setMaxNumberOfCharacters(correctValue)
        setMaxNumberOfCharactersSize(correctValue.toString().length + 1)
    }

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        generate()
    }

    const generate = () => {
        const workerURL = new URL('../workers/generateNames.ts', import.meta.url)
        const worker = new Worker(workerURL, { type: 'classic' })

        worker.onmessage = (e) => {
            const names = e.data as Array<string>
            startTransition(() => {
                setNames(names)
            })
        }

        const data = {
            numberOfNames: numberOfNames,
            startingName: name,
            minNumberOfCharacters: 3,
            maxNumberOfCharacters: maxNumberOfCharacters,
        }

        worker.postMessage(data)
    }

    return (
        <div className={classes(styles.useTransitionPage, className)} {...otherProps}>
            <form onSubmit={(e) => formSubmitHandler(e)} className={styles.form}>
                <span className={styles.inputs}>
                    <span>Genera</span>
                    <input
                        value={numberOfNames}
                        onChange={(e) => numberOfNamesChangeHadler(e)}
                        size={numberOfNamesSize}
                        type="number"
                        min={1}
                        step={1}
                    />
                    <span>parole contenenti</span>
                    <input
                        value={name}
                        onChange={(e) => nameChangeHandler(e)}
                        size={nameSize}
                        pattern="[A-Za-z]+"
                        maxLength={10}
                    />
                    <span>e lunghe massimo</span>
                    <input
                        value={maxNumberOfCharacters}
                        onChange={(e) => nameLengthChangeHandler(e)}
                        size={maxNumberOfCharactersSize}
                        type="number"
                        min={3}
                        max={10}
                        step={1}
                    />
                    <span>caratteri.</span>
                </span>
                <Button className={styles.submit} type="submit">
                    <IconOK className={styles.icon} />
                    Rigenera
                </Button>
            </form>
            <div className={styles.names}>
                {/* {isPending && <div>Generating...</div>} */}
                {names.map((n, index) => {
                    return (
                        <button className={styles.name} key={index} onClick={() => navigator.clipboard.writeText(n)}>
                            <span className={styles.firstPart}>{name}</span>
                            <span className={styles.secondPart}>{n.substring(name.length, n.length)}</span>
                            <span className={styles.copied}>Copiato!</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default UseTransitionPage
