import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/DemandStatusBar.css";
import { BASE_URL, etatDemandeMap } from "../types/Variables";

interface DemandStatus {
  etatdemande: number;
  nombre: number;
}

const DemandStatusBar: React.FC = () => {
  const [data, setData] = useState<DemandStatus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL+`nombreEtat`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching demand status data:", error);
      }
    };

    fetchData();
  }, []);

  const total = data.reduce((sum, item) => sum + item.nombre, 0);

  const getColor = (etatdemande: number) => {
    switch (etatdemande) {
      case 1:
        return "rgb(247, 103, 7)"; 
      case 0:
        return "gray";
      case 5:
        return "rgb(66, 153, 225)"; 
      case 9:
        return "rgb(47, 179, 68)"; 
      default:
        return "lightgray";
    }
  };

  return (
    <div className="demand-status-bar">
      <h4>Demande de Détention</h4>
      <div className="status-bar-container">
        {data.map((item, index) => (
          <div
            key={index}
            className="status-bar-segment"
            style={{
              backgroundColor: getColor(item.etatdemande),
              width: `${(item.nombre / total) * 100}%`,
            }}
            title={`État: ${etatDemandeMap[item.etatdemande]}, Nombre: ${item.nombre}`}
          ></div>
        ))}
      </div>
      <div className="status-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "rgb(247, 103, 7)" }}></span>
          Suspendu
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "gray" }}></span>
          En attente
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "rgb(66, 153, 225)" }}></span>
          À traiter
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "rgb(47, 179, 68)" }}></span>
          Terminé
        </div>
      </div>
    </div>
  );
};

export default DemandStatusBar;
