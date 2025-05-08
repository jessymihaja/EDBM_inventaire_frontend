import CategoriePieChart from "../component/categoriePieChart";
import DepenseChart from "../component/depenseChart";
import DerniersMouvements from "../component/derniersMouvements";
import FaibleStock from "../component/faibleStock";
import OutOfStock from "../component/outOfStock";
import '../assets/css/dashboard.css';
import DepenseTotal from "../component/depenseTotal";
import { FaWarehouse } from "react-icons/fa";
import CountButton from "../component/countButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DemandStatusBar from "../component/DemandStatusBar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(window.location.pathname, { replace: true });
}, [navigate]);
  return (
    <div className="App" style={{backgroundColor:'rgb(243, 234, 234)'}}>

      <div style={{float:'left',width:'220px',marginRight:'10px'}}>
        <div className="titre">
        <FaWarehouse></FaWarehouse> Dashboard Inventaire
          
        </div>
        <DepenseTotal></DepenseTotal>
        <div className="count"><CountButton></CountButton></div>
      </div>    
      <DepenseChart></DepenseChart>
      <DemandStatusBar></DemandStatusBar> 
      <OutOfStock limite={3}/>
      <FaibleStock limite={3} seuil={3} />
      <CategoriePieChart></CategoriePieChart>
      <DerniersMouvements limite={3}></DerniersMouvements>
      
    </div>
  );
}

export default App;
