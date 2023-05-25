import { FC, HTMLAttributes } from 'react'

const IconBack: FC<HTMLAttributes<SVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" {...props}>
            <path d="M480-160 160-480l320-320 42 42-248 248h526v60H274l248 248-42 42Z" />
        </svg>
    )
}

export default IconBack
