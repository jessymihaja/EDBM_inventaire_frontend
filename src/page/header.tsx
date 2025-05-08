import { FaExchangeAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import logo from '../assets/img/logo.png';
import { AUTH_URL } from "../types/Variables";
import { Dropdown } from "react-bootstrap";


const Header = () => {
    const handleLogout = () => {
      localStorage.removeItem('user');
      window.location.href = `${AUTH_URL}sign-out`;
        console.log('Déconnexion');
      };
      const handleChangeApp = () => {
        window.location.href = `${AUTH_URL}`;
        console.log('changing app ');
        
      };
      const user=localStorage.getItem("user")
      if(user) {
        const userData=JSON.parse(user)
      
      return (
        <div className="header-container">
            
          <div className="header-tittle"> 
            <img src={logo} alt="Logo" className="header-logo" />
            <h4>Inventaire</h4>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-avatar">
              <span className="infoUser">
                <FaUser size={24} style={{color:"white", marginRight: "8px"}} />
                <span>
                  {userData.fullName}<br />
                  {userData.email}
                </span>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleChangeApp}><FaExchangeAlt style={{ marginRight: '5px' }} />Changer d'app</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
                <FaSignOutAlt style={{ marginRight: '5px' }} /> Déconnexion
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
        </div>
      )};
}
export default Header;