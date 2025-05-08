import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import '../assets/css/AddArticlePage.css';
import { FaArrowCircleLeft, FaPlusCircle} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, ERREUR_AJOUT, ERREUR_RECUP, SUCCES_AJOUT } from '../types/Variables';
import { Select } from 'antd';
import CustomToast from '../component/CostumToast';

interface Categorie {
  idCategorie: number;
  designation: string;
}

const AddArticlePage = () => {
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [designation, setDesignation] = useState('');
  const [unite, setUnite] = useState('');
  const [idCategorie, setIdCategorie] = useState('');
  const [categories, setCategories] = useState<Categorie[]>([]);
  const navigate = useNavigate();
    const handleAddArticle = () => {
        navigate('/articles/article');
    };
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
  const handleAddCategorie = () => {
    window.open('/addCategorie', '_blank');
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle = {
      designation,
      unite,
      idCategorie: {
        idCategorie: parseInt(idCategorie)
      },
    };

    try {
      await axios.post(BASE_URL+'saveArticle', newArticle);
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-4">Ajouter un Article</h2>
        <Button variant="secondary" onClick={handleAddArticle} className="d-flex align-items-center">
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

        <Form.Group as={Row} controlId="formUnite" className="mb-3">
          <Form.Label column sm={2}>Unité</Form.Label>
          <Col sm={10}>
            <Form.Control 
              type="text" 
              placeholder="Entrez l'unité" 
              value={unite} 
              onChange={(e) => setUnite(e.target.value)} 
              required 
            />
          </Col>
        </Form.Group>
        <Button variant="success" onClick={handleAddCategorie} className="d-flex align-items-center">
          <FaPlusCircle className="me-2" />
          Ajouter categorie
        </Button>
        <Form.Group as={Row} controlId="formCategorie" className="mb-3">
          <Form.Label column sm={2}>Catégorie</Form.Label>
          <Col sm={10}>
            <Select
              showSearch
              placeholder="Sélectionnez une categorie"
              optionFilterProp="children"
              value={idCategorie}
              onChange={(value) => setIdCategorie(value)}
              style={{ width: '100%' }}
            >
              {categories.map(cat => (
              <Select.Option key={cat.idCategorie} value={cat.idCategorie}>
                {cat.designation}
              </Select.Option>
              ))}
            </Select>
          </Col>
        </Form.Group>
        <Button type="submit" className="button">
          Enregistrer
        </Button>
      </Form>
    </div>
  );
};

export default AddArticlePage;
