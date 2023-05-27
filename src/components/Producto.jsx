import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import axios from "axios"
import { useState } from 'react'
import clienteAxios from "../config/axios"

export default function Producto({ producto, botonAgregar = false, botonDisponible = false, botonEditar = false, botonStock = false }) {

    const { handleClickModal, handleSetProducto, handleClickProductoAgotado, handleClickProductoStock, handleClickProductoUpdate } = useQuiosco()
    const { nombre, precio, imagen, disponible, stock, categoria_id } = producto

    

    const handleEditarProducto = () => {
        
    }

    return (
        <div className="border p-3 shadow bg-white ">

            <img

                src={`/img/${imagen}.jpg`}
                alt={`imagen ${nombre}`}
                className="w-full"

            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5  font-bold text-5xl font-sans  text-amber-500">{formatearDinero(precio)}</p>
            </div>

            {botonAgregar && (
                <button

                    type="button"
                    className=" bg-indigo-600 hover:bg-indigo-900
                 text-white w-full mt-5 p-3 uppercase font-bold
                 border-collapse rounded-xl
            "
                    onClick={() => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}
                >
                    Agregar
                </button>
            )}

            {botonDisponible && (
                <button

                    type="button"
                    className=" bg-red-600 hover:bg-red-800
                 text-white w-full mt-5 p-3 uppercase font-bold
                 border-collapse
            "
                    onClick={() => {
                        Swal.fire({
                            title: 'Eliminar Producto',
                            text: `¿Está seguro que desea eliminar el producto ${nombre}?`,
                            icon: 'error',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, eliminar',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleClickProductoAgotado(producto.id)
                            }
                        })
                    }}
                >
                    Eliminar Producto
                </button>
            )}
            {botonEditar && (
                <button
                    type="button"
                    className=" bg-blue-600 hover:bg-blue-800
                  text-white w-full mt-5 p-3 uppercase font-bold
                    border-collapse
    "
                    onClick={() =>{
                        Swal.fire({
                            title: 'Editar Producto',
                            html:
                                `
                        <div class=" w-full">   
                            <label class="block mb-2">
                              <span class="text-gray-700 font-bold">Nombre:</span>
                              <input type="text" name="nombre" class="form-input mt-1 block w-full outline-none bg-gray-200 text-black p-3 rounded-lg text-2xl font-serif font-bold" value="${producto.nombre}">
                            </label>
                            <label class="block mb-2">
                                <span class="text-gray-700 font-bold">Precio:</span>
                                <input type="text" name="precio" class="form-input mt-1 block w-full outline-none bg-gray-200 text-black p-3 rounded-lg text-2xl font-serif font-bold" value="${formatearDinero(producto.precio)}">
                            </label>
                            <label class="block mb-2">
                              <span class="text-gray-700 font-bold">Imagen:</span>
                              <input type="text" name="imagen" class="form-input mt-1 block w-full outline-none bg-gray-200 text-black p-3 rounded-lg text-2xl font-serif font-bold" value="${producto.imagen}">
                            </label>
                            
                
                            <label class="block mb-2">
                              <span class="text-gray-700 font-bold">Categoria:</span>
                              <input type="number" name="categoria" min="1" max="7", class="form-input mt-1 block w-full outline-none bg-gray-200 text-black p-3 rounded-lg text-2xl font-serif font-bold" value="${producto.categoria_id}">
                            </label>
                
                        </div>      
                          `,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Guardar cambios',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            
                
                            if (result.isConfirmed) {
                                
                                    const newNombre = document.querySelector('input[name="nombre"]').value
                                    const newPrecio = document.querySelector('input[name="precio"]').value
                                    const newImagen = document.querySelector('input[name="imagen"]').value
                                    const newCategoria = document.querySelector('input[name="categoria"]').value
                
                                
                                    handleClickProductoUpdate(producto.id,newNombre,newPrecio,newImagen,newCategoria)
                
                
                               
                                
                                    
                            }
                
                
                
                
                        })
                    }}
                >
                    Editar Producto
                </button>
            )}

            {botonStock && (
                <button

                    type="button"
                    className=" bg-green-600 hover:bg-green-900
                 text-white w-full mt-5 p-3 uppercase font-bold
                 border-collapse
            "
                    onClick={() => {
                        Swal.fire({
                            html:
                            `<label class="block mb-2">
                            <span class="text-gray-700 font-bold">Edita el Stock del Producto: ${producto.nombre}</span>
                            <input type="number" min="0" name="stock" class="form-input mt-1 block w-full outline-none bg-gray-200 text-black p-3 rounded-lg text-2xl font-serif font-bold" value="${producto.stock}">
                            </label>`,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Guardar cambios',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                const newStockValue = document.querySelector('input[name="stock"]').value;
                                handleClickProductoStock(producto.id, newStockValue);
                            }
                        })
                    }}
                >
                    Editar Stock
                </button>
            )}



        </div>
    )
}

