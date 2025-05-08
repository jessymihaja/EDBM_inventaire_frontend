import React from 'react';
import { Page, Text, View, Document, StyleSheet,Font,Image} from '@react-pdf/renderer';
import { Stock } from './DateInput';
import { formatDateToFrench } from '../utils/Functions';


type ExportOrdreEntreePdfProps = {
    stock : Stock[]
    date1:string
    date2:string
    total:number
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
        tableCellHeaderTotalValue: {
            flex: 1,
            padding: 5,
            borderRightWidth: 1,
            borderRightColor: '#000',
            fontWeight: 'bold',
            textAlign:'right'
          },
        tableCellHeaderTotal: {
            flex: 1,
            padding: 5,
            paddingRight:220,
            borderRightWidth: 1,
            borderRightColor: '#000',
            fontWeight: 'bold',
          },
        tableCellHeaderQuantite: {
            paddingTop:3,
            paddingBottom:3,
            width:'6%',
            borderRightWidth: 1,
            borderRightColor: '#000',
            textAlign:'center',
            
          },
        tableCell: {
          flex: 1,
          padding: 5,
          borderRightWidth: 1,
          borderRightColor: '#000',
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
        tableCellLast: {
          flex: 1,
          padding: 5,
        },
        boldText: {
            fontWeight: 'bold',
        },
    
        logo: {
            width: 120,
            height: 43,
            position: 'absolute',
            top: 20,
            left: 20,
          },
          titre3: {
            marginTop:40,
            marginLeft:'40%',
            fontSize:10,
            fontWeight: 'bold', 
    
        },
        titre31: {
            marginLeft:'41%',
            fontSize:10,
            fontWeight: 'bold', 
        },
        entete1: {
            marginLeft:'30%',
            fontSize:8,
            fontWeight: 'bold', 
        },
        entete2: {
            fontSize:8,
            fontWeight: 'bold', 
        },
        entete3: {
            fontSize:8,
            fontWeight: 'bold',
            marginLeft:'22%', 
        },
        titre: {
            marginLeft:'40%',
            fontSize:14,
            fontWeight: 'bold',
            textDecoration: 'underline', 
    
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
    const ExportStock: React.FC<ExportOrdreEntreePdfProps> = ({ stock,date1,date2,total}) => (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image style={styles.logo} src={require('../assets/img/logo-edbm-violet.png')} />  
                <View style={styles.section}>
                    <Text style={styles.titre3}>BUDGET AUTONOME</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.titre31}>EXERCICE {currentYear}</Text>
                    <Text style={styles.entete1}>CHAPITRE__________,ARTICLE__________,PARAGRAPHE__________</Text>
                </View>    
                <Text>{"\n"}</Text>
                <View style={styles.section}>
                    <Text style={styles.entete2}>Service d (1) ________________________________________________</Text>
                    <Text style={styles.entete2}>hôtel du (2) ________________________________________________</Text>
                </View>
                <Text>{"\n"}</Text>
                <View style={styles.section}>
                    <Text style={styles.titre}>INVENTAIRE</Text>
                </View>
                <Text>{"\n"}</Text>
                <View style={styles.section}>
                    <Text style={styles.entete3}> du mobilier et des objets d'ameublement existant au {formatDateToFrench(date2)}</Text>
                </View>
                <Text>{"\n"}</Text>


                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Désignation du matériel</Text>
                        <Text style={styles.tableCellHeader}>Espèces des unités</Text>
                        <Text style={styles.tableCellHeader}>Prix de l'unité</Text>
                        <Text style={styles.tableCellHeaderQuantite}>Existant au {formatDateToFrench(date1)}</Text>
                        <Text style={styles.tableCellHeaderQuantite}>Entrée </Text>
                        <Text style={styles.tableCellHeaderQuantite}>Sortie </Text>
                        <Text style={styles.tableCellHeaderQuantite}>Reste au {formatDateToFrench(date2)} </Text>
                        <Text style={styles.tableCellHeader}>Décompte</Text>
                        <Text style={styles.tableCellHeader}>Observation</Text>
                    </View>
                    {stock.map((stock: Stock , index: number) => (
                    <View style={styles.tableRow} key={index}>
                        <Text style={styles.tableCell}>{stock.designation}</Text>
                        <Text style={styles.tableCell}>{stock.unite}</Text>
                        <Text style={styles.tableCellNombre}>{stock.prixUnitaire.toLocaleString('fr-FR')}</Text>
                        <Text style={styles.tableCellQuantite}>{stock.quantiteAvant}</Text>
                        <Text style={styles.tableCellQuantite}>{stock.quantiteEntree}</Text>
                        <Text style={styles.tableCellQuantite}>{stock.quantiteSortie}</Text>
                        <Text style={styles.tableCellQuantite}>{stock.quantiteApres}</Text>
                        <Text style={styles.tableCellNombre}>{(stock.quantiteApres*stock.prixUnitaire).toLocaleString('fr-FR')}</Text>
                        <Text style={styles.tableCellLast}></Text>
                    </View>
                    ))}
                </View>
                <Text>{"\n"}</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeaderTotal}>TOTAL GENERAL</Text>
                        <Text style={styles.tableCellHeaderTotalValue}>{total.toLocaleString('fr-FR')}</Text>
                    </View>
                </View>
                <Text>{"\n"}</Text>
                <View style={styles.boldText}>
                    <Text>ARRETE le présent ordre d'entrée à {stock.length} articles et à la somme de : {NumberToLetter(Math.round(total)).toUpperCase()} Ariary</Text>
                    <Text>Fait en double à Antananarivo ,le {currentDate}.</Text>
                </View>
                <View style={styles.container}>
                
                    <View style={styles.leftColumn}>
                        <Text>Vu et reconnu exacte:</Text>
                        <Text>{"\n"}</Text>
                        <Text>Antananarivo le {currentDate}</Text> 
                        <Text>{"\n"}</Text>
                        <Text>{"\n"}</Text>
                        <Text style={styles.boldText}>L'ORDONNATEUR EN MATIERE</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text>{"\n"}</Text>
                        <Text>{"\n"}</Text>
                        <Text>{"\n"}</Text>
                        <Text>{"\n"}</Text>
                        <Text>{"\n"}</Text>
                        <Text>{"\n"}</Text>
                        <Text style={styles.boldText}>le Comptable Dépositaire</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );

export default ExportStock;
