import { FC, ReactNode, createContext, useState } from 'react'
import Modal from '../components/Modal'

export interface ModalContextInterface {
    showModal: (content: ReactNode, title?: string) => void
    hideModal: () => void
}

export const ModalContext = createContext<ModalContextInterface>({
    showModal: () => {},
    hideModal: () => {},
})

export type ModalContextProviderProps = {
    children: ReactNode
}

const ModalContextProvider: FC<ModalContextProviderProps> = (props) => {
    const { children, ...otherProps } = props
    const [visible, setVisible] = useState(false)
    const [content, setContent] = useState<ReactNode>(undefined)
    const [title, setTitle] = useState<string | undefined>(undefined)

    const hideModal = () => {
        setVisible(false)
    }
    const showModal = (content: ReactNode, title?: string) => {
        setContent(content)
        setTitle(title)
        setVisible(true)
    }

    return (
        <ModalContext.Provider value={{ showModal, hideModal }} {...otherProps}>
            {children}
            <Modal title={title} visible={visible}>
                {content}
            </Modal>
        </ModalContext.Provider>
    )
}

export default ModalContextProvider
