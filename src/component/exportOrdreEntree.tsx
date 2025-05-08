import React from 'react';
import { Page, Text, View, Document, StyleSheet,Font,Image} from '@react-pdf/renderer';
import {detailEntree, Entree } from './tableEntrees';
import { formatDateStringToFrench } from '../utils/Functions';


type ExportOrdreEntreePdfProps = {
  entree : Entree;
  sommeTotale: number;
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
    section: {
      marginBottom: 5,
      marginTop: 5,
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
    boldText: {
        fontWeight: 'bold',
    },
    titre: {
        marginLeft:'27%',
        fontSize:14,
        fontWeight: 'bold',
        textDecoration: 'underline', 

    },
    titre2: {
        marginLeft:'40%',
        fontSize:11,
        fontWeight: 'bold', 
        textDecoration: 'underline',

    },
    titre3: {
        marginTop:40,
        marginLeft:'40%',
        fontSize:10,
        fontWeight: 'bold', 

    },

    logo: {
        width: 120,
        height: 43,
        position: 'absolute',
        top: 20,
        left: 20,
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft:0,
      },
      leftColumn: {
        flex: 1, 
      },
      rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
      },
    
  });
  const { NumberToLetter } = require("convertir-nombre-lettre");
  const currentYear = new Date().getFullYear();
  const today = new Date();
const currentDate = today.toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const ExportOrdreEntree: React.FC<ExportOrdreEntreePdfProps> = ({ entree,sommeTotale}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={require('../assets/img/logo-edbm-violet.png')} />  
            <View style={styles.section}>
                <Text style={styles.titre3}>BUDGET AUTONOME {currentYear}</Text>
            </View>  
            <Text>{"\n"}</Text>
            <View style={styles.section}>
                <Text style={styles.titre}>MATERIEL EN APPROVISIONNEMENT</Text>
            </View>
            <Text>{"\n"}</Text>
            <View style={styles.section}>
                <Text style={styles.titre2}>ORDRE D'ENTREE</Text>
            </View>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <View style={styles.section}>
                <Text style={styles.boldText}>Numéro d'ordre du journal N°{entree.id}</Text>
                <Text>Seront portés entrée dans les ecritures du Comptable dépositaire les matériels et objet ci après désignés provenant</Text>
                <Text>de la facture N°{entree.numfactureprovenance} , du {formatDateStringToFrench(entree.dateentree)} ,Société {entree.provenance} ,ADRESSE {entree.adresseprovenance}</Text>
            </View>
            <Text>{"\n"}</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>numero nomenclature sommaire</Text>
                <Text style={styles.tableCellHeader}>Designation du materiel et objet</Text>
                <Text style={styles.tableCellHeader}>Especes des unités</Text>
                <Text style={styles.tableCellHeader}>Quantité</Text>
                <Text style={styles.tableCellHeader}>Prix Unitaire</Text>
                <Text style={styles.tableCellHeader}>somme</Text>
                </View>
                {entree.detailEntrees.map((detail: detailEntree, index: number) => (
                <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCell}>{detail.id}</Text>
                    <Text style={styles.tableCell}>{detail.idarticle.designation}</Text>
                    <Text style={styles.tableCell}>{detail.idarticle.unite}</Text>
                    <Text style={styles.tableCell}>{detail.quantite}</Text>
                    <Text style={styles.tableCell}>{detail.prixunitaire.toLocaleString('fr-FR')}</Text>
                    <Text style={styles.tableCellLast}>{(detail.prixunitaire*detail.quantite).toLocaleString('fr-FR')}</Text>
                </View>
                ))}
            </View>
            <Text>{"\n"}</Text>
            <View style={styles.section}>
                <Text>ARRETE le présent ordre d'entrée à {entree.detailEntrees.length} article(s)</Text>
            </View>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <View style={styles.section}>  
                <Text style={styles.boldText}>SOMME TOTALE: {sommeTotale.toLocaleString('fr-FR')} AR</Text>
                <Text style={styles.boldText}>Evaluée à la somme de  : {NumberToLetter(sommeTotale).toUpperCase()} ARIARY</Text>
            </View>
            <Text>{"\n"}</Text>
            <View style={styles.container}>
                
                <View style={styles.leftColumn}>
                    <Text>Le comptable prendra en charge les matières</Text>
                    <Text>et objet désignés ci-dessus dont j'ai vérifié la concordance avec</Text>
                    <Text>le procès verbal de recensement.</Text>
                    <Text>{"\n"}</Text>
                    <Text>Antananarivo le {currentDate}</Text> 
                    <Text>{"\n"}</Text>
                    <Text>{"\n"}</Text>
                    <Text style={styles.boldText}>L'ORDONNATEUR EN MATIERE</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text>Declaration de pris en charge</Text>
                    <Text>Le Comptable déclare avoir reçu et pris en charge</Text>
                    <Text>les matières et objets mentionés dans le tableau</Text>
                    <Text>ci-dessus</Text>
                    <Text>Antananarivo, le {currentDate}</Text>
                    <Text>{"\n"}</Text>
                    <Text>{"\n"}</Text>
                    <Text style={styles.boldText}>le Comptable Dépositaire</Text>
                </View>
            </View>
        </Page>
  </Document>
);

export default ExportOrdreEntree;
