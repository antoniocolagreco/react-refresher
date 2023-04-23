import { Helmet } from 'react-helmet-async'

import { FC, Fragment, useContext } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import { ModalContext } from '../context/ModalContext'
import IconOK from '../icons/IconOK'
import multiplyComponent from '../utils/mutiplyComponent'
import styles from './CardsModalTestPage.module.css'

type CardsModalTestPageProps = {}

const CardsModalTestPage: FC<CardsModalTestPageProps> = (props) => {
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
                            <Button onClick={() => hideModal()}>
                                <IconOK style={{ width: '2rem', height: '2rem', fill: 'var(--color-grape-0)' }} />
                                OK
                            </Button>
                        </>,
                        'Titolo di prova'
                    )
                }
            >
                <IconOK style={{ width: '2rem', height: '2rem', fill: 'var(--color-grape-0)' }} />
                View
            </Button>
        </Card>
    )

    return (
        <Fragment {...props}>
            <Helmet>
                <title>Pagina di Prova per React!</title>
            </Helmet>
            <div className={styles.cardsContainer}>{multiplyComponent(card, 10)}</div>
        </Fragment>
    )
}

export default CardsModalTestPage
