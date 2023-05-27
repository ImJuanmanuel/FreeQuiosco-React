import React, { useState } from 'react'
import clienteAxios from '../config/axios'
import axios from 'axios'

export default function ProductosAgregar() {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [imagen, setImagen] = useState('')
  const [disponible, setDisponible] = useState('')
  const [stock, setStock] = useState('')
  const [categoria_id, setCategoria] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await clienteAxios('/api/productos', {
        nombre,
        precio,
        imagen,
        disponible,
        stock,
        categoria_id
      });
  
      console.log('Producto agregado:', response.data);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  }
  
  

  return (
    <div>
      <h1 className='text-4xl font-black'>Agregar Nuevos Productos</h1>
      <p className='text-2xl my-10'>

        Desde esta seccion vas agregar nuevos productos

      </p>
      <form onSubmit={handleSubmit} className='my-20  bg-slate-200 p-10 shadow-md rounded-2xl'>
        <div className='mb-6'>
          <label htmlFor='nombre' className='block mb-2 text-2xl font-bold text-black'>
            Nombre del Producto:
          </label>
          <input
            type='text'
            id='nombre'
            name='nombre'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 outline-none'
            required
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='precio' className='block mb-2 text-2xl font-bold text-black'>
            Precio del Producto:
          </label>
          <input
            type='number'
            id='precio'
            name='precio'
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 outline-none'
            required
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='nombre' className='block mb-2 text-2xl font-bold text-black'>
            Imagen del Producto:
          </label>
          <input
            type='text'
            id='imagen'
            name='imagen'
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 outline-none'
            required
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='precio' className='block mb-2 text-2xl font-bold text-black'>
            Disponible del Producto:
          </label>
          <input
            type='number'
            id='disponible'
            name='disponible'
            value={disponible}
            onChange={(e) => setDisponible(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 outline-none'
            required
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='precio' className='block mb-2 text-2xl font-bold text-black'>
            Stock del Producto:
          </label>
          <input
            type='number'
            id='stock'
            name='stock'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 outline-none'
            required
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='categoria' className='block mb-2 text-2xl font-bold text-black'>
            ID Categoría:
          </label>
          <input
            type='text'
            id='categoria_id'
            name='categoria_id'
            value={categoria_id}
            onChange={(e) => setCategoria(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 outline-none'
            required
          />
        </div>
        
        <div className='text-center'>
          <button
            type='submit'
            className='inline-block w-full px-6 py-4 mt-4  font-bold text-2xl uppercase text-white bg-blue-700  rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
          >
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  )
}