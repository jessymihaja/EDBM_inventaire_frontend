import React from 'react';
import { FaFilePdf } from 'react-icons/fa';
import {PDFDownloadLink } from '@react-pdf/renderer';
import { Entree } from './tableEntrees';
import ExportOrdreEntree from './exportOrdreEntree';


type BouttonEntreeExportProps = {
  entree: Entree; 
  sommeTotale:number;
};

const BouttonEntreeExport: React.FC<BouttonEntreeExportProps> = ({ entree ,sommeTotale}) => {
    return (
      <div>
        <PDFDownloadLink
          document={<ExportOrdreEntree entree={entree} sommeTotale={sommeTotale}/>}
          fileName="entree_details.pdf"
        >
              <button className="button_export">
                <FaFilePdf style={{ marginRight: '5px' }} />
                Télécharger en PDF
              </button>
        </PDFDownloadLink>
      </div>
    );
};

export default BouttonEntreeExport;
