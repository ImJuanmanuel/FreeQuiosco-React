import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';


const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total,setTotal] = useState(0)

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            
            const {data} = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategorias(data.data)
            setCategoriaActual(data.data[0])

        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])


    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)

    }
    const handleClickModal = () => {
        setModal(!modal)
    }
    
    const handleSetProducto = producto => {
        setProducto(producto)
    }
    const handleAgregarPedido = ({ categoria_id, ...producto }) => {


        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id ===
            producto.id ? producto : pedidoState)

            setPedido(pedidoActualizado)
            toast.success('Actualizado Correctamente')

        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado Correctamente')
        }
    }
    const handleEditarCantidad = id =>{
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id != id)
        setPedido(pedidoActualizado)
        toast.success('Pedido Eliminado Correctamente')
    }
    const handleSubmitNuevaOrden = async () =>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const{data}=await clienteAxios.post('/api/pedidos',
            {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
/*                         nombre: producto.nombre,
 */                      cantidad: producto.cantidad
                    }
                })
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            toast.success(data.message);
            setTimeout(() => {
                setPedido([])
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        

        try {
           await clienteAxios.put(`/api/pedidos/${id}`,null,{
            headers: {
                Authorization: `Bearer ${token}`
            }
           })
           
           
           
        } catch (error) {
            console.log(error)
        }
    }
    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
           await clienteAxios.put(`/api/productos/${id}/agotado`,null,{
            headers: {
                Authorization: `Bearer ${token}`
            }
           }) 
        } catch (error) {
            console.log(error)
        }
    }
    const handleClickProductoUpdate = async (id, newNombre,newPrecio,newImagen,newCategoria) => {
        if (newNombre.trim() === '' || newPrecio.trim() === '' || newImagen.trim() === '' || newCategoria.trim() === '') {
            // mostrar error si algún campo está vacío
            console.log('Por favor, rellene todos los campos.');
            return;
        }
        
        const token = localStorage.getItem('AUTH_TOKEN')
      
        try {
          const response = await clienteAxios.put(`/api/productos/${id}/update`, { nombre: newNombre,precio: newPrecio,imagen: newImagen, categoria: newCategoria }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response && response.data) {
            console.log(response.data);
          } else {
            console.log('La respuesta de la petición es incorrecta.');
          }
          
        } catch (error) {
          console.log(error.response.data);
        }
      }
    const handleClickProductoStock = async (id, newStockValue) => {
        const token = localStorage.getItem('AUTH_TOKEN')
      
        try {
          const response = await clienteAxios.put(`/api/productos/${id}/updatestock`, { stock: newStockValue }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response && response.data) {
            console.log(response.data);
          } else {
            console.log('La respuesta de la petición es incorrecta.');
          }
          
        } catch (error) {
          console.log(error.response.data);
        }
      }
      
      
    
    
    



    return (
        <QuioscoContext.Provider

            value={{

                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado,
                handleClickProductoUpdate,
                handleClickProductoStock
                
            }}

        >{children}</QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext