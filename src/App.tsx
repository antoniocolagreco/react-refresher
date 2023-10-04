import RoutePaths from '@constants/RoutePaths'
import CardsModalTestPage from '@pages/CardsModalTestPage'
import ErrorPage from '@pages/ErrorPage'
import FavouritesPage from '@pages/FavouritesPage'
import MeetupsPage from '@pages/MeetupsPage'
import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DefaultPageLayout from './components/Layout/DefaultPageLayout'
import MeetupsPageLayout from './components/Layout/MeetupsPageLayout'
import PagelessLayout from './components/Layout/PagelessLayout'
import CanvasTestPage from './pages/CanvasTestPage'
import ColorsSchemePage from './pages/ColorsSchemePage'
import UseReducerPage from './pages/UseReducerPage'
import UseTransitionPage from './pages/UseTransitionPage'

type AppProps = {}

const App: FC<AppProps> = (props) => {
    return (
        <Routes {...props}>
            <Route path={RoutePaths.HOME}>
                <Route index element={<Navigate to={RoutePaths.MEETUPS} replace />} />
                <Route element={<MeetupsPageLayout />}>
                    <Route path={RoutePaths.MEETUPS} element={<MeetupsPage />} />
                </Route>
                <Route element={<DefaultPageLayout />}>
                    <Route path={RoutePaths.FAVORITES} element={<FavouritesPage />} />
                    <Route path={RoutePaths.CARD_MODAL_TEST} element={<CardsModalTestPage />} />
                    <Route path={RoutePaths.USE_TRANSITION} element={<UseTransitionPage />} />
                    <Route path={RoutePaths.USE_REDUCER} element={<UseReducerPage />} />
                    <Route path={RoutePaths.CANVAS_TEST} element={<CanvasTestPage />} />
                    <Route path={RoutePaths.COLORS_SCHEME} element={<ColorsSchemePage />} />
                </Route>
                <Route element={<PagelessLayout />}>
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
