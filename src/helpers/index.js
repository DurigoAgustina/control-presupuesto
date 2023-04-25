
export const generarId = () => {
  const randomId = Math.random().toString(36).substring(2);
  const fecha = Date.now().toString(36)
  return randomId + fecha;
}

export const formatearFecha = fecha => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }

  return fechaNueva.toLocaleDateString('es-AR', opciones)
}