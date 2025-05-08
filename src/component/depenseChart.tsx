import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import '../assets/css/dashboard.css';
import '../assets/css/switch.css';
import { BASE_URL, ERREUR_RECUP } from '../types/Variables';

// Enregistrement des éléments nécessaires pour le chart mixte
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

interface Depense{
    totalDepenses:number;
    periode:String;
}
const DepenseChart: React.FC = () => {
    const [depenseData, setDepenseData] = useState<Depense[]>([]);
    const [intervalle, setIntervalle] = useState<string>('mois');
    const [date1, setDate1] = useState<string>('2024-01-01');
    const [date2, setDate2] = useState<string>('2024-12-31');
  
    useEffect(() => {
      const fetchDepenseData = async () => {
        try {
          const response = await axios.get(BASE_URL+'getdepense', {
            params: {
              intervalle,
              date1,
              date2,
            },
          });
          setDepenseData(response.data);
        } catch (error) {
          console.error(ERREUR_RECUP, error);
        }
      };
  
      fetchDepenseData();
    }, [intervalle, date1, date2]);
  
    
    const data = {
      labels: depenseData.map(d => d.periode), 
      datasets: [
        /*{
          type: 'bar' as const, 
          label: 'Dépenses',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: depenseData.map(d => d.totalDepenses), 
        },*/
        {
          type: 'line' as const, 
          label: 'Tendance',
          borderColor: 'rgba(153, 102, 255, 1)', 
          backgroundColor: 'rgba(153, 102, 255, 0.2)', 
          borderWidth: 2,
          fill: true,
          data: depenseData.map(d => d.totalDepenses), 
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Dépenses par période',
        },
      },
    };
  
    return (
      <div className='graph'>
        <h5>Graphique des Dépenses</h5>
  
        
        <div >
  
          <label htmlFor="date1"> Date Début : </label>
          <input type="date" id="date1" value={date1} onChange={(e) => setDate1(e.target.value)} />
          <label htmlFor="date2"> Date Fin : </label>
          <input type="date" id="date2" value={date2} onChange={(e) => setDate2(e.target.value)} />
          <div className="toggle-switch">
  <input
    type="checkbox"
    className="toggle-switch-checkbox"
    name="intervalleSwitch"
    id="intervalleSwitch"
    checked={intervalle === "mois"}
    onChange={(e) =>
      setIntervalle(e.target.checked ? "mois" : "semaine")
    }
  />
  <label className="toggle-switch-label" htmlFor="intervalleSwitch">
    <span className="toggle-switch-inner" data-yes="Mois" data-no="Semaine" />
    <span className="toggle-switch-switch" />
  </label>
</div>

        </div> 
  
        {/* <div style={{ height: '270px' }}>
          <Chart className='bar' type='bar' data={data} options={options} />
        </div>*/}
      </div>
    );
  };
  
  export default DepenseChart;