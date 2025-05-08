
import { useEffect, useState } from "react";
import { BASE_URL, etatArticle} from "../types/Variables";
import { BonProps } from "./PossessionPage";
import { fetchUserData, User2 } from "../utils/Functions";
import { Button, Card, Form} from "react-bootstrap";
import BouttonBonExport from "../component/BoutonBonexport";
import CardPlaceholder from "../component/cardPlaceholder";
import { sendEmail } from "../component/SendEmail";
import "react-datepicker/dist/react-datepicker.css";
import DateFinModal from "../component/DateFinModal";
import CustomToast from "../component/CostumToast";

const AdminBonDetentionList = () => {
    const [bons, setBons] = useState<BonProps[]>([]);
    const [employeMap, setEmployeMap] = useState<{ [key: string]: User2 }>({});
    const [selectedEmploye, setSelectedEmploye] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedBon, setSelectedBon] = useState<BonProps | null>(null);
  
    const handleShowModal = (bon: BonProps) => {
      setSelectedBon(bon);
      setShowModal(true);
    };
  
    const handleHideModal = () => {
      setShowModal(false);
    };

    const fetchBons = async () => {
        try {
            setLoading(true);
            const response = await fetch(BASE_URL+"bonsDetention");
            const bonsData = await response.json();
            setBons(bonsData);

            
            const token = localStorage.getItem("token");
            if (token) {
                const uniqueEmployeIds = [...new Set(bonsData.map((bon: BonProps) => bon.idemploye))];
                const employeMapData: { [key: string]: User2 } = {};

                for (const employeId of uniqueEmployeIds) {
                    if (typeof employeId === 'string') {
                        await fetchUserData(employeId as string, token, (data: User2) => {
                            employeMapData[employeId] = data;
                        }, setLoading);
                    } else {
                        console.warn(`Employé ID non valide: ${employeId}`);
                    }
                }

                setEmployeMap(employeMapData);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des bons de détention", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBons();
    }, []);

    
    const handleEmployeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedEmploye(selectedValue); 
    };
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const showSucces= () =>{
        setToast({ message: "mail envoyé", type: 'success' });
    }

    
    const filteredBons = selectedEmploye
        ? bons.filter((bon) => bon.idemploye === selectedEmploye)
        : bons;

    return (
        <div className="App">
             {toast && (
                <CustomToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        <div className="container mt-4">
            <h2>Liste des Bons de Détention</h2>
            {loading ? (
                <CardPlaceholder></CardPlaceholder>
            ) : (
                <>
                    
                    <Form.Group controlId="employeFilter" className="mb-3" style={{width:"40%"}}>
                        <Form.Label>Filtrer par Employé</Form.Label>
                        <Form.Select as="select" value={selectedEmploye} onChange={handleEmployeChange}>
                        <option value="">Tous les employés</option>
                        {Object.keys(employeMap).map((employeId) => (
                            <option key={employeId} value={employeId}>
                                {employeMap[employeId]?.nom}
                            </option>
                        ))}
                    </Form.Select>
                    </Form.Group>

                    {filteredBons.map((bon) => (
                        <Card key={bon.id} className="mb-3" style={{ width: "30%", float: "left", marginRight: "20px" }}>
                            <Card.Header>
                                <h5>Bon de Détention #{bon.id}</h5>
                                <p>Employé: {employeMap[bon.idemploye]?.nom}</p>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <strong>Date du Bon :</strong> {bon.dateBon} <br />
                                    <strong>Date de Fin :</strong> {bon.dateFin ? bon.dateFin : "En cours"} <br />
                                    <strong>Détails :</strong>
                                    <ul>
                                        {bon.detailBonDetentions.map((detail) => (
                                            <li key={detail.id}>
                                                {detail.refarticle.iddetailEntree.idarticle.designation} - 
                                                Réf: {detail.refarticle.refarticle} - État: {etatArticle[detail.etat]}
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Text>
                                <BouttonBonExport bon={bon} user={employeMap[bon.idemploye]}></BouttonBonExport>
                                {bon.dateFin === null && (
                                    <>
                                        <Button variant="primary" 
                                        onClick={() => handleShowModal(bon)}  
                                        style={{ marginTop: "10px", marginLeft: "10px" }}>
                                            recuperer
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            style={{ marginTop: "10px", marginLeft: "10px" }}
                                            onClick={() => sendEmail(employeMap[bon.idemploye]?.email || "", bon)}
                                            onClickCapture={()=> showSucces()}
                                        >
                                            Envoyer Email
                                        </Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                    {selectedBon && (
                    <DateFinModal
                        show={showModal}
                        onHide={handleHideModal}
                        bon={selectedBon}
                    />
                    )}
                </>
            )}
        </div>
        </div>
    );
};

export default AdminBonDetentionList;