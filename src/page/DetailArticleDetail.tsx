import { useNavigate, useParams } from "react-router-dom";
import { detailArticle } from "../component/tableDetailArticles";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, ListGroup } from "react-bootstrap";
import { FaArrowCircleLeft } from "react-icons/fa";
import { BASE_URL, ERREUR_RECUP } from "../types/Variables";

const DetailArticleDetail = () => {

    const { idDetailArticle } = useParams();
        const [detailArticle, setDetailArticle] = useState<detailArticle | null>(null);
        const navigate=useNavigate();
        const handleDetailArticleDetail = () => {
          navigate('/articles/detailArticle');
        };
        
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get<detailArticle>(BASE_URL+`detailArticle/${idDetailArticle}`);
              setDetailArticle(response.data);
            } catch (error) {
              console.error(ERREUR_RECUP, error);
            }
          };
          fetchData();
        }, [idDetailArticle]);
      
        if (!detailArticle) {
          return <div>Chargement...</div>;
        }

    return(
      <div className="App">
        <div>
          <Button variant="secondary" onClick={handleDetailArticleDetail} className="d-flex align-items-center">
            <FaArrowCircleLeft className="me-2" />
            retour
          </Button>
        </div>
        <br />
        <Card>
          <Card.Header className="bg-secondary text-white">Détails de entree</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Ref :</strong> {detailArticle.refarticle}</ListGroup.Item>
              <ListGroup.Item><strong>numero de série :</strong> {detailArticle.numSerie}</ListGroup.Item>
              <ListGroup.Item><strong>Designation :</strong>{detailArticle.iddetailEntree.idarticle.designation}</ListGroup.Item>
              <ListGroup.Item><strong>Categorie :</strong>{detailArticle.iddetailEntree.idarticle.idCategorie.designation}</ListGroup.Item>
              <ListGroup.Item><strong>Prix :</strong>{detailArticle.iddetailEntree.prixunitaire} Ar</ListGroup.Item>                    
            </ListGroup>
            </Card.Body>
        </Card>
      </div>
    )
}
export default DetailArticleDetail;