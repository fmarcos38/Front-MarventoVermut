import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productImage from '../../assets/vermuts-productos-marvento.png'
import { AppContext } from '../../Context/AppContext'
import { formatProductPrice } from '../../Helpers/productos'
import { getProductos } from '../../Redux/Actions'
import './styles.css'

const ListaProductos = () => {
  const { addToCart } = useContext(AppContext)
  const dispatch = useDispatch()
  const productos = useSelector((state) => state.app.productos)
  const [addedProductId, setAddedProductId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProductos = async () => {
      try {
        setError('')
        await dispatch(getProductos())
      } catch (requestError) {
        setError(requestError.message || 'No se pudieron cargar los productos')
      } finally {
        setIsLoading(false)
      }
    }

    loadProductos()
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
      {isLoading && <div className="product-list__state">Cargando productos...</div>}
      {error && <div className="product-list__state product-list__state--error">{error}</div>}
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
