import meetupsMockData from '../mock/meetupsMockData'
import { Meetup } from '../types/types'

const enum KEYS {
    DELETED_IDS = 'deletedIDs',
    NEXT_ID = 'nextID',
    MEETUPS = 'meetups',
}

export const loadID = (): number => {
    let id = 0

    const query = localStorage.getItem(KEYS.NEXT_ID)
    if (query) {
        id = JSON.parse(query)
    }

    return id
}

export const saveID = (id: number) => {
    localStorage.setItem(KEYS.NEXT_ID, JSON.stringify(id))
}

export const loadMeetups = (): Array<Meetup> => {
    let meetups: Array<Meetup> = []
    const iDquery = localStorage.getItem(KEYS.NEXT_ID)
    const meetupsQuery = localStorage.getItem(KEYS.MEETUPS)
    if (!iDquery && !meetupsQuery) {
        saveMeetups(meetupsMockData)
        saveID(meetupsMockData.length)
        meetups = meetupsMockData
    }
    if (meetupsQuery) {
        const parsedMeetups: Array<Meetup> = JSON.parse(meetupsQuery)
        for (let meetup of parsedMeetups) {
            meetups.push({ ...meetup, date: new Date(meetup.date) })
        }
    }
    return meetups
}

export const loadMockMeetups = () => {
    localStorage.setItem(KEYS.MEETUPS, JSON.stringify(meetupsMockData))
    saveID(meetupsMockData.length)
    return meetupsMockData
}

export const saveMeetups = (meetups: Array<Meetup>) => {
    localStorage.setItem(KEYS.MEETUPS, JSON.stringify(meetups))
}
