import "./DogCard.css"
import React from "react";

export default function DogCard({name, img, temperaments, weight}) {
     return(
         <div className="todo">
             <h3 className={"subTitle"}>{name}</h3>
             <img className={"dogImage"} src={img} alt="img not found"/>
             <h5 className={"temperament"}>Sus temperamentos son: {temperaments}</h5>
             <h5 className={"peso"}>Su peso varia entre {weight} kg</h5>
         </div>
     )    
 }