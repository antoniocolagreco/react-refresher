import Button from '@components/button/Button'
import IconClose from '@icons/IconClose'
import IconDelete from '@icons/IconDelete'
import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import { Meetup } from '../../types/types'
import styles from './Form.module.css'

type DeleteMeetupFormProps = {
    meetup: Meetup
    onSubmit: ((id: string) => void) | (() => void)
    onCancel: () => void
}

const DeleteMeetupForm: FC<Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> & DeleteMeetupFormProps> = (props) => {
    const { meetup, className, onSubmit, onCancel, ...otherProps } = props

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(meetup.id)
    }

    const cancelHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onCancel()
    }

    return (
        <form className={classes(styles.meetupForm, className)} onSubmit={(e) => submitHandler(e)} {...otherProps}>
            <p>
                Do you want to delete <b className={styles.questionBold}>{`${meetup.title}`}</b>?
            </p>
            <div className={styles.buttonsContainer}>
                <Button type="button" onClick={onCancel}>
                    <IconClose className={styles.icon} />
                    Cancel
                </Button>
                <Button type="submit" onClick={(e) => cancelHandler(e)}>
                    <IconDelete className={styles.icon} />
                    Delete
                </Button>
            </div>
        </form>
    )
}

export default DeleteMeetupForm
