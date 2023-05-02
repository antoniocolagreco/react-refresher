import classes from '@utils/classes'
import { FC } from 'react'
import DateTimePicker from 'react-datetime-picker'
import styles from './DatePicker.module.css'
import './DateTimePicker.css'

type DatePickerProps = {
    className?: string
    value?: Date | null
    onChange?: ((value: Date | null) => void) | undefined
    id?: string
    name?: string
}

const DatePicker: FC<DatePickerProps> = (props) => {
    const { name, id, onChange, className, value } = props

    return (
        <DateTimePicker
            className={classes(styles.dateTimePicker, className)}
            value={value}
            onChange={onChange}
            id={id}
            name={name}
        />
    )
}

export default DatePicker
