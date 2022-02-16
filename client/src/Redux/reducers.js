const initialState = { 
    dogs : [],
    dogsDetail : {},
    temperamento : [],
}

function rootReducer(state = initialState,action) {
    switch(action.type){
        case "GET_ALL_DOGS":
            return{
                ...state,
                dogs: action.payload
            };
        case "DOGS_DETALLES":
            return{
                ...state,
                dogsDetail: action.payload
            };
        case "DOGS_NAME":
            return{
                ...state,
                dogs: action.payload
            }
        case "GET_TEMPERAMENT":
            return{
                ...state,
                temperamento: action.payload
            }
            case "ordenar-liviano-pesado":
                return {
                    ...state,
                    dogs: state.dogs.sort((a,b) => parseInt(a.weight.metric.slice(0, 3)) - parseInt(b.weight.metric.slice(0, 3))) 
                };
            case "ordenar-pesado-liviano":
                return {
                    ...state,
                    dogs: state.dogs.sort((a,b) => parseInt(b.weight.metric.slice(0, 3)) - parseInt(a.weight.metric.slice(0, 3)))
                };
            case "ordenar-asc-desc":
                return {
                    ...state,
                    dogs: state.dogs.sort(function(a, b){
                        if(a.name < b.name) { return -1; }
                        if(a.name > b.name) { return 1; }
                        return 0;
                })
            }
        case "ordenar-desc-asc":
            return {
                ...state,
                 dogs: state.dogs.sort(function(a, b){
                    if(a.name > b.name) { return -1; }
                    if(a.name < b.name) { return 1; }
                    return 0;
                })
            }
        case "FILTROTEMP":
            return{
                ...state,
                dogs: action.payload
            }
            default:
        return state;
    };
    
    
}

export default rootReducer;