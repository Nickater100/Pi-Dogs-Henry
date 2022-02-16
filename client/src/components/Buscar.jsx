import SearchBar from "./SearchBar";
import DogCard from "./DogCard";
import Paginado from "./Paginado";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getAllRazas, getRaza, getTemperamentos, filtroTemp } from "../actions/index";
import { NavLink } from "react-router-dom";
import "./Buscar.css"



function Buscar(){
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperamento);
  const [peso, setPeso] = useState("")
  const [orderAlfabet, setOrderAlfabet] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPorPag] = useState(8);
  
 

 function handlefilterTemp(e){
     dispatch(filtroTemp(e.target.value))
 }

 function handlefilterName(e){
     dispatch(getRaza(e.target.value))
 }

  useEffect(()=>{
     dispatch(getAllRazas())
     dispatch(getTemperamentos())
  }, [dispatch])
  
  const SelectedPeso = (e) => {
      if (e.target.value === "liviano-pesado"){
          dispatch({
              type: "ordenar-liviano-pesado",
          });
      }
      else if (e.target.value === "pesado-liviano"){
          dispatch({
              type:"ordenar-pesado-liviano",
          });
      }
      setPeso(e.target.value)
  }

  const alfabetSelectedChange = (e) => {
    if(e.target.value === "asc-desc") {
        dispatch({
            type: "ordenar-asc-desc"
        })
    }
    else if (e.target.value === "desc-asc") {
        dispatch ({
            type: "ordenar-desc-asc"
        })
    }
    setOrderAlfabet(e.target.value)
}

  const indexDelUltimoItem = currentPage * itemsPorPag;
  const indexDelPrimerItem = indexDelUltimoItem - itemsPorPag;
  const currentDogs = dogs.slice(indexDelPrimerItem, indexDelUltimoItem)
  const paginado = (numPage)=>{
      setCurrentPage(numPage)
  }

  return(
      <div className="fondo-buscar">
          <div>
              <div>
                  <SearchBar/> 
                  <div>
                      <Link to="/dog-add"><button className="boton-agregar-perro">Agregar nueva raza</button></Link>
                  </div>
              </div>
              <div className="container-todos-select">
                  <div className="select-container">
                      <p className="p-select">Ordenar por peso:</p>
                      <select value={peso} onChange={(e)=>SelectedPeso(e)}>
                          <option value="liviano-pesado">De liviano a pesado</option>
                          <option value="pesado-liviano">De pesado a liviano</option>
                      </select>
                  </div>
                  <div className="select-container">
                      <p className="p-select">Ordenar alfabeticamente:</p>
                      <select value={orderAlfabet} onChange={(e)=> alfabetSelectedChange(e)}>
                          <option value="asc-desc">"A" to "Z"</option>
                          <option value="desc-asc">"Z" to "A"</option>
                      </select>
                  </div>
                  <div className="select-container">
                      <p className="p-select">Filtrar por temperamento:</p>
                      <select onChange={(e)=> handlefilterTemp(e)}>
                          <option value={""}>Seleccionar filtro</option>
                          {temperaments && temperaments.map((el)=>(
                              <option value={el.name}>{el.name}</option>
                          ))}
                      </select>
                  </div>
                  <div className="select-container">
                      <p className="p-select">Filtrar por raza:</p>
                      <select onChange={(e)=> handlefilterName(e) }>
                          <option value={""}>Seleccionar filtro</option>
                          {dogs && dogs.map((el)=>(
                              <option value={el.name}>{el.name}</option>
                          ))}
                      </select>
                  </div>
              </div>
              <div className="paginas">
              <Paginado
                dogsPerPage= {itemsPorPag}
                allDogs= {dogs.length}
                paginado= {paginado}
                />
                </div>
                <div className={"dogCards"}>
               <ul className={"dogsGrid"}> {currentDogs?.map( el =>{
             
              return (
              <div className={"margin"}> <NavLink className={"navlink"} to={`/home/${el.id}`} > <DogCard  img={el.image.url }
                name={el.name} temperaments={!el.createInDb ? el.temperament : el.Temperaments.map(e=>e.name + " ") } weight={el.weight.imperial}key={el.id} />
                   </NavLink></div>  )
                })}
                </ul>
            </div>
        </div>
     </div>
      
  )
}

export default Buscar;