import {Button} from "react-bootstrap";
import TableArticles from "../component/tableArticles";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import SearchBar from "../component/SearchBar";

const ListArticle = () =>{
    const navigate = useNavigate();
    const handleAddArticle = () => {
        navigate('/addArticle');
      };
    return(
        <div className="App">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Liste des Articles</h2>
                
                <Button variant="secondary" onClick={handleAddArticle} className="d-flex align-items-center">
                    <FaPlusCircle className="me-2" />
                        Ajouter un Article
                </Button>
            </div>
            <SearchBar></SearchBar>
            <TableArticles></TableArticles>
        </div>
    )
}
export default ListArticle;