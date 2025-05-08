import {PDFDownloadLink } from "@react-pdf/renderer";
import { BonProps } from "../page/PossessionPage";
import { User2 } from "../utils/Functions";
import { FaFilePdf } from "react-icons/fa";
import ExportBon from "./ExportBon";

type BouttonBonExportProps = {
    bon : BonProps;
    user: User2
  };
  
  const BouttonBonExport: React.FC<BouttonBonExportProps> = ({ bon,user}) => {
      return (
        <div>
          <PDFDownloadLink
            document={<ExportBon bon={bon} user={user} />}
            fileName="bondetention.pdf"
          >
                <button className="button_export">
                  <FaFilePdf style={{ marginRight: '5px' }} />
                  Télécharger en PDF
                </button>
          </PDFDownloadLink>
        </div>
      );
  };
  
  export default BouttonBonExport;
  