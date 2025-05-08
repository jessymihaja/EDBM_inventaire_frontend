import { FaPlusCircle } from "react-icons/fa";
import TableEntrees from "../component/tableEntrees";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListeEntree = () =>{
    const navigate = useNavigate();
    const handleAddArticle = () => {
        navigate('/addEntree');
      };


return(
    <div className="App">
        <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Liste des entrees</h2>
                <Button variant="secondary" onClick={handleAddArticle} className="d-flex align-items-center">
                    <FaPlusCircle className="me-2" />
                        Ajouter une entree
                </Button>
            </div>
        <TableEntrees></TableEntrees>
    </div>
);

}
export default ListeEntree;