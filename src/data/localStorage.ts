// import meetupsMockData from '../mock/meetupsMockData'
// import { Meetup } from '../types/types'

// const enum KEYS {
//     DELETED_IDS = 'deletedIDs',
//     LAST_ID = 'lastID',
//     MEETUPS = 'meetups',
// }

// export const ls_addMeetup = (inputArray: Array<Meetup>, meetup: Meetup): Array<Meetup> => {
//     const meetupsArray = [...inputArray]
//     try {
//         const newMeetup = { ...meetup }
//         let id = '0'
//         const query = localStorage.getItem(KEYS.LAST_ID)
//         if (query) {
//             id = JSON.parse(query)
//         }
//         const lastID = (Number.parseInt(id) + 1).toString()
//         newMeetup.id = lastID
//         localStorage.setItem(KEYS.LAST_ID, lastID)
//         meetupsArray.push(newMeetup)
//         localStorage.setItem(KEYS.MEETUPS, JSON.stringify(meetupsArray))
//     } catch (error) {
//         console.error((error as Error).message)
//     }
//     return meetupsArray
// }

// export const ls_updateMeetup = (inputArray: Array<Meetup>, meetupToUpdate: Meetup): Array<Meetup> => {
//     const meetupsArray = [...inputArray]
//     try {
//         const meetupToReplace = meetupsArray.find((meetup) => meetup.id === meetupToUpdate.id)
//         if (!meetupToReplace) throw new Error('Meetup not found')
//         const meetupToUpdateIndex = meetupsArray.indexOf(meetupToReplace)
//         if (meetupToUpdateIndex < 0) throw new Error('Meetup index not found')
//         meetupsArray.splice(meetupToUpdateIndex, 1, meetupToUpdate)
//         localStorage.setItem(KEYS.MEETUPS, JSON.stringify(meetupsArray))
//     } catch (error) {
//         console.error((error as Error).message)
//     }
//     return meetupsArray
// }

// export const ls_deleteMeeup = (inputArray: Array<Meetup>, meetupToDelete: Meetup): Array<Meetup> => {
//     const meetupsArray = inputArray.filter((currentMeetup) => currentMeetup.id !== meetupToDelete.id)
//     try {
//         localStorage.setItem(KEYS.MEETUPS, JSON.stringify(meetupsArray))
//     } catch (error) {
//         console.error((error as Error).message)
//     }
//     return meetupsArray
// }

// export const ls_getAllMeeups = (): Array<Meetup> => {
//     try {
//         const iDquery = localStorage.getItem(KEYS.LAST_ID)
//         const meetupsQuery = localStorage.getItem(KEYS.MEETUPS)
//         if (meetupsQuery && iDquery) {
//             const parsedMeetups: Array<Meetup> = JSON.parse(meetupsQuery)
//             return parsedMeetups.map((meetup) => {
//                 return { ...meetup, date: new Date(meetup.date) }
//             })
//         }
//     } catch (error) {
//         console.error((error as Error).message)
//     }
//     return ls_resetMeeups()
// }

// export const ls_resetMeeups = (): Array<Meetup> => {
//     try {
//         localStorage.setItem(KEYS.MEETUPS, JSON.stringify(meetupsMockData))
//         localStorage.setItem(KEYS.LAST_ID, JSON.stringify(meetupsMockData.length))
//     } catch (error) {
//         console.error((error as Error).message)
//     }
//     return meetupsMockData
// }
