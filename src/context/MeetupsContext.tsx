import { FC, ReactNode, createContext, useEffect, useState } from 'react'

import { fb_addMeetup, fb_deleteMeeup, fb_getAllMeetups, fb_resetMeetups, fb_updateMeetup } from '../data/firebase'
import { Meetup } from '../types/Meetup'

export interface MeetupsContextInterface {
    meetups: Array<Meetup>
    getNewMeetup: () => Meetup
    addMeetup: (meetup: Meetup) => void
    updateMeetup: (meetup: Meetup) => void
    deleteMeetup: (meetup: Meetup) => void
    resetMeetups: () => void
}

const defaultMeetupsContext: MeetupsContextInterface = {
    meetups: [],
    getNewMeetup: () => ({
        id: '',
        title: '',
        image: '',
        date: new Date(),
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
    const [meetups, setMeetups] = useState<Array<Meetup>>([])

    useEffect(() => {
        ;(async () => {
            const newMeetups = await fb_getAllMeetups()
            setMeetups(newMeetups)
        })()
    }, [])

    const getNewMeetup = (): Meetup => ({
        id: '',
        title: '',
        image: '',
        date: new Date(),
        address: '',
        description: '',
        favorite: false,
    })

    const addMeetup = async (meetup: Meetup) => {
        const newMeetups = await fb_addMeetup(meetups, meetup)
        setMeetups(newMeetups)
    }

    const updateMeetup = async (meetup: Meetup) => {
        const newMeetups = await fb_updateMeetup(meetups, meetup)
        setMeetups(newMeetups)
    }

    const deleteMeetup = async (meetup: Meetup) => {
        const newMeetups = await fb_deleteMeeup(meetups, meetup)
        setMeetups(newMeetups)
    }

    const resetMeetups = async () => {
        const newMeetupso = await fb_resetMeetups()
        setMeetups(newMeetupso)
    }

    return (
        <MeetupsContext.Provider value={{ meetups, addMeetup, deleteMeetup, updateMeetup, resetMeetups, getNewMeetup }}>
            {props.children}
        </MeetupsContext.Provider>
    )
}

export default MeetupsContextProvider
