import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { BASE_URL, ERREUR_AJOUT, ERREUR_RECUP, SUCCES_AJOUT } from "../types/Variables";
import { detailArticle } from "../component/tableDetailArticles";
import { Button, Col, Form, Row } from "react-bootstrap";
import CustomToast from "../component/CostumToast";

const SortieDetailArticle= () => {
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const {idDetailArticle}=useParams();
    const [detailArticle, setDetailArticle] = useState<detailArticle | null>(null);
    const [justification,setJustification] =useState('');
    const [dateSortie,setDateSortie] = useState('');
    const navigate = useNavigate();
    

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newSortie = {
          refarticle:detailArticle,
          justification:justification,
          datesortie:dateSortie
    };
    
        try {
          await axios.post(BASE_URL+'saveSortie', newSortie);
          setToast({ message: SUCCES_AJOUT, type: 'success' });
          setTimeout(() => {
            navigate('/mouvement/sortie')
        }, 1800);
          
        } catch (error) {
          console.error(ERREUR_AJOUT, error);
          setToast({ message: ERREUR_AJOUT, type: 'error' });
        }
      };

    return(
        <div className="App">
           {toast && (
                <CustomToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-4">Ajouter une sortie</h2>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Label column sm={2}>Ref Article : {detailArticle?.refarticle}</Form.Label>
                <Form.Label column sm={2}>numéro de série : {detailArticle?.numSerie}</Form.Label>
                <Form.Group as={Row} controlId="formJustfication" className="mb-3">
                    <Form.Label column sm={2}>Justification</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                        as="textarea"
                        rows={3}
                        value={justification} 
                        onChange={(e) => setJustification(e.target.value)} 
                        required 
                        />
                    </Col>
                </Form.Group>
                <Col>
                    <Form.Group controlId="dateSortie">
                        <Form.Label>Date de sortie</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateSortie}
                            onChange={(e) => setDateSortie(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>
                <Button type="submit" className="button">
                    soumettre
                </Button>
            </Form>
        </div>
    )

}

export default SortieDetailArticle;