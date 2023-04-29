export type Meetup = {
    id: string
    title: string
    image: string
    date: Date
    address: string
    description: string
    favorite: boolean
}

export type FirebaseMeetupData = {
    [key: string]: Meetup
}

export type FirebaseNewMeetupResponseID = {
    name: string
}
