import { FC, HTMLAttributes } from 'react'

const IconClose: FC<HTMLAttributes<SVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32" {...props}>
            <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
        </svg>
    )
}

export default IconClose
