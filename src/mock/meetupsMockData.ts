import { Meetup } from '../types/Meetup'

const meetupsMockData: Array<Partial<Meetup>> = [
    {
        title: 'React Meetup',
        image: 'https://picsum.photos/id/1000/640/360',
        address: '123 Main St, New York, NY',
        description: 'In questo meetup discuteremo delle ultime novità di React.',
        date: new Date('2023-06-24T17:00:00'),
        favorite: false,
    },
    {
        title: 'JavaScript Conference',
        image: 'https://picsum.photos/id/1001/640/360',
        address: '456 5th Ave, San Francisco, CA',
        description: 'Una conferenza su JavaScript per gli sviluppatori di tutti i livelli.',
        date: new Date('2023-07-15T10:30:00'),
        favorite: false,
    },
    {
        title: 'Vue.js Workshop',
        image: 'https://picsum.photos/id/1002/640/360',
        address: '789 Maple St, Toronto, ON',
        description: 'Un workshop intensivo su Vue.js, con esercizi pratici.',
        date: new Date('2023-08-02T14:15:00'),
        favorite: false,
    },
    {
        title: 'Node.js Meetup',
        image: 'https://picsum.photos/id/1003/640/360',
        address: '234 Oak St, Seattle, WA',
        description: 'In questo meetup discuteremo delle ultime novità di Node.js.',
        date: new Date('2023-09-19T19:00:00'),
        favorite: false,
    },
    {
        title: 'Angular Conference',
        image: 'https://picsum.photos/id/1004/640/360',
        address: '567 Pine St, Chicago, IL',
        description: 'Una conferenza su Angular per gli sviluppatori di tutti i livelli.',
        date: new Date('2023-09-19T19:00:00'),
        favorite: false,
    },
    {
        title: 'Web Design Workshop',
        image: 'https://picsum.photos/id/1005/640/360',
        address: '901 Elm St, Boston, MA',
        description: 'Un workshop sul web design, con esempi pratici.',
        date: new Date('2023-11-28T18:30:00'),
        favorite: false,
    },
    {
        title: 'React Native Meetup',
        image: 'https://picsum.photos/id/1006/640/360',
        address: '345 Maple St, Miami, FL',
        description: 'In questo meetup discuteremo delle ultime novità di React Native.',
        date: new Date('2023-12-20T12:00:00'),
        favorite: false,
    },
    {
        title: 'UX Design Conference',
        image: 'https://picsum.photos/id/1011/640/360',
        address: '678 Oak St, Los Angeles, CA',
        description: "Una conferenza sull'UX design per gli sviluppatori di tutti i livelli.",
        date: new Date('2023-12-20T12:00:00'),
        favorite: false,
    },
    {
        title: 'JavaScript Meetup',
        image: 'https://picsum.photos/id/1008/640/360',
        address: '910 Pine St, Vancouver, BC',
        description: 'In questo meetup discuteremo delle ultime novità di JavaScript.',
        date: new Date('2024-02-27T11:00:00'),
        favorite: false,
    },
    {
        title: 'Frontend Development Workshop',
        image: 'https://picsum.photos/id/1009/640/360',
        address: '123 Elm St, Austin, TX',
        description: 'Un workshop sul frontend development, con esempi pratici.',
        date: new Date('2024-03-18T14:30:00'),
        favorite: false,
    },
]

export default meetupsMockData
