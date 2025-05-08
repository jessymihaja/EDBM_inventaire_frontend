import { useEffect, useState } from "react";
import DemandeDetentionCard, { DemandeDetention } from "../component/DemandeDetentionCard";
import ListeCardPlaceholder from "../component/listeCardPlaceholder";
import { BASE_URL, ERREUR_RECUP, ERROR_MAJ, SUCCES_AJOUT } from "../types/Variables";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import CustomToast from "../component/CostumToast";


const ListeDemande = () =>{
    const [demandes, setDemandes] = useState<DemandeDetention[] | null >();
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get<DemandeDetention[]>(BASE_URL+`demandeDetentionByEtatDemande/${0}`);
            setDemandes(response.data);
          } catch (error) {
            console.error(ERREUR_RECUP, error);
          }
        };
    
        fetchData();
      },[]);
    
      if (!demandes) return (
        <div className="App">
            <ListeCardPlaceholder></ListeCardPlaceholder>

        </div>
      );
    
      const handleUpdateEtat = async (id: number, etat: number) => {
        try {
            const response = await axios.put(BASE_URL+`demandes/${id}/etat`, { etatdemande: etat }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setToast({ message: SUCCES_AJOUT, type: 'success' });
            console.log(response.data);
            setTimeout(() => {
              window.location.reload();
          }, 1800);
        } catch (error) {
          setToast({ message: ERROR_MAJ, type: 'error' });
            console.error(ERROR_MAJ, error);
        }
    };


    return(
        <div className="App">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Demandes en attente </h2>
            </div>
            {toast && (
                <CustomToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <Container>
            <Row>
                {demandes.map((demande:DemandeDetention) => (
                    <Col md={4} key={demande.id}>
                        <DemandeDetentionCard 
                            demande={demande} 
                            onTraiter={handleUpdateEtat} 
                            onSuspendre={handleUpdateEtat} 
                            boutonTraiter={"à traiter"}
                            boutonSuspendre={"suspendre"}
                            etat1={5}
                            etat2={1}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
        </div>
    )
}
export default ListeDemande;