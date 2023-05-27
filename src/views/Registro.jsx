import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();


    const [errores,setErrores] = useState([])
    const{registro} = useAuth({middleware: 'guest', url:'/'})

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            name:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            password_confirmation:passwordConfirmationRef.current.value
        }
        registro(datos,setErrores)
        
       
        
    }


    return (
        <>

            <h1 className=" text-4xl font-black">Crea Tu Cuenta</h1>
            <p>Crea Tu Cuenta llenando el Formulario</p>


            <div className=" bg-slate-100 shadow-md rounded-md mt-10 px-5 py-10">

                <form
                
                  onSubmit={handleSubmit}
                  noValidate 
                
                >
                    {errores ? errores.map((error,i) => <Alerta key={i}>{error}</Alerta>) : null}
                    

                    <div className=" mb-4">
                        <label
                            className=" text-slate-800"
                            htmlFor="name"
                        >Nombre:</label>

                        <input
                            type="text"
                            id="name"
                            className=" mt-2 w-full p-3 bg-gray-50"
                            name="name"
                            placeholder="Tu Nombre"
                            ref={nameRef}
                        />
                        {/* ------------------------------------------ */}
                        <label
                            className=" text-slate-800"
                            htmlFor="email"
                        > Correo:</label>

                        <input
                            type="email"
                            id="email"
                            className=" mt-2 w-full p-3 bg-gray-50"
                            name="email"
                            placeholder="Tu Correo"
                            ref={emailRef}
                        />
                        {/* ------------------------------------------ */}
                        <label
                            className=" text-slate-800"
                            htmlFor="password"
                        > Password:</label>

                        <input
                            type="password"
                            id="password"
                            className=" mt-2 w-full p-3 bg-gray-50"
                            name="password"
                            placeholder="Tu Contrasena"
                            ref={passwordRef}
                        />
                        {/* ------------------------------------------ */}
                        <label
                            className=" text-slate-800"
                            htmlFor="password_confirmation"
                        >Repetir Password:</label>

                        <input
                            type="password"
                            id="password_confirmation"
                            className=" mt-2 w-full p-3 bg-gray-50"
                            name="password_confirmation"
                            placeholder="Tu Contrasena"
                            ref={passwordConfirmationRef}
                        />
                        {/* ------------------------------------------ */}



                    </div>


                    <input
                        type="submit"
                        value="Crear Cuenta"
                        className="
                     bg-indigo-600 hover:bg-indigo-800
                     text-white w-full mt-5 p-4 
                     cursor-pointer uppercase
                     font-bold
                     
                     "

                    />
                </form>

            </div>

            <nav className=" mt-5">

                <Link to="/auth/login">
                    Ya Tienes Cuenta? Inicia Sesion
                </Link>

            </nav>

        </>

    )
}
