import { Page, Text, View, Document, StyleSheet,Font,Image} from '@react-pdf/renderer';
import { BonProps, DetailBonProps } from "../page/PossessionPage";
import { User2 } from "../utils/Functions";
import { etatArticle } from '../types/Variables';

type ExportBonPdfProps = {
    bon : BonProps;
    user: User2
    };
    Font.register({
        family: 'Roboto',
    fonts: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
    ],
  });
  const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize:8,
        fontFamily:'Roboto',
      },
      logo: {
        width: 120,
        height: 43,
        position: 'absolute',
        top: 20,
        left: 20,
      },
      logo2: {
        width: 200,
        height: 80,
        position: 'absolute',
        top: 20,
        left: 220,
      },
      section: {
        marginBottom: 5,
        marginTop: 5,
      },
      titre: {
        marginLeft:'27%',
        fontSize:14,
        fontWeight: 'bold',
    },
    titre2: {
        marginLeft:'13%',
        fontSize:14,
    },
    boldText: {
        fontWeight: 'bold',
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
      },
      tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
      },
      tableCellHeader: {
        flex: 1,
        padding: 5,
        borderRightWidth: 1,
        borderRightColor: '#000',
      },
      tableCell: {
        flex: 1,
        padding: 5,
        borderRightWidth: 1,
        borderRightColor: '#000',
      },
      tableCellLast: {
        flex: 1,
        padding: 5,
      },
      leftColumn: {
        flex: 1, 
      },
      rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft:0,
      },
      tableCellQuantite: {
        paddingTop:3,
        width:'6%',
        borderRightWidth: 1,
        borderRightColor: '#000',
        textAlign:'center'
      },
      tableCellNombre: {
        flex: 1,
        padding: 5,
        borderRightWidth: 1,
        borderRightColor: '#000',
        textAlign:'right',
      },
      tableCellHeaderQuantite: {
        paddingTop:3,
        paddingBottom:3,
        width:'6%',
        borderRightWidth: 1,
        borderRightColor: '#000',
        textAlign:'center',
        
      },

  });
  const today = new Date();
  const currentDate = today.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const { NumberToLetter } = require("convertir-nombre-lettre");
  const currentYear = new Date().getFullYear();
  const userAdmin = localStorage.getItem("user");
    let userData = null;

    if (userAdmin) {
    try {
        userData = JSON.parse(userAdmin);
    } catch (e) {
        console.error("Invalid JSON data: ", e);
    }
    }

  const ExportBon: React.FC<ExportBonPdfProps> = ({bon,user}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={require('../assets/img/logo-edbm-violet.png')} />  
            <Image style={styles.logo2} src={require('../assets/img/logo_presidence.png')} />  
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <View style={styles.section}><Text>___________________________________________________________________________________________________________________________________________________</Text></View>
            <View style={styles.section}>
                <Text style={styles.titre}>BON DE DETENTION N° {bon.id}-{currentYear}-EDBM</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.titre2}>REMIS A UN DETENTEUR EFFECTIF (BON DETENTEUR EFFECTIF)</Text>
            </View>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <View style={styles.section}>
                <Text style={styles.boldText}>
                    Nom et fonction du Dépositaire comptable :{userData?.fullName} ; DEPOSITAIRE COMPTABLE
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.boldText}>
                    Nom et adresse exacte du detentaire : {user.nom} de l'EDBM,Lot................................................................................................
                </Text>
            </View>
            <Text>{"\n"}</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Désignation détaillée des objets </Text>
                    <Text style={styles.tableCellHeader}>Especes des unités</Text>
                    <Text style={styles.tableCellHeader}>Prix Unitaire</Text>
                    <Text style={styles.tableCellHeaderQuantite}>Quantité</Text>
                    <Text style={styles.tableCellHeader}>Valeur en écritures</Text>
                    <Text style={styles.tableCellHeader}>Provenance</Text>
                    <Text style={styles.tableCellHeader}>Etat des objets</Text>
                    <Text style={styles.tableCellHeader}>Observation</Text>
                </View>
                {bon.detailBonDetentions.map((detail:DetailBonProps,index:number)=>(
                    <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCell}>{detail.refarticle.iddetailEntree.idarticle.designation}_{detail.refarticle.refarticle}</Text>
                    <Text style={styles.tableCell}>{detail.refarticle.iddetailEntree.idarticle.unite}</Text>
                    <Text style={styles.tableCellNombre}>{detail.refarticle.iddetailEntree.prixunitaire.toLocaleString('fr-FR')}</Text>
                    <Text style={styles.tableCellQuantite}>1</Text>
                    <Text style={styles.tableCellNombre}>{detail.refarticle.iddetailEntree.prixunitaire.toLocaleString('fr-FR')}</Text>
                    <Text style={styles.tableCell}>{detail.refarticle.iddetailEntree.provenance}</Text>
                    <Text style={styles.tableCell}>{etatArticle[detail.etat]}</Text>
                    <Text style={styles.tableCellLast}></Text>
                </View>
                ))}
            </View>
            <Text>{"\n"}</Text>
            <View style={styles.section}>
            <Text>ARRETE le present inventaire à : {bon.detailBonDetentions.length} ({NumberToLetter(bon.detailBonDetentions.length)}) </Text>
            <Text>En cas de perte ou de non réintegration , ces article sont remboursés par le detenteur a leur valeur de remplacement ;
                 les réparations des détériorations sont également à la charge du détenteur.</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    <Text style={styles.boldText}>Reconnu  exact en quantités et qualité :</Text>
                    <Text style={styles.boldText}>Le Détenteur,</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.boldText}>Antananarivo, le {currentDate}</Text>
                    <Text style={styles.boldText}>le Dépositaire Comptable </Text>
                </View>
            </View>
        </Page>
    </Document>

  );

  export default ExportBon;
