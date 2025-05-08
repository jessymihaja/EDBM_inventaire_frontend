import { Categorie } from "./tableArticles";

const colors = [
    
  "rgba(0, 0, 128, 0.6)", // Dark Blue
    "rgba(128, 0, 0, 0.6)", // Dark Red
    "rgba(128, 128, 128, 0.6)", // Dark Gray
    "rgba(0, 128, 0, 0.6)", // Dark Green
    "rgba(255, 140, 0, 0.6)", // Dark Orange
    "rgba(75, 0, 130, 0.6)", // Dark Indigo
    "rgba(128, 0, 128, 0.6)", // Dark Purple
    "rgba(255, 20, 147, 0.6)", // Dark Deep Pink
    "rgba(210, 180, 140, 0.6)", // Dark Tan
    "rgba(0, 139, 139, 0.6)", // Dark Teal
  ];
  
  const CustomBadge: React.FC<Categorie> = ({idCategorie, designation }) => {
    const badgeStyle: React.CSSProperties = {
      backgroundColor: colors[idCategorie % colors.length],
      color: 'white',
      padding: '0.3em 0.6em',
      borderRadius: '0.4em',
      fontSize: '0.9em',
      fontWeight: 'bold',
      display: 'inline-block',
      minWidth: '60px',
      textAlign: 'center'
    };
  
    return (
      <span style={badgeStyle}>
        {designation}
      </span>
    );
  };
  
  export default CustomBadge;