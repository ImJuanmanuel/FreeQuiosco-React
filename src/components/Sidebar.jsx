import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth"



export default function Sidebar() {

  const { categorias } = useQuiosco()
  const{logout,user} = useAuth({middleware: 'auth'})
  return (
    <aside className=" md:w-72 ">
      <div className=" p-4">

        <img
          className='w-40 '
          src="/img/logo.svg"
          alt="imagen logo on"

        />

      </div>

      <p className="my-10 text-2xl font-bold text-center">Hola: {user?.name}</p>

      <div className="mt-10 ">
        {categorias.map(categoria => (
            <Categoria
              key={categoria.id}
              categoria = {categoria}
            />
        ))}
      </div>

      <div className=" m-5 p-5">
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
        onClick={logout}       
        >
          Cerrar Sesion
        </button>
      </div>
    </aside>
  )
}
