import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap'; 
import { FaMoneyBillWave } from 'react-icons/fa'; 
import { BASE_URL, ERREUR_RECUP } from '../types/Variables';

const DepenseTotal: React.FC = () => {
  const [depenseTotal, setDepenseTotal] = useState<number | null>(null);

  useEffect(() => {
    
    axios.get(BASE_URL+'stock/depensetotal')
      .then((response) => {
        setDepenseTotal(response.data);
      })
      .catch((error) => {
        console.error(ERREUR_RECUP, error);
      });
  }, []);
 
  return (
    <Card className="text-center shadow-sm" style={{ padding: '2px', backgroundColor: '#f9f9f9'}}>
      <Card.Body>
        <FaMoneyBillWave size={50} style={{ color: '#28a745' }} />
        <Card.Title style={{ fontSize: '20px', marginTop: '10px' }}>Investissement Total</Card.Title>
        {depenseTotal !== null ? (
          <Card.Text style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '15px' }}>
            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MGA' }).format(depenseTotal)}
          </Card.Text>
        ) : (
          <Card.Text>Chargement...</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default DepenseTotal;
