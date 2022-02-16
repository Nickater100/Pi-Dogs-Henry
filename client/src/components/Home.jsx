import React from "react";
import { Link } from "react-router-dom";
import Perro from "../Assets/Dogi.png";
import "./Home.css"

export default function Home(){
    return (
        <div className= "fondo-home">
            <div className= "div-container-home">
                <div className= "foto-perrito-container">
                    <img className= "foto-perrito-home" src= {Perro} alt = "img not found"></img>
                </div>

            <div className="Contenedor-Titulo-home">
               <div className="Titulo-home">
                   <p className="titulo">All about dogs</p>
               </div>
               <div className="Contenedor-Subtitulo-Home">
                   <p className="subtitulo">Aqui encontraras toda la informacion sobre perritos</p>
                   <Link to= "/buscar"><button className="boton-home">ver mas</button></Link>
               </div>
            </div>
         </div>
      </div>
        
        
    )
}

