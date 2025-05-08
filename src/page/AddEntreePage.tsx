import React, { useState, useEffect } from 'react';
import { Form, Button,Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaArrowCircleLeft, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import '../assets/css/AddEntreePage.css'
import { useNavigate } from 'react-router-dom';
import {Select} from "antd"
import { BASE_URL, ERREUR_AJOUT, ERREUR_RECUP, SUCCES_AJOUT } from '../types/Variables';
import CustomToast from '../component/CostumToast';

interface Article {
  idArticle: string;
  designation: string;
}

interface DetailEntree {
  idArticle: string;
  quantite: number;
  prixUnitaire: number;
}

const AddEntreePage = () => {
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const navigate=useNavigate();  
  const [articles, setArticles] = useState<Article[]>([]);
  const [numFactureProvenance, setNumFactureProvenance] = useState('');
  const [provenance, setProvenance] = useState('');
  const [adresseProvenance, setAdresseProvenance] = useState('');
  const [dateEntree, setDateEntree] = useState('');
  const [detailEntrees, setDetailEntrees] = useState<DetailEntree[]>([
    { idArticle: '', quantite: 0, prixUnitaire: 0 }
  ]);

  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(BASE_URL+`articles`);
        setArticles(response.data);
      } catch (error) {
        console.error(ERREUR_RECUP, error);
      }
    };

    fetchArticles();
  }, []);

  const handleDetailChange = (index: number, field: string, value: string | number) => {
    const updatedDetails = [...detailEntrees];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setDetailEntrees(updatedDetails);
  };
  

  const addDetailEntree = () => {
    setDetailEntrees([...detailEntrees, { idArticle: '', quantite: 0, prixUnitaire: 0 }]);
  };

  const removeDetailEntree = (index: number) => {
    const updatedDetails = [...detailEntrees];
    updatedDetails.splice(index, 1);
    setDetailEntrees(updatedDetails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntree = {
      numfactureprovenance: numFactureProvenance,
      provenance,
      adresseprovenance: adresseProvenance,
      dateentree: dateEntree,
      detailEntrees: detailEntrees.map(detail => ({
        idarticle: { idArticle: detail.idArticle },
        quantite: detail.quantite,
        prixunitaire: detail.prixUnitaire
      }))
    };

    try {
      await axios.post(BASE_URL+'saveEntree', newEntree);
      setTimeout(() => {
        navigate('/mouvements/entree');
    }, 1800);
      setToast({ message: SUCCES_AJOUT, type: 'success' });

    } catch (error) {
      setToast({ message: ERREUR_AJOUT, type: 'error' });
      alert(ERREUR_AJOUT);
    }
  };
  const handleAddEntree = () => {
    navigate('/mouvements/entree');
  };
  const handleAddArticle = () => {
    window.open('/addArticle', '_blank');
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-4">Ajouter une Entree</h2>
        <Button variant="secondary" onClick={handleAddEntree} className="d-flex align-items-center">
          <FaArrowCircleLeft className="me-2" />
          retour
        </Button>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numFactureProvenance">
              <Form.Label>Numéro Facture Provenance</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le numéro de facture"
                value={numFactureProvenance}
                onChange={(e) => setNumFactureProvenance(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="provenance">
              <Form.Label>Provenance</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez la provenance"
                value={provenance}
                onChange={(e) => setProvenance(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="adresseProvenance">
              <Form.Label>Adresse Provenance</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez l'adresse de provenance"
                value={adresseProvenance}
                onChange={(e) => setAdresseProvenance(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="dateEntree">
              <Form.Label>Date d'Entrée</Form.Label>
              <Form.Control
                type="date"
                value={dateEntree}
                onChange={(e) => setDateEntree(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" onClick={handleAddArticle} className="d-flex align-items-center">
          <FaPlusCircle className="me-2" />
          Ajouter article
        </Button>
        <h4>Détails de l'Entrée</h4>
        {detailEntrees.map((detail, index) => (
          <div key={index} className="detail-entree-item">
            <Row className="mb-3">
              <Col>
                <label>Article</label>
                <Select
                    showSearch
                    placeholder="Sélectionnez un article"
                    optionFilterProp="children"
                    value={detail.idArticle}
                    onChange={(value) => handleDetailChange(index, 'idArticle', value)}
                    style={{ width: '100%' }}
                >
                        {articles.map(article => (
                    <Select.Option key={article.idArticle} value={article.idArticle}>
                        {article.designation}
                    </Select.Option>
                    ))}
                </Select>
              </Col>
              <Col>
                <label>Quantité</label>  
                <Form.Control
                  type="number"
                  placeholder="Quantité"
                  value={detail.quantite}
                  onChange={(e) => handleDetailChange(index, 'quantite', Number(e.target.value))}
                  min={1}
                  max={50}
                  required
                />
              </Col>
              <Col>
                  <label>Prix unitaire</label>
                <Form.Control
                  type="number"
                  placeholder="Prix Unitaire"
                  value={detail.prixUnitaire}
                  min={1}   
                  onChange={(e) => handleDetailChange(index, 'prixUnitaire', Number(e.target.value))}
                  required
                />
              </Col>
              <Col>
                <Button variant="danger" onClick={() => removeDetailEntree(index)}className='delete_button' disabled={index === 0}><FaTrashAlt></FaTrashAlt></Button>
              </Col>
            </Row>
          </div>
        ))}

        <Button variant="success" onClick={addDetailEntree} className='add_button'>
            <FaPlusCircle></FaPlusCircle>
        </Button>

        <br></br>
        <Button  type="submit" className="button">
          Enregistrer
        </Button>
      </Form>
    </div>
  );
};

export default AddEntreePage;
