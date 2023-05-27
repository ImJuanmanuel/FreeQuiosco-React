import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export default function AdminSidebar() {

    const location = useLocation()

    // Definir la ruta activa
    const activeLink = location.pathname

    const { logout, user } = useAuth({ middleware: 'auth' })

    return (
        <aside className="md:w-72 h-screen">
            <div className="p-4">
                <img
                    src="/img/logo.svg"
                    alt="imagen logotipo"
                    className="w-40"

                />

                <p className=" text-2xl font-bold text-center py-5">Panel De Administracion</p>
                <p className=" text-2xl font-bold text-center">Hola: <span className='text-2xl text-yellow-500 font-bold'>{user?.name}</span></p>

            </div>
            <nav className='flex flex-col p-8'>
                <Link to={"/admin"} className={`p-4 my-1 font-bold text-lg hover:bg-amber-400 ${activeLink === '/admin' ? 'bg-amber-400' : ''}`}>
                    Ordenes
                </Link>
                <Link to={"/admin/productosdelete"} className={`p-4 my-1 font-bold text-lg hover:bg-amber-400 ${activeLink === '/admin/productosdelete' ? 'bg-amber-400' : ''}`}>
                    Elimar Productos
                </Link>
                <Link to={"/admin/productosagregar"} className={`p-4 my-1 font-bold text-lg hover:bg-amber-400 ${activeLink === '/admin/productosagregar' ? 'bg-amber-400' : ''}`}>
                    Agregar Productos
                </Link>
                <Link to={"/admin/productoseditar"} className={`p-4 my-1 font-bold text-lg hover:bg-amber-400 ${activeLink === '/admin/productoseditar' ? 'bg-amber-400' : ''}`}>
                    Modificar Productos
                </Link>
                <Link to={"/admin/ordenescompletas"} className={`p-4 my-1 font-bold text-lg hover:bg-amber-400 ${activeLink === '/admin/ordenescompletas' ? 'bg-amber-400' : ''}`}>
                    Ordenes Completadas
                </Link>
                <Link to={"/admin/stockproductos"} className={`p-4 my-1 font-bold text-lg hover:bg-amber-400 ${activeLink === '/admin/stockproductos' ? 'bg-amber-400' : ''}`}>
                    Stock Productos
                </Link>
            </nav>
            <div className='my-5 px-5'>
                <button
                    type="button"
                    className=" text-center bg-red-600 
          w-full p-3 
          font-extrabold
          text-2xl 
           text-white
           hover:bg-red-500
           transition duration-200 ease-in-out transform hover:scale-110
           rounded-lg
               "
                    onClick={() => {
                        Swal.fire({
                            title: 'Cerrar Sesion',
                            text: `¿Está seguro que desea cerrar la sesion ${user.name}?`,
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Cerrar Sesion',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                logout()
                            }
                        })
                    }}
                >
                    Cerrar Sesion
                </button>
            </div>
        </aside>
    )
}
