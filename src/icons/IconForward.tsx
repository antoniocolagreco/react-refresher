import { FC, HTMLAttributes } from 'react'

const IconForward: FC<HTMLAttributes<SVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" {...props}>
            <path d="m480-160-42-43 247-247H160v-60h525L438-757l42-43 320 320-320 320Z" />
        </svg>
    )
}

export default IconForward
