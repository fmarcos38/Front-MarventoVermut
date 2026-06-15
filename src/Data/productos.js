import { URL } from '../Urls'

export const formatProductPrice = (value) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

export const createProductId = (nombre) => {
  const baseId = String(nombre || 'producto')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return baseId || `producto-${Date.now()}`
}

export const getAuthHeaders = () => {
  let userData

  try {
    userData = JSON.parse(localStorage.getItem('userData') || 'null')
  } catch {
    userData = null
  }

  return userData?.token
    ? { Authorization: `Bearer ${userData.token}` }
    : {}
}

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo completar la operacion')
  }

  return data
}

export const fetchProductos = async () => {
  const response = await fetch(`${URL}/productos`)
  const data = await parseResponse(response)
  return data.productos || []
}

export const fetchProductosAdmin = async () => {
  const response = await fetch(`${URL}/productos/admin`, {
    headers: getAuthHeaders(),
  })
  const data = await parseResponse(response)
  return data.productos || []
}

export const createProducto = async (producto) => {
  const response = await fetch(`${URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(producto),
  })
  const data = await parseResponse(response)
  return data.producto
}

export const updateProducto = async (slug, producto) => {
  const response = await fetch(`${URL}/productos/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(producto),
  })
  const data = await parseResponse(response)
  return data.producto
}

export const deleteProducto = async (slug) => {
  const response = await fetch(`${URL}/productos/${slug}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  return parseResponse(response)
}
