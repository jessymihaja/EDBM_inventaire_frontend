import { Nav } from 'react-bootstrap';
import { FaBox, FaFileAlt, FaHome} from 'react-icons/fa';
import '../assets/css/sideBar.css'    

const SideBarUser = () => {
  return (
    <div className="d-flex flex-column vh-50 sidebar-container">
      <h5 className="sidebar-header">Menu</h5>
      <Nav className="flex-column">
        <Nav.Link href="/homeUser" className="nav-link-custom">
          <FaHome className="nav-icon" /> Home
        </Nav.Link>
        <Nav.Link href="/demandeDetention" className="nav-link-custom">
          <FaFileAlt className="nav-icon" /> Demande d'obtention
        </Nav.Link>
        <Nav.Link href="/possession" className="nav-link-custom">
          <FaBox className="nav-icon" /> Materiel en possession 
        </Nav.Link>
       </Nav> 
        
    </div>
  );
}
export default SideBarUser;