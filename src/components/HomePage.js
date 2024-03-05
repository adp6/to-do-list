import ToDoLists from "./ToDoLists"
import { useState,createContext,useMemo, useEffect } from 'react'
import icon from '../img/user.png'

export const RemoveFunc = createContext(undefined)
export function HomePage({exit}){
    let [list,setLists] = useState([{
                id:1,
                description:'dasdas',
                date: "2024-11-09T14:30:00.000Z",
            },
            {
                id:2,
                description:'ssss',
                date: "2024-11-09T16:20:00.000Z",
            },
            {
                id:3,
                description:'dgfdgdfgdfdsadsdaaaaaaaafsdgwekjwklbhewlbhwoiewebo;woebkdl;bj;fdkbjkdlfbjdflbjdflk;bjldfblkjdfbj',
                date: "2025-11-09T05:00:00.000Z",
            },
            {
                id:4,
                description:'dgfdgdfgdfdsaaaaaaaafsdgwekjwklbhewlbhwoiewebo;woebkdl;bj;fdkbjkdlfbjdflbjdflk;bjldfblkjdfbj',
                date: "2025-12-09T18:00:00.000Z",
            },
            {
                id:5,
                description:'dgfdgdfgdfdsaaaaaaaafsdgwekjwklbhewlbhwoiewebo;woebkdl;bj;fdkbjkdlfbjdflbjdflk;bjldfblkjdfbj',
                date: "2026-05-09T18:42:00.000Z",
            },
            {
                id:6,
                description:'ddsadsadgsdhtrhrfg',
                date: "2026-09-09T05:20:00.000Z",
            }
    ])

    const sorted = useMemo(()=>{
        return list.sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime())
    },[list])

    let [dele,setD] = useState(false)
    let [id,setId]=useState(0)
    let [showOptions,setOptions] = useState(false)
    
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (new Date().getFullYear()===new Date(sorted[0].date).getFullYear() &&
                new Date().getMonth()===new Date(sorted[0].date).getMonth() &&
                new Date().getHours()===new Date(sorted[0].date).getHours() &&
                new Date().getMinutes()===new Date(sorted[0].date).getMinutes()) {
                    alert(sorted[0].description)
                    setId(sorted[0].id)
                    setD(true)
            }
        }, 30000); 
        
        return () => clearInterval(intervalId)
    }, [sorted]);
    
    
    if(dele){
        remove(id)
        setD(false)
    }

    function addToList(e){
        e.preventDefault()
        let description = e.target[0].value
        let date = e.target[1].value 
        if(description.length>0 && date.length>0){
            const obj = {
                id:new Date().getTime(),
                description: description,
                date:new Date(date).toJSON()
            }
            if(new Date(obj.date).getTime()<new Date().getTime()){
                alert('invalid date')
                return
            }

            setLists([...list,obj])
        }
        
    }
    function remove(id){
        setLists(list.filter((v)=>v.id!==id))
    }

    return(
        <div>
            <div className="user">
                <div>
                    <img src={icon} className="user-icon" alt='icon' onClick={()=>{setOptions(!showOptions)}}></img>
                </div>
                {showOptions?
                <div className="options">
                    <div onClick={exit}>
                        Exit
                    </div>
                </div>
                :null}
            </div>
            <form className="user-input" onSubmit={addToList}>
                <textarea/>
                <input type="datetime-local" className="date"/>
                <button type="submit" className="add_btn">Add</button>
            </form>
            <RemoveFunc.Provider value={remove}>
                    <ToDoLists list={sorted}/>
            </RemoveFunc.Provider>
        </div>
    )
}
