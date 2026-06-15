import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import {
    createProductId,
    formatProductPrice,
    getProductos,
    saveProductos,
} from '../../Data/productos'
import './styles.css'

const emptyForm = {
    id: '',
    nombre: '',
    tipo: '',
    descripcion: '',
    notas: '',
    precioUnitario: '',
    stock: '',
    color: 'red',
    activo: true,
}

const normalizeForm = (formData) => ({
    id: formData.id || createProductId(formData.nombre),
    nombre: String(formData.nombre || '').trim(),
    tipo: String(formData.tipo || '').trim(),
    descripcion: String(formData.descripcion || '').trim(),
    notas: String(formData.notas || '')
        .split(',')
        .map((nota) => nota.trim())
        .filter(Boolean),
    precioUnitario: Number(formData.precioUnitario) || 0,
    stock: Math.max(0, Number(formData.stock) || 0),
    color: formData.color || 'red',
    activo: Boolean(formData.activo),
})

const productToForm = (producto) => ({
    ...producto,
    notas: Array.isArray(producto.notas) ? producto.notas.join(', ') : '',
    precioUnitario: String(producto.precioUnitario ?? ''),
    stock: String(producto.stock ?? ''),
})

const AdminProductos = () => {
    const [productos, setProductos] = useState(() => getProductos())
    const [editingId, setEditingId] = useState('')
    const [formData, setFormData] = useState(emptyForm)
    const [message, setMessage] = useState('')

    const totals = useMemo(() => {
        const activos = productos.filter((producto) => producto.activo !== false)
        const stockTotal = productos.reduce((total, producto) => total + Number(producto.stock || 0), 0)

        return {
            activos: activos.length,
            stockTotal,
            inventario: productos.reduce(
                (total, producto) => total + Number(producto.stock || 0) * Number(producto.precioUnitario || 0),
                0
            ),
        }
    }, [productos])

    useEffect(() => {
        const syncProductos = () => setProductos(getProductos())

        window.addEventListener('productosChanged', syncProductos)
        window.addEventListener('storage', syncProductos)

        return () => {
            window.removeEventListener('productosChanged', syncProductos)
            window.removeEventListener('storage', syncProductos)
        }
    }, [])

    const persistProductos = (nextProductos, successMessage) => {
        setProductos(nextProductos)
        saveProductos(nextProductos)
        setMessage(successMessage)
        window.setTimeout(() => setMessage(''), 1800)
    }

    const startEdit = (producto) => {
        setEditingId(producto.id)
        setFormData(productToForm(producto))
    }

    const startCreate = () => {
        setEditingId('nuevo')
        setFormData(emptyForm)
    }

    const cancelEdit = () => {
        setEditingId('')
        setFormData(emptyForm)
    }

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target

        setFormData((currentData) => ({
            ...currentData,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const producto = normalizeForm(formData)

        if (!producto.nombre || !producto.tipo || !producto.descripcion || producto.precioUnitario <= 0) {
            setMessage('Completa nombre, tipo, descripcion y precio para guardar.')
            return
        }

        const nextProductos = editingId === 'nuevo'
            ? [...productos, producto]
            : productos.map((currentProduct) => (
                currentProduct.id === editingId ? producto : currentProduct
            ))

        persistProductos(nextProductos, editingId === 'nuevo' ? 'Producto creado.' : 'Producto actualizado.')
        cancelEdit()
    }

    const handleDelete = (producto) => {
        const shouldDelete = window.confirm(`Eliminar ${producto.nombre}? Esta accion lo quita del catalogo.`)

        if (!shouldDelete) {
            return
        }

        persistProductos(
            productos.filter((currentProduct) => currentProduct.id !== producto.id),
            'Producto eliminado.'
        )
    }

    const updateStock = (producto, amount) => {
        const nextProductos = productos.map((currentProduct) => {
            if (currentProduct.id !== producto.id) {
                return currentProduct
            }

            return {
                ...currentProduct,
                stock: Math.max(0, Number(currentProduct.stock || 0) + amount),
            }
        })

        persistProductos(nextProductos, 'Stock actualizado.')
    }

    const toggleActivo = (producto) => {
        const nextProductos = productos.map((currentProduct) => (
            currentProduct.id === producto.id
                ? { ...currentProduct, activo: currentProduct.activo === false }
                : currentProduct
        ))

        persistProductos(nextProductos, 'Estado actualizado.')
    }

    return (
        <section className="admin-products">
            <header className="admin-products__header">
                <div>
                    <span>Catalogo</span>
                    <h1>Productos</h1>
                    <p>Edita productos, controla stock y define que vermuts quedan visibles en la tienda.</p>
                </div>
                <div className="admin-products__header-actions">
                    <button type="button" onClick={startCreate}>Nuevo producto</button>
                    <Link to="/productos">Ver tienda</Link>
                </div>
            </header>

            <div className="admin-products__metrics">
                <article>
                    <span>Activos</span>
                    <strong>{totals.activos}</strong>
                </article>
                <article>
                    <span>Unidades</span>
                    <strong>{totals.stockTotal}</strong>
                </article>
                <article>
                    <span>Inventario</span>
                    <strong>{formatProductPrice(totals.inventario)}</strong>
                </article>
            </div>

            {message && <div className="admin-products__message">{message}</div>}

            {editingId && (
                <form className="admin-products__form" onSubmit={handleSubmit}>
                    <div className="admin-products__form-title">
                        <h2>{editingId === 'nuevo' ? 'Nuevo producto' : 'Editar producto'}</h2>
                        <button type="button" onClick={cancelEdit}>Cerrar</button>
                    </div>

                    <label>
                        Nombre
                        <input name="nombre" value={formData.nombre} onChange={handleChange} />
                    </label>
                    <label>
                        Tipo
                        <input name="tipo" value={formData.tipo} onChange={handleChange} />
                    </label>
                    <label>
                        Precio
                        <input type="number" min="0" step="1" name="precioUnitario" value={formData.precioUnitario} onChange={handleChange} />
                    </label>
                    <label>
                        Stock
                        <input type="number" min="0" step="1" name="stock" value={formData.stock} onChange={handleChange} />
                    </label>
                    <label>
                        Color
                        <select name="color" value={formData.color} onChange={handleChange}>
                            <option value="red">Rojo</option>
                            <option value="white">Blanco</option>
                        </select>
                    </label>
                    <label className="admin-products__checkbox">
                        <input type="checkbox" name="activo" checked={formData.activo} onChange={handleChange} />
                        Visible en tienda
                    </label>
                    <label className="admin-products__wide">
                        Notas
                        <input name="notas" value={formData.notas} onChange={handleChange} placeholder="Ajenjo, Citrus, Salvia" />
                    </label>
                    <label className="admin-products__wide">
                        Descripcion
                        <textarea rows="4" name="descripcion" value={formData.descripcion} onChange={handleChange} />
                    </label>

                    <div className="admin-products__form-actions">
                        <button type="button" onClick={cancelEdit}>Cancelar</button>
                        <button type="submit">Guardar producto</button>
                    </div>
                </form>
            )}

            <div className="admin-products__panel">
                <div className="admin-products__table-wrap">
                    <table className="admin-products__table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td>
                                        <strong>{producto.nombre}</strong>
                                        <span>{producto.tipo}</span>
                                    </td>
                                    <td>{formatProductPrice(producto.precioUnitario)}</td>
                                    <td>
                                        <div className="admin-products__stock">
                                            <button type="button" onClick={() => updateStock(producto, -1)} disabled={producto.stock <= 0}>-</button>
                                            <strong>{producto.stock}</strong>
                                            <button type="button" onClick={() => updateStock(producto, 1)}>+</button>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className={`admin-products__status ${producto.activo === false ? 'admin-products__status--off' : ''}`}
                                            onClick={() => toggleActivo(producto)}
                                        >
                                            {producto.activo === false ? 'Oculto' : 'Visible'}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="admin-products__actions">
                                            <button type="button" onClick={() => startEdit(producto)}>Editar</button>
                                            <button type="button" onClick={() => handleDelete(producto)}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default AdminProductos
