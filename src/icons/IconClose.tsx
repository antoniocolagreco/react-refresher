import { FC, HTMLAttributes } from 'react'

const IconClose: FC<HTMLAttributes<SVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" {...props}>
            <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
        </svg>
    )
}

export default IconClose
