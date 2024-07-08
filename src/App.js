import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./App.css";
import Routers from "./Routers";

function App() {
  const adminLogin = JSON.parse(localStorage.getItem("login"))

  const navigate = useNavigate()


  useEffect(()=>{
    if(adminLogin?.email == "admin@gmail.com"){
      navigate("/home")
    }
  },[])

  return (
    <div className="App" style={{position:'relative', transition: 'all 1s ease'}}>
      <Routers />
    </div>
  );
}

export default App;
