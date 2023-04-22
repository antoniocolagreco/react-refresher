import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import PageLayout from './components/PageLayout/PageLayout'
import RoutePaths from './constants/RoutePaths'
import CardsModalTestPage from './pages/CardsModalTestPage'
import ErrorPage from './pages/ErrorPage'
import FavouritesPage from './pages/FavouritesPage'
import MeetupsPage from './pages/MeetupsPage'
import NewMeetupPage from './pages/NewMeetupPage'

type AppProps = {}

const App: FC<AppProps> = (props) => {
    return (
        <Routes {...props}>
            <Route path={RoutePaths.HOME} element={<PageLayout />} errorElement={<ErrorPage />}>
                <Route index element={<MeetupsPage />} />
                <Route path={RoutePaths.MEETUPS} element={<MeetupsPage />} />
                <Route path={RoutePaths.FAVORITES} element={<FavouritesPage />} />
                <Route path={RoutePaths.CARD_MODAL_TEST} element={<CardsModalTestPage />} />
                <Route path={RoutePaths.NEW_MEETUP} element={<NewMeetupPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default App
