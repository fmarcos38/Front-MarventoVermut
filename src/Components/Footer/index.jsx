import './style.css'

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <section className="footer__column footer__location" aria-label="Casa Talina">
          <h2>Casa Talina<span aria-hidden="true">{'\u00ae'}</span></h2>
          <p>
            Bolivar 6171, Mar del Plata
            <br />
            Buenos Aires, Argentina
          </p>
          <div className="footer__rule" />
          <a href="tel:+5492234553310">Contacto: +54 9 2234553310</a>
        </section>

        <section className="footer__column footer__social" aria-label="Redes sociales">
          <a href="https://www.instagram.com/marventovermut/" target="_blank" rel="noreferrer">
            <span className="footer__icon">IG</span>
            @marventovermut
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <span className="footer__icon">f</span>
            marventovermut
          </a>
          <a href="https://www.instagram.com/casatalina/" target="_blank" rel="noreferrer">
            <span className="footer__icon">IG</span>
            @casatalina
          </a>
          <a href="https://wa.me/5492234553310" target="_blank" rel="noreferrer">
            <span className="footer__icon">WA</span>
            +54 9 2234553310
          </a>
        </section>

        <section className="footer__column footer__payments" aria-label="Medios de pago">
          <p>
            Todos los medios de pago
            <br />
            Compra segura
          </p>
          <div className="footer__rule" />
          <a href="mailto:info@marvento.com.ar">info@marvento.com.ar</a>
        </section>
      </div>

      <div className="footer__brand" aria-hidden="true">
        Marvento
      </div>
    </footer>
  )
}

export default Footer
