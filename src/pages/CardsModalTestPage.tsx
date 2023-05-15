import Button from '@components/button/Button'
import Card from '@components/card/Card'
import { ModalContext } from '@context/ModalContext'
import IconOK from '@icons/IconOK'
import { FC, HTMLAttributes, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import classes from '../utils/classes'
import multiplyComponent from '../utils/mutiplyComponent'
import styles from './CardsModalTestPage.module.css'

const CardsModalTestPage: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { children, className, ...otherProps } = props
    const { showModal, hideModal } = useContext(ModalContext)

    const card = (
        <Card title="Prova">
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero eos, voluptas eius cum fuga facilis
                laudantium. Dignissimos, provident dolorum ipsum odio similique enim facilis mollitia obcaecati ab
                fugiat itaque necessitatibus?
            </p>
            <Button
                onClick={() =>
                    showModal(
                        <>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque perferendis, earum
                                quaerat culpa repellendus, voluptatem soluta, maxime at veritatis temporibus ex in
                                nostrum repellat! Deserunt dolore consequuntur hic culpa maiores.
                            </p>
                            <Button onClick={() => hideModal()} className={styles.viewButton}>
                                <IconOK style={{ width: '2rem', height: '2rem', fill: 'var(--grape-0)' }} />
                                OK
                            </Button>
                        </>,
                        'Titolo di prova'
                    )
                }
                className={styles.viewButton}
            >
                <IconOK style={{ width: '2rem', height: '2rem', fill: 'var(--grape-0)' }} />
                View
            </Button>
        </Card>
    )

    return (
        <div className={classes(styles.canvasTestPage, className)} {...otherProps}>
            <Helmet>
                <title>Test Card \ Modal</title>
            </Helmet>
            <div className={styles.cardsContainer}>{multiplyComponent(card, 10)}</div>
        </div>
    )
}

export default CardsModalTestPage
