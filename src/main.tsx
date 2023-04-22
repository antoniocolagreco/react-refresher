import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ModalContextProvider from './context/ModalContext.tsx'
import './index.css'

// const router = createBrowserRouter([{ path: '/', element: <PageLayout /> }])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <HelmetProvider>
                <ModalContextProvider>
                    <App />
                </ModalContextProvider>
            </HelmetProvider>
        </BrowserRouter>
    </React.StrictMode>
)
