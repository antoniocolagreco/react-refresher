import { ReactElement, cloneElement } from 'react'

const multiplyComponent = (component: ReactElement, times: number) => {
    const result: ReactElement[] = []
    for (let index = 0; index < times; index++) {
        result.push(cloneElement(component, { key: index }))
    }
    return result
}

export default multiplyComponent
