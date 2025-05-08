import { useNavigate } from "react-router-dom";
import TableCategories from "../component/tableCategories"
import { Button } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";

const ListeCategorie = () =>{
    const navigate = useNavigate();
    const handleAddCategorie = () => {
        navigate('/addCategorie');
      };

    return(
        <div className="App">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Liste des categories</h2>
                <Button variant="secondary" onClick={handleAddCategorie} className="d-flex align-items-center">
                    <FaPlusCircle className="me-2" />
                        Ajouter une  categorie
                </Button>
            </div>
            <TableCategories></TableCategories>
        </div>
    )
     
}
export default ListeCategorie;