import historiaImage from '../../assets/marvento-historia.jpg'
import './styles.css'

function Historia() {
    return (
        <section className="historia-page">
            <div className="historia-page__text">
                <div className="historia-page__content">
                    <h1>Casa Talina</h1>

                    <p>
                        <strong>CASA TALINA</strong> es el proyecto que da origen a <strong>MARVENTO</strong> y a una
                        colecci&oacute;n de marcas inspiradas en la tradici&oacute;n mediterr&aacute;nea,
                        reinterpretadas desde la costa atl&aacute;ntica argentina. M&aacute;s que desarrollar
                        productos, construye historias donde el origen, la cultura y el paisaje forman parte de
                        una misma identidad.
                    </p>

                    <p>
                        Cada propuesta nace de un proceso de investigaci&oacute;n y desarrollo que combina herencia,
                        calidad y una mirada contempor&aacute;nea. Un universo donde cada marca tiene su propia
                        personalidad, pero comparte un mismo esp&iacute;ritu: crear productos con identidad, pensados
                        para perdurar y ser compartidos.
                    </p>
                </div>
            </div>

            <div className="historia-page__image">
                <img src={historiaImage} alt="Escena Marvento vinculada a la historia de Casa Talina" />
            </div>
        </section>
    )
}

export default Historia
