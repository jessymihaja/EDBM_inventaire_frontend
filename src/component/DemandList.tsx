import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/DemandList.css";
import { DemandeDetention } from "./DemandeDetentionCard";
import { BASE_URL, ERREUR_RECUP, etatDemandeMap } from "../types/Variables";

const DemandeList: React.FC<{ userId: string|null }> = ({ userId }) => {
  const [demandes, setDemandes] = useState<DemandeDetention[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get(
          BASE_URL+`demandeDetentionByIdEmploye/${userId}`
        );
        setDemandes(response.data);
      } catch (err) {
        setError(ERREUR_RECUP);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [userId]);


  if (loading) return <div>Chargement des demandes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="demande-list">
      <h3>Vos Demandes de Détention</h3>
      <table className="demande-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>État</th>
            <th>Justification</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td>{demande.id}</td>
              <td>{demande.datedemande}</td>
              <td >
                <span className={`badge etat-${demande.etatdemande}`}>{etatDemandeMap[demande.etatdemande]}</span>
              </td>
              <td>{demande.justification}</td>
              <td>
                <ul>
                  {demande.detailDemandeDetentions.map((detail) => (
                    <li key={detail.id}>{detail.idcategorie.designation}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemandeList;
