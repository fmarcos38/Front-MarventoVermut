const PuntoDeVentaCard = ({ index, isActive, punto, onActivate, onSelect }) => {
  return (
    <button
      className={`sales-point${isActive ? ' sales-point--active' : ''}`}
      type="button"
      onClick={onSelect}
      onFocus={onActivate}
      onMouseEnter={onActivate}
    >
      <span>{String(index + 1).padStart(2, '0')}</span>
      <strong>{punto.nombre}</strong>
      <small>{punto.direccion}</small>
      <em>{punto.horario}</em>
    </button>
  )
}

export default PuntoDeVentaCard
