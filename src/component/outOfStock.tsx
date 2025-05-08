import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, ERREUR_RECUP } from '../types/Variables';
import '../assets/css/dashboard.css';

interface Article {
  idarticle: string;
  designation: string;
}

const OutOfStock: React.FC<{ limite: number }> = ({ limite }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchOutOfStock = async () => {
      try {
        const response = await axios.get(BASE_URL+`articles/outofstock/${limite}`);
        setArticles(response.data);
      } catch (error) {
        console.error(ERREUR_RECUP, error);
      }
    };

    fetchOutOfStock();
  }, [limite]);

  return (
    <div className='outofstock'>
      <span><span className='badge-rupture'>rupture stock</span></span>
      <br />
      <br />
      <ul>
        {articles.map(article => (
          <li key={article.idarticle}>
            {article.designation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutOfStock;
