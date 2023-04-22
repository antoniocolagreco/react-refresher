import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import PageLayout from './components/PageLayout/PageLayout'
import CardsModalTestPage from './pages/CardsModalTestPage'
import FavouritesPage from './pages/FavouritesPage'
import MeetupsPage from './pages/MeetupsPage'
import NewMeetupPage from './pages/NewMeetupPage'

type AppProps = {}

const App: FC<AppProps> = (props) => {
    return (
        <Routes {...props}>
            <Route path="/" element={<PageLayout />}>
                <Route path="favorites" element={<FavouritesPage />} />
                <Route path="new-meetup" element={<NewMeetupPage />} />
                <Route path="card-modal-test" element={<CardsModalTestPage />} />
                <Route index element={<MeetupsPage />} />
            </Route>
        </Routes>
    )
}

export default App
