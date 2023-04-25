import { useEffect, useState } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, editarGastos, setEditarGastos}) => {
  
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [id, setId] = useState('')
  const [fecha, setFecha] = useState('')
  
  useEffect(() => {
    if(Object.keys(editarGastos).length > 0){
      setNombre(editarGastos.nombre)
      setCantidad(editarGastos.cantidad)
      setCategoria(editarGastos.categoria)
      setId(editarGastos.id)
      setFecha(editarGastos.fecha)
    }
  }, [])
  

  const ocultarModal = () => {
    setAnimarModal(false)
    setEditarGastos({})

    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if ([nombre, cantidad, categoria].includes('')){
      setMensaje('Todos los campos son obligatorios')

      setTimeout(() => {
        setMensaje(false)
      }, 3000)
      return;
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})
  }


  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={CerrarBtn} alt='Cerrar modal' onClick={ocultarModal} />
      </div>

      <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar': 'cerrar'}`}>
        <legend>{editarGastos.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>

        {
          mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>
        }

        <div className='campo'>
          <label htmlFor='nombre'>Nombre gasto</label>
          <input
            id='nombre'
            type='text'
            value={nombre}
            placeholder='Añade el nombre del gasto'
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input
            id='cantidad'
            type='number'
            value={cantidad}
            placeholder='Añade la cantidad'
            onChange={e => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Categoría</label>
          <select
            id='categoria'
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value=''>--Todas las categorías--</option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos</option>
            <option value='ocio'>Ocio</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>

        <input type='submit' value={editarGastos.nombre ? 'Guardar cambios' : 'Añadir gasto'} />
      </form>
    </div>
  )
}

export default Modal