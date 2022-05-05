import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../Redux/action";

export const Todo = ()=>{
    const [text,setText] = useState({
        title : "",
        status : false
    });
    const dispatch = useDispatch();
    const todo = useSelector((store)=> store.todos);
    const handlesubmit = ()=>{
        const payload = text;
        fetch("http://localhost:8080/todolist",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(payload)
        }).then(()=>{ getdata()});
    }
    const handlechange = (e)=>{
        const {id,value} = e.target;
        setText({
            ...text,
            [id] : value
        })
    };
    const getdata = ()=>{
        fetch("http://localhost:8080/todolist").then((d)=> d.json()).then((data)=> dispatch(addTodo(data)));
    }
    useEffect(()=>{
        getdata();
    },[])
    const handledelete = (id)=>{
        fetch(`http://localhost:8080/todolist/${id}`,{
            method : "DELETE"
        }).then(()=>{ getdata()});
    }
    return (
        <div>
            <div>
                <input type="text" placeholder="todo" id="title" onChange={(e)=>{handlechange(e)}}/>
                <input type="button" value="Submit" onClick={handlesubmit}/>
            </div>
            <div>
                {todo.map((el)=>{
                    return <div>
                        <p id={el.id}>{el.id}. {el.title}  <span><button onClick={()=>{handledelete(el.id)}}>Delete</button></span></p>
                    </div>
                })}
            </div>
        </div>
    )
}