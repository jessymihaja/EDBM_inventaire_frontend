import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../types/Variables";
import { Badge, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { detailArticle } from "../component/tableDetailArticles";
import CustomBadge from "../component/costumBadge";
import { formatDateToFrench } from "../utils/Functions";
import ProgressBar from "../component/ProgressBar";
export interface DetailBonProps{
    id:number;
    refarticle:detailArticle;
    etat:number
}
export interface BonProps{
    id:number;
    idemploye:string;
    dateBon:string;
    dateFin:string;
    detailBonDetentions:DetailBonProps[];
}
const PossessionPage = () =>{
    const [bons, setBons] = useState<BonProps[]>();
    var idEmploye="";
    const user=localStorage.getItem("user")
      if(user) {
        const userData=JSON.parse(user)
        idEmploye=(userData.id)
      }
      
    useEffect(() => {
        const fetchBonDetention = async () => {
            try {
                const response = await axios.get<BonProps[]>(BASE_URL+`bonDetentionByIdEmploye/${idEmploye}`);
                setBons(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des bons de détention", error);
            }
        };
        fetchBonDetention();
    }, [idEmploye,]);




    return(
        <div className="App">
            <div className="container mt-4">
            <h2>Bons de détention en possession </h2>
            <br />
            {bons?.map((bon) => (
                <Card key={bon.id} style={{width:"30%",float:"left",marginRight:"20px",marginBottom:"20px"}}>
                    <Card.Header style={{backgroundColor:"#a68069",color:"white"}}>
                        <div>
                            <strong>Date du Bon :</strong> {formatDateToFrench(bon.dateBon)}{" "}
                            {bon.dateFin ? (
                                <Badge bg="warning">Terminé le {bon.dateFin}</Badge>
                            ) : (
                                <Badge bg="success">En cours</Badge>
                            )}
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            {bon.detailBonDetentions.map((detail) => (
                                <ListGroupItem key={detail.id}>
                                    <h5 style={{color:"#a68069"}}>Article : {detail.refarticle.iddetailEntree.idarticle.designation}</h5>
                                    <p>
                                        <strong>Référence :</strong> {detail.refarticle.refarticle}<br />
                                        <strong>Num série :</strong> {detail.refarticle.numSerie}<br />
                                        <strong>Catégorie :</strong> <CustomBadge 
                                        idCategorie={detail.refarticle.iddetailEntree.idarticle.idCategorie.idCategorie} 
                                        designation={detail.refarticle.iddetailEntree.idarticle.idCategorie.designation}>
                                        </CustomBadge><br />
                                        <strong>Prix Unitaire :</strong> {detail.refarticle.iddetailEntree.prixunitaire.toLocaleString('fr-FR')} MGA<br />
                                        <ProgressBar value={detail.etat}></ProgressBar>
                                    </p>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            ))}
        </div>
        </div>
    )
}
export default PossessionPage;
