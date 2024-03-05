import LoginPage from "./components/LoginPage";
import { HomePage } from './components/HomePage'
import { useState } from "react";
function App() {

  let [logged,setLogged] =  useState(window.localStorage.getItem('logged')) 
  let [user,setUser] = useState(window.localStorage.getItem('name'))


  function checkLogin(e){
    e.preventDefault()
    let login = e.target[0].value.trim()
    let password = e.target[1].value.trim()
    if(password==='bloodborne' && login.toLowerCase()==='john'){
      window.localStorage.setItem('name',login)
      window.localStorage.setItem('logged',true)
      setLogged(true)
      setUser('john')
    }
    else{
      alert("invalid login or password")
    }
  }
  function exit(){
    window.localStorage.clear()
    setLogged(false)
    setUser('')
  }
  return (
    <div className="App">
      {!logged?<LoginPage fn={checkLogin}/>: <HomePage exit={exit}/>}
    </div>
  );
}

export default App;