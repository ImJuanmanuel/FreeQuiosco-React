import useSWR from 'swr'
import useQuiosco from '../hooks/useQuiosco'
import clienteAxios from '../config/axios'
import { useState } from 'react';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { formatearDinero } from '../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCoffee, faCircleNotch, faCircleUser} from '@fortawesome/free-solid-svg-icons';


export default function Ordenes() {

  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().slice(0, 10));


  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = (url) =>
    clienteAxios(`${url}?estado=0&fecha=${fechaSeleccionada}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


  const { data, error, isLoading } = useSWR('/api/pedidos', fetcher, { refreshInterval: 1000 })
  const { handleClickCompletarPedido } = useQuiosco()


  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><FontAwesomeIcon icon={faSpinner} spin size="6x" /></div>

  if (error) return <p>Error al cargar las ordenes completas</p>
  /* console.log(data.data.data) */
  const handleFechaSeleccionada = (event) => {
    setFechaSeleccionada(event.target.value);
  }
  return (
    <div>
      <h1 className=' text-4xl font-black'>Ordenes a Realizar</h1>
      <p className='text-2xl my-10'>

        Desde esta seccion vas a administrar las ordenes

      </p>

      <div className='m-10 flex items-center'>
        <label htmlFor='fecha' className='mr-5 font-bold text-xl text-gray-800'>Seleccionar Fecha:</label>
        <input
          className='border border-gray-300 rounded-lg py-2 px-4 bg-white text-gray-800 font-bold outline-none shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
          type='date'
          id='fecha'
          name='fecha'
          value={fechaSeleccionada}
          onChange={handleFechaSeleccionada}
        />

      </div>

      <div className=' grid grid-cols-2 gap-6 '>
        {data.data.data.map(pedido => (
          <div key={pedido.id} className="p-5 bg-white shadow space-y-2 border-b" >

            <p className='text-xl font-bold text-slate-600'>
              Contenido del Pedido {pedido.id}:

            </p>

            {pedido.productos.map(producto => (
              <div
                key={producto.id}
                className='border-b border-b-slate-200 last-of-type:border-none py-4 '
              >

                <p className='text-sm font-bold'>ID: <span>{producto.id}</span></p>
                <p className='font-bold'>{producto.nombre}</p>
                <p className='font-bold'>
                  Cantidad: {``}
                  <span className='font-bold'>{producto.pivot.cantidad}</span>
                </p>

              </div>
            ))}

            <p className='text-lg font-bold text-slate-600'>
              Cliente: {''}
              <span className='font-bold text-amber-400'>{pedido.user.name}</span>
            </p>

            <p className='text-lg font-bold text-slate-600'>
              Fecha: {''}
              <span className='font-bold text-2xl text-amber-400'>
                {new Date(pedido.created_at).toLocaleString('es-MX', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            </p>

            <p className='text-lg font-bold text-amber-600'>
              Total a Pagar: {''}
              <span className='font-bold text-slate-600 '>{formatearDinero(pedido.total)}</span>
            </p>

            <button
              type="button"
              className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer '
              onClick={() => {
                Swal.fire({
                  title: 'Completar Orden',
                  text: `¿Está seguro que desea completar el pedido o orden numero: ${pedido.id} del cliente ${pedido.user.name}?`,
                  icon: 'success',
                  showCancelButton: true,
                  confirmButtonColor: '#12CB00',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Sí, Completar',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleClickCompletarPedido(pedido.id)

                  }
                })
              }}





            >Completar</button>

          </div>
        ))}
      </div>

    </div>
  )
}
