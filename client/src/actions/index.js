import axios from "axios";

export function getAllRazas(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/dogs`)
        .then(res => {
            dispatch({type:"GET_ALL_DOGS", payload: res.data})
        })
    }
}

export function getRazasDetails(id) {
    return function (dispatch){
        return axios.get(`http://localhost:3001/dogs/${id}`)
        .then(res => {
            dispatch({type: "DOGS_DETALLES", payload : res.data})
        })
    }
}

export function getRaza(name) {
    return function (dispatch){
        return axios.get(`http://localhost:3001/dog/${name}`)
        .then(res => {
            dispatch({type: "DOGS_NAME", payload :res.data})
        })
    }
}

export function getTemperamentos() {
    return function (dispatch){
        return axios.get(`http://localhost:3001/temperament`)
        .then(res => {
            dispatch({type: "GET_TEMPERAMENT", payload : res.data})
        })
    }
}



export function filtroTemp(temp){
    return function (dispatch) {
        return axios.get(`http://localhost:3001/dogs`).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            let Api = res.data[i].temperament
            Api = Api && Api.split(",").flat()
            res.data[i].temperament = Api    
          } 
           const respuesta = [];
           res.data.map((e) =>{
               if(e.temperament && e.temperament.includes(temp) === true){
                   respuesta.push(e)
                   return respuesta
               }
           })
        
         dispatch({ type: "FILTROTEMP", payload: respuesta });
        });
      };
    }

    export function postDogs(payload) {
        // console.log(payload)
         return async function (dispatch){
             const response = await axios.post("http://localhost:3001/dogs", payload);
             console.log(response);
             return response;
         }
         
     }
     
