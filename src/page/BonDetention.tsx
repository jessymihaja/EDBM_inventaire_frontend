import { useLocation } from "react-router-dom";
import BonDetentionForm from "./BonDetentionForm"

const BonDetention = () =>{
    const location = useLocation();
    const { demande} = location.state || {};
    return(
        <div className="App">
            <h2>Créer un bon de detention </h2>
            <BonDetentionForm demandeDetention={demande}></BonDetentionForm>
        </div>
    )
}
export default BonDetention;