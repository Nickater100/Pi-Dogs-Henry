import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRazas, getRaza, getTemperamentos, filtroTemp, postDogs } from "../actions/index";
import "./AgregarDog.css"



function AgregarPerro() {
const dispatch = useDispatch();
const temperaments = useSelector((state) => state.temperamento);
const [perroNuevo, setPerroNuevo] = useState({name: "", height: "", weight: "", life_span: ""});
const [temperamentoUltimo, setTemperamentoUltimo] = useState({});
const [creatingTemperament, setCreatingTemperament] = useState(false);
const [temperamentoNuevo, setTemperamentoNuevo] = useState("");

const nuevo = perroNuevo.body;

useEffect(()=>{
    dispatch(getTemperamentos())
 }, [dispatch])

const selectedChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerroNuevo({...perroNuevo, [name]:value})
    console.log({...perroNuevo, [name]:value})
}

const selectedChangeTemperament = (e) => {
    let {id, value} = e.target
    setTemperamentoUltimo({...temperamentoUltimo, [id]: value})
    console.log({...temperamentoUltimo, [id]: value })
}

const AgregarNuevoPerro = (dog) => {
    let temperamentsId = Object.keys(temperamentoUltimo)
    axios.post(`http://localhost:3001/dog-add`, {perroNuevo, temperamentsId})
        .then((res) => {
           console.log(res)          
           alert("Perro creado")
        })
        .catch((error) => {
            console.log(error)
            alert("No se pudo crear el perro")
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
}

useEffect(() => {
    axios.get(`http://localhost:3001/temperament`)
    .then((res) => {
        dispatch ({
            type: "TEMPERAMENTOS",
            payload: res.data
        })
    })
    .catch((error) => {
    console.log(error);
});        
}, [])

return (
    <div className= "fondo-dog-detail">
        <div className= "container-amarilloo">
                <form className= "agregarPerro" onSubmit={handleSubmit}>
                    <div className= "container-desc-img">
                        <div className= "container-img">
                            {/* <input className="img-subir" type="file" name="file"/> */}
                        </div>
                        <div className="descripcion-perro">
                            <p className="nombre"> Nombre:
                                <input className="input"
                                    name= "name"
                                    value={perroNuevo.name} 
                                    onChange={selectedChange} 
                                    placeholder="nombre"/>
                            </p>
                            <div>
                            <div className="temperamentos">
                            <p>Temperamentos:</p> 
                                          {temperaments && temperaments.map((el) => (  
                                                <div className="temperamentos2">
                                                    <input 
                                                        type="checkbox" 
                                                        name="temperament" 
                                                        value={el.name}
                                                        id={el.id}
                                                        onChange={selectedChangeTemperament}/>
                                                    <label for="temperament">{el.name}</label>
                                                </div>
                                            ))}                                                  
                                        </div>                                                                     
                                    <p> 
                                Altura:
                                    <input 
                                        name="height"
                                        value={perroNuevo.height} 
                                        onChange={selectedChange} 
                                        placeholder="altura"/> cm.
                                </p>
                                <p> Peso:
                                    <input 
                                        name="weight"
                                        value={perroNuevo.weight} 
                                        onChange={selectedChange} 
                                        placeholder="peso"/> kg.
                                </p>
                                <p> Años de vida:
                                    <input 
                                        name="life_span"
                                        value={perroNuevo.life_span} 
                                        onChange={selectedChange} 
                                        placeholder="años de vida"/>
                                </p>
                            </div>
                            <div>
                                <button className= "boton-agregar-perroo" onClick={AgregarNuevoPerro}>Agregar perro</button>
                            </div>
                        </div>                                           
                    </div>
                </form>
        </div>
    </div>
)
}

export default AgregarPerro;
