import React, { useEffect, useState } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { Categorie } from './tableArticles';
import { fetchUserData, User2 } from '../utils/Functions';
import { etatDemandeMap } from '../types/Variables';

interface DetailDemandeDetention {
    id: number;
    idcategorie: Categorie;
}

 interface DemandeDetention {
    id: number;
    idemploye: string;
    etatdemande: number;
    justification: string;
    datedemande: string;
    detailDemandeDetentions: DetailDemandeDetention[];
}

interface DemandeBonFormCardProps {
    demande: DemandeDetention;
    onTraiter: (demande: DemandeDetention) => void;
    onSuspendre: (id: number,etat:number) => void;
    boutonTraiter:String;
    boutonSuspendre:String;
    etat1:number;
    etat2:number;
    
}

const DemandeBonFormCard: React.FC<DemandeBonFormCardProps> = ({ demande, onTraiter, onSuspendre,boutonTraiter,boutonSuspendre,etat1,etat2 }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User2 | null>(null);
    useEffect(() => {
        const userId = demande.idemploye
        const token =localStorage.getItem("token")
      
        if (userId && token) {
          fetchUserData(userId, token, setUser, setLoading);
        } else {
          setLoading(false);
        }
      }, [setUser, setLoading,demande.idemploye]);
    if(!loading){
    return (
        <Card className="mb-3">
            <Card.Header>
                <strong>Demande ID:</strong> {demande.id} <br />
                <strong>Date de la demande:</strong> {demande.datedemande}
            </Card.Header>
            <Card.Body>
                <Card.Title>Employé: {user?.nom}</Card.Title>
                <Card.Text>
                    <strong>Justification:</strong> {demande.justification}
                </Card.Text>
                <Card.Text>
                    <strong>État de la demande:</strong> {etatDemandeMap[demande.etatdemande]}
                </Card.Text>
                <ListGroup>
                    {demande.detailDemandeDetentions.map((detail) => (
                        <ListGroup.Item key={detail.id}>
                            <strong>Materiel:</strong> {detail.idcategorie.designation}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className="mt-3">
                    <Button variant="success" onClick={() => onTraiter(demande)}>{boutonTraiter}</Button>{' '}
                    <Button variant="warning" onClick={() => onSuspendre(demande.id,etat2)}>{boutonSuspendre}</Button>
                </div>
            </Card.Body>
        </Card>
    );
};
}

export default DemandeBonFormCard;
