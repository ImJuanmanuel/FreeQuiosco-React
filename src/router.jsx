import { createBrowserRouter} from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import Layout from './layouts/Layout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Ordenes from './views/Ordenes'
import OrdenesCompletas from './views/OrdenesCompletas'
import ProductosAgregar from './views/ProductosAgregar'
import ProductosDelete from './views/ProductosDelete'
import ProductosEditar from './views/ProductosEditar'
import Registro from './views/Registro'
import StockProductos from './views/StockProductos'



const router = createBrowserRouter([
    {
        path: '/',
        element: < Layout />,
        children: [
            {
                index: true,
                element: <Inicio/>
            }
        ]
    },
    {
        path: '/auth',
        element: < AuthLayout />,
        children: [
            {
                path:'/auth/login',
                element: <Login/>
            },
            {
                path:'/auth/registro',
                element: <Registro/>
            }
            
            
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <Ordenes/>
            },
            {
                path:'/admin/productosdelete',
                element:<ProductosDelete/>
            },
            {
                path:'/admin/productosagregar',
                element:<ProductosAgregar/>
            },
            {
                path:'/admin/productoseditar',
                element:<ProductosEditar/>
            },
            {
                path:'/admin/ordenescompletas',
                element:<OrdenesCompletas/>
            },
            {
                path:'/admin/stockproductos',
                element:<StockProductos/>
            }
        ]
    }
])

export default router