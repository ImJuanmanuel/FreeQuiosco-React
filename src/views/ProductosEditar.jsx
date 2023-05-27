import { useState } from 'react'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import Producto from '../components/Producto'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCoffee, faCircleNotch, faCircleUser} from '@fortawesome/free-solid-svg-icons';

export default function Productos() {

  const token = localStorage.getItem('AUTH_TOKEN')

  const fetcher = () =>
    clienteAxios('/api/productos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((datos) => datos.data)

  const { data, error, isLoading } = useSWR('/api/productos', fetcher, { refreshInterval: 1000 })

  const [searchTerm, setSearchTerm] = useState('')



  const filteredData = data?.data.filter((producto) => {
    return producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  })

  if (isLoading) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><FontAwesomeIcon icon={faSpinner} spin size="6x" /></div>

  if (error) return `Error al cargar los productos: ${error.message}`

  return (
    <div>
      <h1 className='text-4xl font-black'>Productos</h1>
      <p className='text-2xl my-10'>
        Maneja la disponibilidad desde aquí.
      </p>



      <div className=' grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
        {filteredData.map((producto) => (
          <Producto key={producto.imagen} producto={producto} botonEditar={true} />
        ))}
      </div>
    </div>
  )
}
