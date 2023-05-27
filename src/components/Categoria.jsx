import useQuiosco from "../hooks/useQuiosco"

export default function Categoria({ categoria }) {

    const {handleClickCategoria, categoriaActual} = useQuiosco()

    const { icono, id, nombre } = categoria
    return (
        <div className={` ${categoriaActual.id === id ? " bg-amber-400" : " bg-white"} flex items-center gap-4 border w-full p-3
         hover:bg-amber-300 cursor-pointer`}>
            
            <img 
            src={`/img/icono_${icono}.svg`} 
            alt="" 
            className="w-12"
            
            
            />

            <p className="text-2xl font-bold font-sans cursor-pointer truncate"
                type="button"
                onClick={() => handleClickCategoria(id)}
            
            >
                
                {nombre}
                
            </p>

        </div>
    )
}
