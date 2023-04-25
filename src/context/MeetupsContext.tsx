import { FC, ReactNode, createContext, useState } from 'react'
import { loadMeetups, loadMockMeetups, saveID, saveMeetups } from '../data/localStorage'
import { Meetup } from '../types/types'

export interface MeetupsContextInterface {
    meetups: Array<Meetup>
    addMeetup: (meetup: Meetup) => void
    updateMeetup: (meetup: Meetup) => void
    deleteMeetup: (id: number) => void
    resetMeetups: () => void
}

const defaultMeetupsContext: MeetupsContextInterface = {
    meetups: [],
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

    const addMeetup = (meetup: Meetup) => {
        const newMeetups = [...meetups, meetup]
        setMeetups(newMeetups)
        saveID(meetup.id)
        saveMeetups(newMeetups)
    }

    const updateMeetup = (meetupToUpdate: Meetup) => {
        const newMeetups = [...meetups.filter((meetup: Meetup) => meetup.id !== meetupToUpdate.id), meetupToUpdate]
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
        <MeetupsContext.Provider value={{ meetups, addMeetup, deleteMeetup, updateMeetup, resetMeetups }}>
            {props.children}
        </MeetupsContext.Provider>
    )
}

export default MeetupsContextProvider
