export const PRODUCTOS_STORAGE_KEY = 'marventoProductos'

export const defaultProductos = [
  {
    id: 'rojo',
    nombre: 'Marvento Rojo',
    tipo: 'Vermut rosso',
    descripcion:
      'Intenso, especiado y botanico. Pensado para servir con hielo, piel de naranja y soda.',
    notas: ['Ajenjo', 'Cascara citrica', 'Hierbas tostadas'],
    precioUnitario: 10,
    stock: 24,
    color: 'red',
    activo: true,
  },
  {
    id: 'bianco',
    nombre: 'Marvento Bianco',
    tipo: 'Vermut blanco seco',
    descripcion:
      'Fresco, herbal y elegante. Ideal para aperitivos largos, tonica y rodaja de limon.',
    notas: ['Flores blancas', 'Citrus', 'Salvia'],
    precioUnitario: 10,
    stock: 24,
    color: 'white',
    activo: true,
  },
]

export const formatProductPrice = (value) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

export const getProductos = () => {
  try {
    const storedProducts = JSON.parse(localStorage.getItem(PRODUCTOS_STORAGE_KEY) || 'null')
    return Array.isArray(storedProducts) ? storedProducts : defaultProductos
  } catch {
    return defaultProductos
  }
}

export const saveProductos = (productos) => {
  localStorage.setItem(PRODUCTOS_STORAGE_KEY, JSON.stringify(productos))
  window.dispatchEvent(new CustomEvent('productosChanged', { detail: productos }))
}

export const createProductId = (nombre) => {
  const baseId = String(nombre || 'producto')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return `${baseId || 'producto'}-${Date.now()}`
}
