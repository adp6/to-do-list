import { useContext,useState } from "react"
import {RemoveFunc} from "./HomePage"
function ListItem({item}){
    let formaterDay = new Intl.DateTimeFormat(undefined,{hour:"numeric",minute:'numeric'})
    const remove = useContext(RemoveFunc);

    let [fade,setFade] = useState(false)
    const handleRemove = () => {
        setFade(true)
        setTimeout(()=>{
            remove(item.id)
        },1500)
    }

    return(
        <li key={item.date} className={"item" + (fade?" fade line-through":"")}>
            <span>{item.description}</span>
            <span style={{textAlign:'end'}}>{formaterDay.format(new Date(item.date))}</span>
            <button onClick={handleRemove} className="button-remove">{!fade?"⬜︎":"☑"}</button>
        </li>
    )
}
export default ListItem