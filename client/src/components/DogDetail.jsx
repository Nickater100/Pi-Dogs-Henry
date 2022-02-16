import axios from "axios";
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import React from "react";
import "./DogDetail.css"

function DogDetail() {
    const [dogDetails, setDogDetail] = useState({name: "", temperaments: "",height: "", weight: "", life_span: ""});
    const id = useParams();

    useEffect(()=>{
        traerDetalles()
    },[])

    const traerDetalles = () => {
        axios.get(`http://localhost:3001/dogs/${id.id}`) 
            .then((res) => {
                const dog = res.data[0];
                console.log(dog.temperament)
                setDogDetail({
                    name: dog.name, 
                    temperament: dog.temperament, 
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    life_span: dog.life_span,
                    fotoid: dog.image.url,
                })
            })
            .catch((error) => {
                console.log(error);
            }); 
    }
    return (
        <div className= "fondo-dog-detail">
            <div className= "container-amarillo">
                <div className= "container-img">
                    <img className= "img-perro" src= {dogDetails.fotoid} alt="img not found"></img>
                </div>
                <div className="descripcion-perro">
                    <p>{dogDetails.name}</p>
                    <div>
                        <p>Sus temperamentos son: {dogDetails.temperament}</p>
                        <p>Su altura varia entre altura: {dogDetails.height} Centimetros</p>
                        <p>Su peso varia entre: {dogDetails.weight} Kg</p>
                        <p>Su esperanza de vida es de: {dogDetails.life_span}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DogDetail;