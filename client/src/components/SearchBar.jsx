import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./SearchBar.css"

function SearchBar(){
 const dispatch = useDispatch();
 const [buscar, setBuscar] = useState("");

 function handleChange(e){
     setBuscar(e.target.value)
 }
 const handleKeyDown = ({keyCode}) => {
     if (keyCode !== 13) return null;
     else{
         axios.get(`http://localhost:3001/dog/${buscar}`)
         .then((res) =>{
             if ( res.data.length === 0) alert("No se encontro el perro")
             else {
                dispatch({
                    type: "DOGS_NAME",
                    payload : res.data,
                 })
             }
         })
         .catch((error)=> {
             console.log(error);
             alert("No se encontro el perro")
         });
  }
 };
  return (
      <div>
          <form onSubmit={(e) => e.preventDefault()}>
              <input 
               className="searchBar"
               placeholder="Buscar perros"
               value={buscar}
               onChange={handleChange}
               onKeyDown={handleKeyDown}>
              </input>

          </form>
      </div>
  )
}

export default SearchBar;