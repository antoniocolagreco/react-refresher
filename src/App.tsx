import RoutePaths from '@constants/RoutePaths'
import CardsModalTestPage from '@pages/CardsModalTestPage'
import ErrorPage from '@pages/ErrorPage'
import FavouritesPage from '@pages/FavouritesPage'
import MeetupsPage from '@pages/MeetupsPage'
import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MeetupsPageLayout from './components/layout/MeetupsPageLayout'
import MoreHooksPageLayout from './components/layout/MoreHooksPageLayout'
import UseMemoPage from './pages/UseMemoPage'

type AppProps = {}

const App: FC<AppProps> = (props) => {
    return (
        <Routes {...props}>
            <Route path={RoutePaths.HOME}>
                <Route index element={<Navigate to={RoutePaths.MEETUPS} replace />} />
                <Route element={<MeetupsPageLayout />}>
                    <Route path={RoutePaths.MEETUPS} element={<MeetupsPage />} />
                </Route>
                <Route element={<MeetupsPageLayout />}>
                    <Route path={RoutePaths.FAVORITES} element={<FavouritesPage />} />
                    <Route path={RoutePaths.CARD_MODAL_TEST} element={<CardsModalTestPage />} />
                </Route>
                <Route path={RoutePaths.MORE_HOOKS} element={<MoreHooksPageLayout />}>
                    <Route index element={<Navigate to={RoutePaths.USE_MEMO} replace />} />
                    <Route path={RoutePaths.USE_MEMO} element={<UseMemoPage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default App
