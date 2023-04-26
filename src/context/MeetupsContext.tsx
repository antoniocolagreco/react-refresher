import { FC, ReactNode, createContext, useState } from 'react'
import { loadID, loadMeetups, loadMockMeetups, saveID, saveMeetups } from '../data/localStorage'
import { Meetup } from '../types/types'

export interface MeetupsContextInterface {
    meetups: Array<Meetup>
    getNewMeetup: () => Meetup
    addMeetup: (meetup: Meetup) => void
    updateMeetup: (meetup: Meetup) => void
    deleteMeetup: (id: number) => void
    resetMeetups: () => void
}

const defaultMeetupsContext: MeetupsContextInterface = {
    meetups: [],
    getNewMeetup: () => ({
        id: loadID(),
        title: '',
        image: '',
        date: '',
        address: '',
        description: '',
        favorite: false,
    }),
    addMeetup: () => {},
    updateMeetup: () => {},
    deleteMeetup: () => {},
    resetMeetups: () => {},
}

export const MeetupsContext = createContext<MeetupsContextInterface>(defaultMeetupsContext)

export type MeetupsProviderProps = {
    children: ReactNode
}

const MeetupsContextProvider: FC<MeetupsProviderProps> = (props) => {
    const [meetups, setMeetups] = useState(loadMeetups())

    const getNewMeetup = (): Meetup => ({
        id: loadID() + 1,
        title: '',
        image: '',
        date: '',
        address: '',
        description: '',
        favorite: false,
    })

    const addMeetup = (meetup: Meetup) => {
        const newMeetups = [...meetups, meetup]
        setMeetups(newMeetups)
        saveID(meetup.id)
        saveMeetups(newMeetups)
    }

    const updateMeetup = (newMeetup: Meetup) => {
        const newMeetups = [...meetups]
        const meetupToReplace = newMeetups.find((m) => m.id === newMeetup.id)
        if (meetupToReplace === undefined) return
        const indexOfmeetupToReplace = newMeetups.indexOf(meetupToReplace)
        newMeetups.splice(indexOfmeetupToReplace, 1, newMeetup)
        setMeetups(newMeetups)
        saveMeetups(newMeetups)
    }

    const deleteMeetup = (id: number) => {
        const newMeetups = meetups.filter((meetup) => meetup.id !== id)
        setMeetups(newMeetups)
        saveMeetups(newMeetups)
    }

    const resetMeetups = () => {
        const newMeetups = loadMockMeetups()
        setMeetups(newMeetups)
    }

    return (
        <MeetupsContext.Provider value={{ meetups, addMeetup, deleteMeetup, updateMeetup, resetMeetups, getNewMeetup }}>
            {props.children}
        </MeetupsContext.Provider>
    )
}

export default MeetupsContextProvider
