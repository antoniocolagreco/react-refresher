import classes from '@utils/classes'
import { FC, HTMLAttributes, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

type ModalProps = {
    title?: string | undefined
    visible?: boolean | undefined
    onOverlayClick?: (() => void) | undefined
}

const Modal: FC<HTMLAttributes<HTMLDivElement> & ModalProps> = (props) => {
    const { children, title, visible = false, onOverlayClick, className, ...otherProps } = props

    const overlayRootRef = useRef(document.getElementById('overlay-root'))
    const bodyRef = useRef(document.getElementById('body'))
    if (overlayRootRef.current === null) return null

    useEffect(() => {
        if (!bodyRef.current) return
        if (visible) {
            bodyRef.current.classList.add(styles.modalOpen)
        }
        return () => {
            if (!bodyRef.current) return
            bodyRef.current.classList.remove(styles.modalOpen)
        }
    }, [visible])

    return createPortal(
        <div className={classes(styles.overlay, visible ? styles.visible : '')} onClick={onOverlayClick}>
            <div className={classes(styles.modal, className)} {...otherProps}>
                {title && (
                    <header className={styles.header}>
                        <h3 className={styles.title}>{props.title}</h3>
                    </header>
                )}
                {children}
            </div>
        </div>,
        overlayRootRef.current
    )
}

export default Modal
