// import { process } from 'NodeJS.Process'

const FIREBASE_URL = import.meta.env.VITE_FIREBASE_URL
const MEETUPS = 'meetups.json'

// export const loadID = (): number => {
//     let id = 0

//     const query = localStorage.getItem(DataKeys.NEXT_ID)
//     if (query) {
//         id = JSON.parse(query)
//     }

//     return id
// }

// export const saveID = (id: number) => {
//     localStorage.setItem(DataKeys.NEXT_ID, JSON.stringify(id))
// }

// export const loadMeetups = (): Array<Meetup> => {
//     return meetups
// }

// export const loadMockMeetups = () => {
//     localStorage.setItem(DataKeys.MEETUPS, JSON.stringify(meetupsMockData))
//     saveID(meetupsMockData.length)
//     return meetupsMockData
// }

// export const firebase_addMeetup = (meetup: Meetup): string => {
//     fetch(FIREBASE_URL + MEETUPS, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(meetup),
//     }).then((response) => {
//         const data = response.json()
//         console.log(data)
//         return response.json()
//     })
// }

// export const firebase_updateMeetup = (meetup: Meetup) => {}

// export const firebase_deleteMeetup = (meetup: Meetup) => {}

// export const firebase_getMeetup = (id: string) => {}

// export const firebase_getAllMeetups = (): Array<Meetup> => {
//     const meetups: Array<Meetup> = []
//     fetch(FIREBASE_URL + MEETUPS).then((response) => {
//         const data = response.json()
//         console.log(data)
//         return data
//     })
//     return meetups
// }
