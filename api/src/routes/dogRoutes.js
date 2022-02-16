const { Router } = require('express');
const axios = require("axios");
const app = require("express").Router();
const {Dog, Temperament} = require("../db");
const { Op } = require("sequelize");


//Obtener un listado de las razas de perro
//Debe devolver solo los datos necesarios para la ruta principal
app.get("/dogs", function (req, res) {
    axios.get("https://api.thedogapi.com/v1/breeds") 
        .then(respuesta => {
            let nuevoarray = respuesta.data;
            for (let i = 0; i < nuevoarray.length; i++) {
                nuevoarray[i].id = "D" + nuevoarray[i].id
            }
            res.send(nuevoarray)
        })
        .catch(error => {
            console.log(error)
        })
    })

//BUSCADOR
//Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
//Si no existe ninguna raza de perro mostrar un mensaje adecuado
app.get("/dog/:name", async (req, res)=> {
    let dogis = await Dog.findAll();
    let arrdogs = [];
    for (let i = 0; i < dogis.length; i++) {
    let perro = dogis[i];
    let temperaments = await perro.getTemperaments();
    perro = perro.dataValues;
    temperaments = temperaments.map((el) => el.dataValues.name)
    perro.Temperament = temperaments.toString()
    arrdogs.push(perro)
  }
  axios.get("http://localhost:3001/dogs")
    .then(respuesta => {
        let total = arrdogs.concat(respuesta.data)
        let tuPerro = total.filter((el)=> el.name.includes(req.params.name))
        if(!tuPerro.length){
            res.send("Esa raza de perros no existe, verifica que tu primera letra sea una mayuscula.")
        }
        if (tuPerro.length > 0) {
            res.send(tuPerro)
        }
        res.end()
    })
    .catch(error => {
        console.log(error)
    })
})

//Obtener el detalle de una raza de perro en particular
//Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
//Incluir los temperamentos asociados

app.get("/dogs/:id", async(req, res) => {
    const id = req.params.id;
    
    if(id.length){
        try{
            const resultApi = await axios("http://localhost:3001/dogs");
            const result = resultApi.data.filter(e => e.id === id);
            result.length === 0?res.send("id no encontrado"):res.send(result);
        }
        catch(error){
            res.send(404);
        }
    }else{
        try{
            const resultDb = await Dog.findByPk(id);
            res.send(resultDb);
        }
        catch (error){
            res.send(404);
        }
    }
})

//Obtener todos los temperamentos posibles
//En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos
//y luego ya utilizarlos desde allí

app.get("/temperament", async (req, res) => {
    let temperamentosdb = await Temperament.findAll();
    if (temperamentosdb.length !== 0){
        res.send(temperamentosdb);
    } else {
        axios.get("https://api.thedogapi.com/v1/breeds")
        .then(async respuesta => {
            let finTemp = [];
            let tempApi = respuesta.data.map(el => el.temperament);
            let newtempApi = tempApi.map((el) => el && el.split(",")).flat();
            let sinnull = newtempApi.filter(e => typeof e === "string")
            sinnull.forEach((el) => {
                if(finTemp.indexOf(el) < 0) finTemp.push(el)
            });
            for (let i = 0; i < finTemp.length - 1; i++) {
                    await Temperament.create({
                        name: finTemp[i]
                    })
                
            } 
            res.send(finTemp)
        })
        .catch(error => {
            console.log(error)
        })
    }
})

//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
//Crea una raza de perro en la base de datos

app.post("/dog-add",  function (req, res) {
    let temperamentsId = req.body.temperamentsId
    Dog.create({
        name: req.body.perroNuevo.name,
        height: req.body.perroNuevo.height,
        weight: req.body.perroNuevo.weight,
        life_span: req.body.perroNuevo.life_span,
    })
    .then((dog) =>{
        dog.setTemperaments(temperamentsId)
        res.status(200).send(dog)
    })
    .catch((error => console.log(error)))
}) 

module.exports = app;

