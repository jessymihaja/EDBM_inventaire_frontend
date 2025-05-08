import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DemandeList from "../component/DemandList";

const HomeUser = () => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate(window.location.pathname, { replace: true });
  }, [navigate]);
    return(
        <div className="App">
            <DemandeList userId={localStorage.getItem("idUser")}></DemandeList>
        </div>
    )
}
export default HomeUser;