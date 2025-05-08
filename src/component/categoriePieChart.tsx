import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { BASE_URL, ERREUR_RECUP } from '../types/Variables';
import '../assets/css/dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategorieStockData {
    designation: string;
    nombrearticlesenstock: number;
}

const CategoriePieChart: React.FC = () => {
  const [categorieData, setCategorieData] = useState<CategorieStockData[]>([]);
  
  useEffect(() => {
    
    axios.get(BASE_URL+'stockparcategorie')
      .then((response) => {
        setCategorieData(response.data);
      })
      .catch((error) => {
        console.error(ERREUR_RECUP, error);
      });
  }, []);


  const labels = categorieData.map(c => c.designation);
  const dataQuantities = categorieData.map(c => c.nombrearticlesenstock);


  const backgroundColors = [
    'rgba(54, 162, 235, 0.6)', // Blue
    'rgba(255, 99, 132, 0.6)', // Red
    'rgba(255, 206, 86, 0.6)', // Yellow
    'rgba(75, 192, 192, 0.6)', // Green
    'rgba(153, 102, 255, 0.6)', // Purple
    'rgba(255, 159, 64, 0.6)', // Orange
    'rgba(201, 203, 207, 0.6)', // Gray
  ];

  const pieData = {
    labels: labels,
    datasets: [
      {
        label: 'Quantité en stock',
        data: dataQuantities,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='graph-pie'>
      <h5>Articles en stock par catégorie</h5>
      <div style={{ marginLeft: '160px' ,height:'250px'}}>
        <Doughnut data={pieData} />
      </div>
    </div>
  );
};

export default CategoriePieChart;
