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
    onSubmit: (meetup: Meetup) => void
    onCancel: () => void
}

const EditMeetupForm: FC<Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> & EditMeetupFormProps> = (props) => {
    const { meetup, className, onSubmit, onCancel, ...otherProps } = props
    const [title, setTitle] = useState(meetup.title)
    const [image, setImage] = useState(meetup.image)
    const [address, setAddress] = useState(meetup.address)
    const [description, setDescription] = useState(meetup.description)
    const [date, setDate] = useState(meetup.date)

    const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value)
    }

    const addressChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
    }

    const descriptionChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }

    const dateChangeHandler = (date: Date | null) => {
        if (!date) return
        setDate(date)
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newMeetup: Meetup = {
            id: meetup.id,
            title: title,
            image: image,
            address: address,
            date: date,
            description: description,
            favorite: meetup.favorite,
        }
        onSubmit(newMeetup)
    }

    const cancelHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onCancel()
    }

    return (
        <form className={classes(styles.meetupForm, className)} onSubmit={(e) => submitHandler(e)} {...otherProps}>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id" value={meetup.id} disabled />
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={title} onChange={titleChangeHandler} />
            <label htmlFor="image">Image url:</label>
            <input type="text" id="image" name="image" value={image} onChange={imageChangeHandler} />
            <label htmlFor="date">Date:</label>
            <DatePicker id="date" name="date" value={date} onChange={dateChangeHandler} />
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={address} onChange={addressChangeHandler} />
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={description} onChange={descriptionChangeHandler} />
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
