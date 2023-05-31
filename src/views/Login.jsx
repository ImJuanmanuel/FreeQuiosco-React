import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth'; 
import Spinner from '../components/Spinner';

export default function Login() {

    const emailRef = createRef();
    const passwordRef = createRef();
    

    const [cargando, setcargando] = useState(false)
    const [errores, setErrores] = useState([])
    const { login } = useAuth({
        middleware: 'guest',
        url: '/'
    })

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setcargando(true)
        login(datos,setErrores,setcargando)
        



    }

    return (
        <>

            <h1 className=" text-4xl font-black">Iniciar Sesion</h1>
            <p>Para Crear un Pedido debes Iniciar Tu Sesion</p>


            <div className=" bg-slate-100 shadow-md rounded-md mt-10 px-5 py-10">

                <form
                    onSubmit={handleSubmit}
                    noValidate
                
                >
                    {errores ? errores.map((error,i) => <Alerta key={i}>{error}</Alerta>) : null}

                    <div className=" mb-4">

                        <label
                            className=" text-slate-800"
                            htmlFor="email"
                        > Correo:</label>

                        <input
                            type="email"
                            id="email"
                            className=" mt-2 w-full p-3 bg-gray-50 outline-none"
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
                            className=" mt-2 w-full p-3 bg-gray-50 outline-none"
                            name="password"
                            placeholder="Tu Contrasena"
                            ref={passwordRef}
                        />
                        {/* ------------------------------------------ */}




                    </div>


                    <input
                        type="submit"
                        value="Iniciar Sesion"
                        className="
                     bg-indigo-600 hover:bg-indigo-800
                     text-white w-full mt-5 p-4 
                     cursor-pointer uppercase
                     font-bold
                     "

                    />
                    {cargando? <Spinner/>:null}
                </form>

            </div>

            <nav className=" mt-5">
                <Link to="/auth/registro">

                    No tienes Cuenta? Crea Una

                </Link>
            </nav>

        </>
    )
}
