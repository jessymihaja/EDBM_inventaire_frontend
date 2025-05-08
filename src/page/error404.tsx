
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Error404 = () =>{
    const navigate = useNavigate();
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);   
          const hasGestionnaireRole = userData.roles.some((role: { code: string }) => role.code === 'INVENTAIRE_GESTIONNAIRE');
          const hasUtilisateurRole = userData.roles.some((role: { code: string }) => role.code === 'INVENTAIRE_UTILISATEUR');
          
          const timer = setTimeout(() => {
            if (hasGestionnaireRole) {
              navigate('/');
            } else if (hasUtilisateurRole) {
              navigate('/homeUser');
            }
          }, 0);
          
          return () => clearTimeout(timer);
        }
      }, [navigate]);
    return (
        <div className="Error404">
            <Container fluid className="error404-container d-flex flex-column justify-content-center align-items-center">
                <Row className="text-center">
                    <Col>
                        <h1 className="error404-title">wait</h1>
                        <p className="error404-message">chargement en cours .</p>
                        <Spinner animation="border" variant="primary" className="loading-spinner" />
                        <p className="mt-3">Redirection en cours...</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Error404;