
import { Stock } from "./DateInput";
import { FaFilePdf } from "react-icons/fa";
import {PDFDownloadLink } from "@react-pdf/renderer";
import ExportStock from "./exportStock";

type BouttonStockExportProps = {
    stock : Stock[]
    date1:string
    date2:string
    total:number
   
  };
  
  const BouttonStockExport: React.FC<BouttonStockExportProps> = ({ stock,date1,date2,total}) => {
      return (
        <div>
          <PDFDownloadLink
            document={<ExportStock stock={stock} date1={date1} date2={date2} total={total} />}
            fileName="stock.pdf"
          >
                <button className="button_export">
                  <FaFilePdf style={{ marginRight: '5px' }} />
                  Télécharger en PDF
                </button>
          </PDFDownloadLink>
        </div>
      );
  };
  
  export default BouttonStockExport;
  