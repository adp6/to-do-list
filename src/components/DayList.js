import ListItem from "./ListItem"

function DayList({k,lists}){
    let formater = new Intl.DateTimeFormat(undefined)
    return(
        <div className="to-do-list">
            <div style={{textAlign:'center'}}>{`${formater.format(new Date(lists[k][1][0].date))}`}</div>
            <ul>
                {lists[k][1].map(item=>{
                    return(
                        <ListItem item={item} key={item.id}/>
                    )
                })}
            </ul>
            
        </div>
    )
}
export default DayList