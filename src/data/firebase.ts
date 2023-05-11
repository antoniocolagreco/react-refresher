import meetupsMockData from '@mock/meetupsMockData'
import { Meetup } from '../types/Meetup'

const VITE_FIREBASE_DATABASE_URL: string = import.meta.env.VITE_FIREBASE_DATABASE_URL
const MEETUPS = 'meetups'

export const fb_addMeetup = async (inputArray: Array<Meetup>, meetup: Meetup): Promise<Array<Meetup>> => {
    const meetupsArray = [...inputArray]
    try {
        const response = await fetch(`${VITE_FIREBASE_DATABASE_URL}${MEETUPS}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meetup),
        })
        if (!response.ok) {
            throw new Error('Network error')
        }
        const data = await (response.json() as Promise<Record<string, Meetup>>)
        const newMeetup = { ...meetup, id: Object.keys(data)[0] }
        meetupsArray.push(newMeetup)
    } catch (error) {
        console.error((error as Error).message)
    }
    return meetupsArray
}

export const fb_updateMeetup = async (inputArray: Array<Meetup>, meetupToUpdate: Meetup): Promise<Array<Meetup>> => {
    const meetupsArray = [...inputArray]
    try {
        const meetupToReplace = meetupsArray.find((meetup) => meetup.id === meetupToUpdate.id)
        if (!meetupToReplace) throw new Error('Meetup not found')
        const meetupToUpdateIndex = meetupsArray.indexOf(meetupToReplace)
        if (meetupToUpdateIndex < 0) throw new Error('Meetup index not found')
        meetupsArray.splice(meetupToUpdateIndex, 1, meetupToUpdate)

        const response = await fetch(`${VITE_FIREBASE_DATABASE_URL}${MEETUPS}/${meetupToUpdate.id}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meetupToUpdate),
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
    } catch (error) {
        console.error((error as Error).message)
    }
    return meetupsArray
}

export const fb_deleteMeeup = async (inputArray: Array<Meetup>, meetupToDelete: Meetup): Promise<Array<Meetup>> => {
    const meetupsArray = inputArray.filter((currentMeetup) => currentMeetup.id !== meetupToDelete.id)
    try {
        const response = await fetch(`${VITE_FIREBASE_DATABASE_URL}${MEETUPS}/${meetupToDelete.id}.json`, {
            method: 'DELETE',
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
    } catch (error) {
        console.error((error as Error).message)
    }
    return meetupsArray
}

export const fb_getAllMeetups = async (): Promise<Array<Meetup>> => {
    try {
        const response = await fetch(`${VITE_FIREBASE_DATABASE_URL}${MEETUPS}.json`, {
            method: 'GET',
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await (response.json() as Promise<Record<string, Meetup>>)
        const meetups = Object.entries(data).map(([id, meetup]) => ({
            ...meetup,
            date: new Date(meetup.date),
            id,
        }))
        return meetups
    } catch (error) {
        console.error((error as Error).message)
        return fb_resetMeetups()
    }
}

export const fb_resetMeetups = async (): Promise<Array<Meetup>> => {
    const newMeetups: Array<Meetup> = []
    try {
        const response = await fetch(`${VITE_FIREBASE_DATABASE_URL}${MEETUPS}.json`, {
            method: 'DELETE',
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const promises = meetupsMockData.map(async (meetup) => {
            const response = await fetch(`${VITE_FIREBASE_DATABASE_URL}${MEETUPS}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meetup),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await (response.json() as Promise<{ name: string }>)
            const newMeetup = { ...meetup, id: data.name } as Meetup
            newMeetups.push(newMeetup)
        })
        await Promise.all(promises)
    } catch (error) {
        console.error((error as Error).message)
        throw error
    }
    return newMeetups
}
