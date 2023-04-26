import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageLayout from './components/Layout/PageLayout'
import RoutePaths from './constants/RoutePaths'
import CardsModalTestPage from './pages/CardsModalTestPage'
import ErrorPage from './pages/ErrorPage'
import FavouritesPage from './pages/FavouritesPage'
import MeetupsPage from './pages/MeetupsPage'

type AppProps = {}

const App: FC<AppProps> = (props) => {
    return (
        <Routes {...props}>
            <Route path={RoutePaths.HOME} element={<PageLayout />} errorElement={<ErrorPage />}>
                <Route index element={<Navigate to={RoutePaths.MEETUPS} replace />} />
                <Route path={RoutePaths.MEETUPS} element={<MeetupsPage />} />
                <Route path={RoutePaths.FAVORITES} element={<FavouritesPage />} />
                <Route path={RoutePaths.CARD_MODAL_TEST} element={<CardsModalTestPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default App
