import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entree,detailEntree } from "../component/tableEntrees";
import axios from "axios";
import { Button, Card, ListGroup, Table } from "react-bootstrap";
import { FaArrowCircleLeft} from "react-icons/fa";
import "../assets/css/DetailEntree.css"
import { BASE_URL, ERREUR_RECUP } from "../types/Variables";
import BouttonEntreeExport from "../component/BouttonEntreeExport";


const EntreeDetails = () => {
        const { identree } = useParams();
        const [entree, setEntree] = useState<Entree | null>(null);
        const navigate=useNavigate();
        const { NumberToLetter } = require("convertir-nombre-lettre");
        const handleEntreeDetail = () => {
          navigate('/mouvements/entree');
        };
        const [sommeTotale, setSommeTotale] = useState(0);
          
        useEffect(() => {
          axios.get(BASE_URL+`entree/${identree}/total`)
            .then(response => {
              setSommeTotale(response.data);
            })
            .catch(error => {
              console.error(ERREUR_RECUP, error);
            });
        }, [identree]);
        
        useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await axios.get<Entree>(BASE_URL+`entree/${identree}`);
                setEntree(response.data);
              } catch (error) {
                console.error(ERREUR_RECUP, error);
              }
            };
        
            fetchData();
          }, [identree]);
      
        if (!entree) {
          return <div>Chargement...</div>;
        }
      
        return (
            <div className="App">
                <div>
                    <Button variant="secondary" onClick={handleEntreeDetail} className="d-flex align-items-center">
                        <FaArrowCircleLeft className="me-2" />
                            retour
                    </Button>

                    <BouttonEntreeExport entree={entree} sommeTotale={sommeTotale}></BouttonEntreeExport>
                </div>
                
                  <br />
              <Card>
                <Card.Header className="bg-secondary text-white">Détails de l'Entrée</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>ID:</strong> {entree.id}</ListGroup.Item>
                    <ListGroup.Item><strong>Num Facture Provenance:</strong> {entree.numfactureprovenance}</ListGroup.Item>
                    <ListGroup.Item><strong>Provenance:</strong> {entree.provenance}</ListGroup.Item>
                    <ListGroup.Item><strong>Adresse:</strong> {entree.adresseprovenance}</ListGroup.Item>
                    <ListGroup.Item><strong>Date d'Entrée:</strong> {entree.dateentree}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
        
              <h5 className="mt-4">Détails des Articles</h5>
              <Table striped bordered hover responsive>
                <thead className="bg-primary text-white">
                  <tr>
                    <th>ID Article</th>
                    <th>Designation</th>
                    <th>Quantité</th>
                    <th>Prix Unitaire</th>
                  </tr>
                </thead>
                <tbody>
                  {entree.detailEntrees.map((detail:detailEntree, index) => (
                    <tr key={index}>
                      <td>{detail.idarticle.idArticle}</td>  
                      <td>{detail.idarticle.designation}</td>  
                      <td>{detail.quantite}</td>
                      <td>{detail.prixunitaire.toLocaleString('fr-FR')} Ar</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="somme_container">
                <h5>Total : {sommeTotale.toLocaleString('fr-FR')} Ar</h5>
                <h6>Evaluée à la somme de  : {NumberToLetter(sommeTotale)} Arirary</h6>
              </div>
            </div>
          );
    
}
export default EntreeDetails;