import classes from '@utils/classes'
import { FC, HTMLAttributes, useState } from 'react'
import IconClose from '../../icons/IconClose'
import IconOK from '../../icons/IconOK'
import { Meetup } from '../../types/types'
import Button from '../Button'
import DatePicker from '../DatePicker'
import styles from './Form.module.css'

type EditMeetupFormProps = {
    meetup: Meetup
    onSubmit: ((meetup: Meetup) => void) | (() => void)
    onCancel: () => void
}

const EditMeetupForm: FC<Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> & EditMeetupFormProps> = (props) => {
    const { meetup, className, onSubmit, onCancel, ...otherProps } = props
    const [currentMeetup, setCurrentMeetup] = useState({ ...meetup })

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setCurrentMeetup((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const dateChangeHandler = (date: Date | null) => {
        if (!date) return
        setCurrentMeetup((prevState) => ({
            ...prevState,
            date: date,
        }))
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(currentMeetup)
    }

    const cancelHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onCancel()
    }

    return (
        <form className={classes(styles.meetupForm, className)} onSubmit={(e) => submitHandler(e)} {...otherProps}>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id" value={currentMeetup.id} disabled />
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={currentMeetup.title}
                onChange={(e) => inputChangeHandler(e)}
            />
            <label htmlFor="image">Image url:</label>
            <input
                type="text"
                id="image"
                name="image"
                value={currentMeetup.image}
                onChange={(e) => inputChangeHandler(e)}
            />
            <label htmlFor="date">Date:</label>
            <DatePicker id="date" name="date" value={currentMeetup.date} onChange={dateChangeHandler} />
            <label htmlFor="address">Address:</label>
            <input
                type="text"
                id="address"
                name="address"
                value={currentMeetup.address}
                onChange={(e) => inputChangeHandler(e)}
            />
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                name="description"
                value={currentMeetup.description}
                onChange={(e) => inputChangeHandler(e)}
            />
            <div className={styles.buttonsContainer}>
                <Button type="button" className={styles.button} onClick={(e) => cancelHandler(e)}>
                    <IconClose className={styles.icon} />
                    Cancel
                </Button>
                <Button className={styles.button} type="submit">
                    <IconOK className={styles.icon} />
                    Save
                </Button>
            </div>
        </form>
    )
}

export default EditMeetupForm
