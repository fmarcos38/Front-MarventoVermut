import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { AppContext } from '../../Context/AppContext'
import MenuHamburguesa from '../MenuHamburguesa'
import marventoLogo from '../../assets/logo_alfa.png'
import './style.css'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Historia', href: '/historia' },
  { label: 'Productos', href: '/productos' },
  { label: 'Puntos de venta', href: '/puntos-de-venta' },
  { label: 'Casa Talina', href: '/casa-talina' },
  { label: 'Contacto', href: '/contacto' },
]

const adminLinks = [
  { label: 'Informes', href: '/admin/informes' },
  { label: 'Pedidos', href: '/admin/pedidos' },
  { label: 'Consultas', href: '/admin/consultas' },
  { label: 'Puntos de venta', href: '/admin/puntos-venta' },
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
            <img src={marventoLogo} alt="Marvento" />
          </Link>
        </div>

        <div className="navbar__bar">
          <nav className={`navbar__nav ${isMenuOpen ? 'navbar__nav--open' : ''}`}>
            {navLinks.map((link) => (
              <NavLink
                className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
                to={link.href}
                end={link.href === '/'}
                key={`${link.label}-${link.href}`}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
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









