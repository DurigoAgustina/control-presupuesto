import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto, gastos, setGastos}) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
    
    const totalDisponible = presupuesto - totalGastado

    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1200);

    setDisponible(totalDisponible)
    setGastado(totalGastado)
  }, [gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS'
    })
  }

  const handleResetApp = () => {
    const resultado = confirm('¿Desea reiniciar la app?')

    if(resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar value={porcentaje} text={`${porcentaje}%`} styles={buildStyles({pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6', trailColor: '#F5F5F5', textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'})}/>
      </div>
      <div className='contenido-presupuesto'>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible}` < 0 ? 'negativo' : ''}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
        <button className='reset-app' type='button' onClick={handleResetApp}>REINICIAR APP</button>
      </div>
    </div>
  )
}

export default ControlPresupuesto