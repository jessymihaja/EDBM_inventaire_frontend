import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../types/Variables';
import { useNavigate } from 'react-router-dom';

interface DerniersMouvementDto {
    idarticleIdArticle: string;
    idarticleDesignation: string;
    datemouvement: string;
    entree: number;
}

const DerniersMouvements: React.FC<{ limite: number }> = ({ limite }) => {
  const [mouvements, setMouvements] = useState<DerniersMouvementDto[]>([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchDerniersMouvements = async () => {
      try {
        const response = await axios.get(BASE_URL+`derniersmouvements/${limite}`);
        setMouvements(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des derniers mouvements', error);
      }
    };

    fetchDerniersMouvements();
  }, [limite]);

  const handleViewDetails = (identree:number) => {
    navigate(`/entrees/${identree}`);
  };

  return (
    <div className='derniers-mouvement'>
      <span><span className='badge-dernier'>dernières entrées</span></span>
      <br />
      <br />
      <ul>
        {mouvements.map((mouvement) => (
          <li key={mouvement.idarticleIdArticle} onClick={() => handleViewDetails(mouvement.entree)}>
            {mouvement.datemouvement} - {mouvement.idarticleDesignation} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DerniersMouvements;
