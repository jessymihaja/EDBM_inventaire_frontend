import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Select from "antd/lib/select";
import { FaPlus, FaTrash } from "react-icons/fa";
import { BASE_URL, ERREUR_AJOUT, ERREUR_RECUP, SUCCES_AJOUT } from "../types/Variables";
import axios from "axios";
import { Categorie } from "../component/tableArticles";
import { useNavigate } from "react-router-dom";
import CustomToast from "../component/CostumToast";


interface DetailDemandeDetention {
  idcategorie: number | null;
}

const DemandeDetentionPage: React.FC = () => {
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  var idEmploye="";
  var etatDemande=0;
  const [justification, setJustification] = useState<string>("");
  const [datedemande, setDatedemande] = useState<string>("");
  const [detailDemandeDetentions, setDetailDemandeDetentions] = useState<DetailDemandeDetention[]>([{ idcategorie: null }]);
  const [categories, setCategories] = useState<Categorie[]>([]); 
  const navigate=useNavigate();
  const user=localStorage.getItem("user")
      if(user) {
        const userData=JSON.parse(user)
        idEmploye=(userData.id)
      }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(BASE_URL+`categories`);
        setCategories(response.data);
      } catch (error) {
        console.error(ERREUR_RECUP, error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddDetail = () => {
    setDetailDemandeDetentions([...detailDemandeDetentions, { idcategorie: null }]);
  };

  const handleRemoveDetail = (index: number) => {
    setDetailDemandeDetentions(detailDemandeDetentions.filter((_, i) => i !== index));
  };

  const handleDetailChange = (index: number, value: number) => {
    const newDetails = [...detailDemandeDetentions];
    newDetails[index].idcategorie = value;
    setDetailDemandeDetentions(newDetails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const demande = {
      idemploye: idEmploye,
      etatdemande: etatDemande,    
      justification: justification,
      datedemande: datedemande,
      detailDemandeDetentions: detailDemandeDetentions.map(detail => ({
        idcategorie: detail.idcategorie, 
      }))
    };
    try {
      await axios.post(BASE_URL + 'saveDemandeDetention', demande);
      setTimeout(() => {
        navigate('/homeUser');
    }, 1800);
      
      console.log(demande);
      setToast({ message: SUCCES_AJOUT, type: 'success' });
    } catch (error) {
      console.error(ERREUR_AJOUT, error);
      setToast({ message: ERREUR_AJOUT, type: 'error' });
    }
  };

  return (
    <div className="App">
      {toast && (
                <CustomToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
    <Card className="p-4">
      <h2>Nouvelle Demande de Détention d'Équipement</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="justification">
          <Form.Label>Justification</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Indiquez la justification"
          />
        </Form.Group>

        <Form.Group controlId="datedemande">
          <Form.Label>Date de Demande</Form.Label>
          <Form.Control
            type="date"
            value={datedemande}
            onChange={(e) => setDatedemande(e.target.value)}
            required
          />
        </Form.Group>

        <h4>Ajouter du materiel</h4>
        {detailDemandeDetentions.map((detail, index) => (
          <Row key={index} className="align-items-center">
            <Col>
              <Select
                showSearch
                placeholder="Choisir une categorie"
                optionFilterProp="children"
                value={detail.idcategorie}
                onChange={(value) => handleDetailChange(index, value)}
                style={{ width: "100%",marginTop:"10px" }}
              >
              {categories.map(cat => (
              <Select.Option key={cat.idCategorie} value={cat.idCategorie}>
                {cat.designation}
              </Select.Option>
              ))}
              </Select>
            </Col>
            <Col xs="auto">
              <Button
                variant="danger"
                onClick={() => handleRemoveDetail(index)}
                disabled={detailDemandeDetentions.length === 1}
              >
                <FaTrash />
              </Button>
            </Col>
          </Row>
          
        ))}

        <Button variant="primary" onClick={handleAddDetail} className="mt-3">
          <FaPlus /> 
        </Button>
        <br />

        <Button variant="success" type="submit" className="mt-3">
          Soumettre la Demande
        </Button>
      </Form>
    </Card>
    </div>
  );
};

export default DemandeDetentionPage;
