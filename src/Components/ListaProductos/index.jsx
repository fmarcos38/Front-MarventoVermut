import { useContext, useEffect, useState } from 'react'
import productImage from '../../assets/vermuts-productos-marvento.png'
import { AppContext } from '../../Context/AppContext'
import { formatProductPrice, getProductos } from '../../Data/productos'
import './styles.css'

const ListaProductos = () => {
  const { addToCart } = useContext(AppContext)
  const [productos, setProductos] = useState(() => getProductos().filter((producto) => producto.activo !== false))
  const [addedProductId, setAddedProductId] = useState('')

  useEffect(() => {
    const syncProductos = () => {
      setProductos(getProductos().filter((producto) => producto.activo !== false))
    }

    window.addEventListener('productosChanged', syncProductos)
    window.addEventListener('storage', syncProductos)

    return () => {
      window.removeEventListener('productosChanged', syncProductos)
      window.removeEventListener('storage', syncProductos)
    }
  }, [])

  const handleAddToCart = (producto) => {
    if (producto.stock <= 0) {
      return
    }

    addToCart({
      id: producto.id,
      nombre: producto.nombre,
      tipo: producto.tipo,
      precio: formatProductPrice(producto.precioUnitario),
      precioUnitario: producto.precioUnitario,
      color: producto.color,
      stock: producto.stock,
      image: productImage,
    })
    setAddedProductId(producto.id)
    window.setTimeout(() => setAddedProductId(''), 1200)
  }

  return (
    <section className="product-list">
      <div className="product-list__items">
        {productos.map((producto, index) => (
          <article className={`product-card product-card--${producto.color}`} key={producto.id}>
            <div className="product-card__content">
              <div className="product-card__number">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <span className="product-card__type">{producto.tipo}</span>
                <h2>{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
              </div>

              <ul className="product-card__notes">
                {(producto.notas || []).map((nota) => (
                  <li key={nota}>{nota}</li>
                ))}
              </ul>

              <div className="product-card__footer">
                <div>
                  <strong>{formatProductPrice(producto.precioUnitario)}</strong>
                  <span className="product-card__stock">
                    {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(producto)}
                  disabled={producto.stock <= 0}
                >
                  {producto.stock <= 0 ? 'Sin stock' : addedProductId === producto.id ? 'Agregado' : 'Agregar'}
                </button>
              </div>
            </div>

            <div className="product-card__visual" aria-hidden="true">
              <img src={productImage} alt="" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ListaProductos
