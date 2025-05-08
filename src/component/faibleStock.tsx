import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, ERREUR_RECUP } from '../types/Variables';
import '../assets/css/dashboard.css';


interface ResteArticleDTO {
    idarticleIdArticle: string;
    idarticleDesignation: string;
    reste: number;
}

const FaibleStock: React.FC<{ limite: number; seuil: number }> = ({ limite, seuil }) => {
  const [articles, setArticles] = useState<ResteArticleDTO[]>([]);

  useEffect(() => {
    const fetchFaibleStock = async () => {
      try {
        const response = await axios.get(BASE_URL+'articles/faiblestock', {
          params: {
            limite: limite,
            seuil: seuil,
          },
        });
        setArticles(response.data);
      } catch (error) {
        console.error(ERREUR_RECUP, error);
      }
    };

    fetchFaibleStock();
  }, [limite, seuil]);

  return (
    <div className='faiblestock'>
  <span><span className='badge-faible'>Faible stock</span></span>
  <br />
  <br />
  <ul>
    {articles.map(article => (
      <li key={article.idarticleIdArticle}>
        {article.idarticleDesignation}
        <span className="quantite-restante">
          {article.reste}
        </span>
      </li>
    ))}
  </ul>
</div>
  );
};

export default FaibleStock;
