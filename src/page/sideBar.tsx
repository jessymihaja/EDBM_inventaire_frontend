import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaBoxes, FaExchangeAlt, FaBoxOpen,FaAngleDown, FaAngleRight, FaClipboardList,FaTicketAlt } from 'react-icons/fa';
import '../assets/css/sideBar.css'    

const SideBar = () => {
    const [showMouvements, setShowMouvements] = useState(false);
  const [showArticles, setShowArticles] = useState(false);
  const [showDemandes, setShowDemandes] = useState(false);

  const toggleMouvements = () => setShowMouvements(!showMouvements);
  const toggleArticles = () => setShowArticles(!showArticles);
  const toggleDemandes = () => setShowDemandes(!showDemandes);

  return (
    <div className="d-flex flex-column vh-50 sidebar-container">
      <h5 className="sidebar-header">Menu</h5>
      <Nav className="flex-column">
        <Nav.Link href="/" className="nav-link-custom">
          <FaHome className="nav-icon" /> Home
        </Nav.Link>
        <Nav.Link href="/stock" className="nav-link-custom">
          <FaBoxes className="nav-icon" /> Stock
        </Nav.Link>
        
        {/* Menu Mouvements */}
        <Nav.Link onClick={toggleMouvements} className="nav-link-custom" style={{ cursor: 'pointer' }}>
          <FaExchangeAlt className="nav-icon" /> Mouvements {showMouvements ? <FaAngleDown /> : <FaAngleRight />}
        </Nav.Link>
        {showMouvements && (
          <Nav className="flex-column submenu">
            <Nav.Link href="/mouvements/entree" className="nav-link-custom">
              Entrée
            </Nav.Link>
            <Nav.Link href="/mouvements/sortie" className="nav-link-custom">
              Sortie
            </Nav.Link>
          </Nav>
        )}

        {/* Menu Articles */}
        <Nav.Link onClick={toggleArticles} className="nav-link-custom" style={{ cursor: 'pointer' }}>
          <FaBoxOpen className="nav-icon" /> Articles {showArticles ? <FaAngleDown /> : <FaAngleRight />}
        </Nav.Link>
        {showArticles && (
          <Nav className="flex-column submenu">
            <Nav.Link href="/articles/article" className="nav-link-custom">
              Article
            </Nav.Link>
            <Nav.Link href="/articles/categorie" className="nav-link-custom">
              Catégorie
            </Nav.Link>
            <Nav.Link href="/articles/detailArticle" className="nav-link-custom">
              Detail Article
            </Nav.Link>
          </Nav>
        )}
        <Nav.Link onClick={toggleDemandes} className="nav-link-custom" style={{ cursor: 'pointer' }}>
          <FaClipboardList className="nav-icon" /> demandes obtention {showDemandes ? <FaAngleDown /> : <FaAngleRight />}
        </Nav.Link>
        {showDemandes && (
          <Nav className="flex-column submenu">
            <Nav.Link href="/listeDemande" className="nav-link-custom">
              En attente
            </Nav.Link>
            <Nav.Link href="/listeDemandeConfirmes" className="nav-link-custom">
              à traiter
            </Nav.Link>
            <Nav.Link href="listeDemandeSuspendus" className="nav-link-custom">
              suspendus
            </Nav.Link>
          </Nav>
        )}
        <Nav.Link href="/AdminBonDetentionList" className="nav-link-custom">
          <FaTicketAlt className="nav-icon" />Liste des bons
        </Nav.Link>
      </Nav>
    </div>
  );
}
export default SideBar;