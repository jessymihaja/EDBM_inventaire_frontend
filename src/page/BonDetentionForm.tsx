import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form} from 'react-bootstrap';
import { DemandeDetention } from '../component/DemandeDetentionCard';
import { BASE_URL, ERREUR_AJOUT, SUCCES_AJOUT } from '../types/Variables';
import { detailArticle } from '../component/tableDetailArticles';
import { Select } from 'antd';
import CustomToast from '../component/CostumToast';
import "../assets/css/bonForm.css"
import { useNavigate } from 'react-router-dom';
interface BonDetentionFormProps{
    demandeDetention : DemandeDetention
}

const BonDetentionForm: React.FC<BonDetentionFormProps> = ({ demandeDetention }) => {
    const [articles, setArticles] = useState<{ [key: number]: detailArticle[] }>({});
    const [selectedArticles, setSelectedArticles] = useState<{ [key: number]: { refarticle: detailArticle; etat: number } | null }>({});
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const navigate=useNavigate();
    useEffect(() => {
        demandeDetention.detailDemandeDetentions.forEach(async (detail) => {
            const response = await axios.get(BASE_URL+`detailArticleByCategorie/${detail.idcategorie.idCategorie}`);
            setArticles((prevArticles) => ({ ...prevArticles, [detail.id]: response.data }));
        });
    }, [demandeDetention]);

    const handleArticleChange = (detailId: number, value: string) => {
        const article = JSON.parse(value); 
    
        setSelectedArticles((prevSelected) => ({
            ...prevSelected,
            [detailId]: {
                refarticle: article,
                etat: prevSelected[detailId]?.etat || 0,
            },
        }));
    };
    const handleEtatChange = (detailId: number, etat: number) => {
        setSelectedArticles((prevSelected) => {
            const existingArticle = prevSelected[detailId];
            if (existingArticle && existingArticle.refarticle) {
                return {
                    ...prevSelected,
                    [detailId]: {
                        ...existingArticle,
                        etat: etat 
                    }
                };
            }
            return prevSelected;
        });
    };
    const handleSubmit = async () => {
        const bonDetention = {
            idemploye: demandeDetention.idemploye,
            dateBon: new Date().toISOString().split("T")[0],
            dateFin: null,
            detailBonDetentions: Object.keys(selectedArticles).map((detailId) => ({
                refarticle: selectedArticles[Number(detailId)]?.refarticle, 
                etat: selectedArticles[Number(detailId)]?.etat,
            })),
        };
        try{
            await axios.post(BASE_URL+`saveBonDetention`, bonDetention);
            await axios.put(BASE_URL+`demandes/${demandeDetention.id}/etat`, { etatdemande:9 }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(bonDetention)
            setToast({ message: SUCCES_AJOUT, type: 'success' });
            setTimeout(() => {
                navigate('/listeDemandeConfirmes');
            }, 1800);
        }catch{
            console.log(bonDetention)
            setToast({ message: ERREUR_AJOUT, type: 'error' });
        }
        
    };

    return (
        <div>
            {demandeDetention.detailDemandeDetentions.map((detail) => (
                <Card key={detail.id} style={{ marginBottom: '1rem' }}>
                    <Card.Body>
                        <Card.Title>Article demandé: {detail.idcategorie.designation}</Card.Title>

                       
                        <Form.Label>Choisir un article</Form.Label>
                        <Select
                            showSearch
                            placeholder="Sélectionnez un article"
                            optionFilterProp="children"
                            value={JSON.stringify(selectedArticles[detail.id]?.refarticle )|| null}
                            onChange={(value) => handleArticleChange(detail.id, value)}
                            style={{ width: '100%' }}
                            >
                            {articles[detail.id]?.map((article, index) => (
                                <Select.Option key={`${article.refarticle}-${index}`} value={JSON.stringify(article)}>
                                {article.iddetailEntree.idarticle.designation}_num{article.numSerie}_{article.refarticle}
                            </Select.Option>
                            ))}
                        </Select>

                        <Form.Label className="mt-2">Choisir l'état</Form.Label>
                        <br></br>
                            <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            onChange={(e) => handleEtatChange(detail.id, parseInt(e.target.value))}
                            value={selectedArticles[detail.id]?.etat || 1}
                            className="form-range"
                            />
                            <div className="range-values">
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                <span key={value} className="range-value">{value}</span>
                            ))}
                            </div>
                    </Card.Body>
                </Card>
            ))}
            <Button onClick={handleSubmit} variant="success">Confirmer Bon de Détention</Button>

            {toast && (
                <CustomToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default BonDetentionForm;