const init = {
    todos : []
}

export const reducer = (store = init , {type,payload})=>{
    switch(type){
        case "ADD_TODO":
            return {...store,todos : payload}
        case "DELETE":
            return {...store,todos : [...store.todos].filter((item)=>{return (item.id!==payload)})}
        default:
            return store
    }
}