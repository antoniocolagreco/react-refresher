import { FC, HTMLAttributes } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import CardsModalTestPage from './pages/CardsModalTestPage'
import FavouritesPage from './pages/FavouritesPage'
import MeetupsPage from './pages/MeetupsPage'
import NewMeetupPage from './pages/NewMeetupPage'
import classes from './utils/classes'

type AppProps = {}

const App: FC<AppProps> = (props) => {
    return (
        <Routes>
            <Route path="/" element={<PageContainer />}>
                <Route path="favorites" element={<FavouritesPage />} />
                <Route path="new-meetup" element={<NewMeetupPage />} />
                <Route path="card-modal-test" element={<CardsModalTestPage />} />
                <Route index element={<MeetupsPage />} />
            </Route>
        </Routes>
    )
}

type PageContainerProps = {}

const PageContainer: FC<HTMLAttributes<HTMLDivElement & PageContainerProps>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.pageContainer, className)} {...otherProps}>
            <Outlet />
        </div>
    )
}

export default App
