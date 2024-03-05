import { useEffect,useState } from "react"
import Loading from "./Loading"
import DayList from "./DayList"
function ToDoLists({list}){
    let [lists,setLists] = useState({})
    let [loaded,setLoad] = useState(false)
    
    function render(){

        let m = new Map()

        for(let i=0;i<list.length;i++){
            let date = new Date(list[i].date)
            let key = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
            if(m.has(key)){
                m.set(key,[...m.get(key),list[i]])
            }
            else{
                m.set(key,[list[i]])
            }
        }
        setLists(Array.from(m))
        setLoad(true)
    }
    useEffect(render,[list])
    
    return(
            <div>
                {
                    loaded && lists.length>0?
                <div className="home">
                    {Object.keys(lists).map(key=>{
                    return(
                        <DayList key={key} lists={lists} k={key}/>
                    )
                })}
                </div>
                :
                <Loading/>
                }
                
            </div>
            
    )
}
export default ToDoLists