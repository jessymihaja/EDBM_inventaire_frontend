import React from 'react';
import { CloseButton, Offcanvas } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp, FaBalanceScale, FaBox,FaDollarSign, FaTags } from 'react-icons/fa';
import "../assets/css/offCanvas.css"
import { Categorie } from './tableArticles';
import CustomBadge from './costumBadge';

interface StockData {
  idarticle: string;
  designation: string;
  unite: string;
  pu: number;
  quantiteentree: number;
  quantitesortie: number;
  quantitereste: number;
}

interface StockOffcanvasProps {
  show: boolean;
  handleClose: () => void;
  stockData: StockData | null;  
  categorie:Categorie | null;
}

const StockOffcanvas: React.FC<StockOffcanvasProps> = ({ show, handleClose, stockData,categorie }) => {
    return (
        <Offcanvas show={show} onHide={handleClose} backdrop={false} placement="end">
          <Offcanvas.Header>
            <Offcanvas.Title>Stock Information</Offcanvas.Title>
            <CloseButton onClick={handleClose}/>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {stockData && (
              <div className="stock-info">
                <div className="stock-item">
                {categorie && (
                    <CustomBadge
                    idCategorie={categorie.idCategorie}
                    designation={categorie.designation}
                    ></CustomBadge>
                )}
                </div>
                <div className="stock-item">
                  <FaBox className="stock-icon" /> 
                  <span className="label">Article ID:</span> {stockData.idarticle}
                </div>
                <div className="stock-item">
                  <FaTags className="stock-icon" />
                  <span className="label">Designation:</span> {stockData.designation}
                </div>
                <div className="stock-item">
                  <FaBalanceScale className="stock-icon" />
                  <span className="label">Unité:</span> {stockData.unite}
                </div>
                <div className="stock-item">
                  <FaDollarSign className="stock-icon" />
                  <span className="label">Prix unitaire moyen:</span> {stockData.pu.toLocaleString()} Ar
                </div>
                <div className="stock-item">
                  <FaArrowDown className="stock-icon" />
                  <span className="label">Quantité entrée:</span> {stockData.quantiteentree}
                </div>
                <div className="stock-item">
                  <FaArrowUp className="stock-icon" />
                  <span className="label">Quantité sortie:</span> {stockData.quantitesortie}
                </div>
                <div className="stock-item">
                  <FaBox className="stock-icon" />
                  <span className="label">Reste en stock:</span> {stockData.quantitereste}
                </div>
              </div>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      );
};

export default StockOffcanvas;
