import { useContext, useState } from 'react'
import { Link } from 'react-router'
import { AppContext } from '../../Context/AppContext'
import MenuHamburguesa from '../MenuHamburguesa'
import './style.css'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Historia', href: '/historia' },
  { label: 'Productos', href: '/productos' },
  { label: 'Puntos de venta', href: '/contacto' },
  { label: 'Casa Talina', href: '/quienes-somos' },
  { label: 'Contacto', href: '/contacto' },
]

const adminLinks = [
  { label: 'Informes', href: '/admin/informes' },
  { label: 'Pedidos', href: '/admin/pedidos' },
  { label: 'Productos', href: '/admin/productos' },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { userLog } = useContext(AppContext)
  const puedeAdministrar = userLog?.roles?.some((rol) => ['ADMIN', 'EMPLEADO'].includes(rol))

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="navbar">
        <div className="navbar__top">
          <Link className="navbar__brand" to="/" onClick={closeMenu}>
            Marvento<span aria-hidden="true">{'\u00ae'}</span>
          </Link>
        </div>

        <div className="navbar__bar">
          <nav className={`navbar__nav ${isMenuOpen ? 'navbar__nav--open' : ''}`}>
            {navLinks.map((link) => (
              <Link className="navbar__link" to={link.href} key={`${link.label}-${link.href}`} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}

            {puedeAdministrar && (
              <div className="navbar__admin">
                <span className="navbar__admin-label">Admin</span>
                <div className="navbar__admin-menu">
                  {adminLinks.map((link) => (
                    <Link className="navbar__admin-link" to={link.href} key={link.href} onClick={closeMenu}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          <div className="navbar__actions">
            <MenuHamburguesa isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
