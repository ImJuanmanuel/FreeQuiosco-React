import useSWR from 'swr'
import clienteAxios from '../config/axios'
import { formatearDinero } from '../helpers'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCoffee, faCircleNotch, faCircleUser } from '@fortawesome/free-solid-svg-icons';

export default function OrdenesCompletas() {


    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().slice(0, 10));
    const [isLoadingPedidos, setIsLoadingPedidos] = useState(false);

    const token = localStorage.getItem('AUTH_TOKEN');

    const fetcher = (url) =>
        clienteAxios(`${url}?estado=1&fecha=${fechaSeleccionada}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

    const { data, error } = useSWR(`/api/pedidos`, fetcher, { refreshInterval: 1000 });

    if (!data || !data.data || !data.data.data) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <FontAwesomeIcon icon={faSpinner} spin size="6x" />
          </div>
        );
      }

    const handleFechaSeleccionada = async (event) => {
        setIsLoadingPedidos(true);
        setFechaSeleccionada(event.target.value);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setIsLoadingPedidos(false);
    };

    if (isLoadingPedidos) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <FontAwesomeIcon icon={faSpinner} spin size="6x" />
            </div>
        );
    }

    if (error) return <p>Error al cargar las ordenes completas</p>;

    let totalAcumulado = 0;
    data.data.data.forEach(pedido => {
        totalAcumulado += pedido.total;
    });
    return (
        <div>
            <h1 className=' text-4xl font-black'>Ordenes Completadas</h1>
            <p className='text-2xl my-10'>
                Desde esta sección vas a administrar las ordenes completadas.
            </p>

            <div className='m-10'>
                <p className='text-2xl font-bold'>El Total Vendido el dia <span className='text-green-600'>{fechaSeleccionada}:</span> <span className=' font-bold  bg-green-600 text-white p-2 rounded-lg shadow-2xl'>{formatearDinero(totalAcumulado)}</span></p>
            </div>


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
                {data.data.data.map(pedido => {



                    return (
                        <div key={pedido.id} className="p-5 bg-white shadow-2xl space-y-2 rounded-2xl" >
                            <p className='text-xl font-bold text-slate-600'>
                                Contenido del Pedido <span className=' bg-slate-500 rounded-md p-1 text-white'>{pedido.id}:</span>
                            </p>

                            {pedido.productos.map(producto => (
                                <div
                                    key={producto.id}
                                    className='border-b border-b-slate-200 last-of-type:border-none py-4 '
                                >
                                    <p className='text-sm font-bold'>ID: <span className=''>{producto.id}</span> </p>
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
                                        month: 'long',
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

                            {/* <button
                  type="button"
                  className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer'
                  onClick={() => handleClickCompletarPedido(pedido.id)}
                >
                  Completar
                </button> */}

                        </div>
                    )

                })}
            </div>

            {/* Mostrar el total acumulado de todas las ordenes */}


        </div>
    )
}
