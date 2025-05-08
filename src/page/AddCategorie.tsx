import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowCircleLeft } from "react-icons/fa";
import {useNavigate } from "react-router-dom";
import { BASE_URL, ERREUR_AJOUT, SUCCES_AJOUT } from "../types/Variables";
import CustomToast from "../component/CostumToast";

const AddCategorie = () => {
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [designation, setDesignation] = useState('');
    const navigate = useNavigate();
    const handleAddCategorie = () => {
      navigate('/articles/categorie');
    };


      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newCategorie = {
          designation
        };
        try {
          await axios.post(BASE_URL+`saveCategorie`, newCategorie);
          setToast({ message: SUCCES_AJOUT, type: 'success' });
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
              <h2 className="mb-4">Ajouter une categorie</h2>
              <Button variant="secondary" onClick={handleAddCategorie} className="d-flex align-items-center">
                <FaArrowCircleLeft className="me-2" />
                retour
              </Button>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formDesignation" className="mb-3">
              <Form.Label column sm={2}>Désignation</Form.Label>
                <Col sm={10}>
                  <Form.Control 
                    type="text" 
                    placeholder="Entrez la désignation" 
                    value={designation} 
                    onChange={(e) => setDesignation(e.target.value)} 
                    required 
                  />
                </Col>
            </Form.Group>
            <Button type="submit" className="button">
              Enregistrer
            </Button>
          </Form>
      </div>
    )
}
export default AddCategorie;