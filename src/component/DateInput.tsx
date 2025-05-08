import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Table } from 'react-bootstrap';
import { BASE_URL} from '../types/Variables';

import { ReactTyped} from 'react-typed';
import BouttonStockExport from './BoutonStockExport';

export interface Stock{
    idArticle : String;
    designation : String;
    unite : String;
    prixUnitaire: number;
    quantiteAvant:number;
    quantiteEntree : number;
    quantiteSortie : number;
    quantiteApres : number;
}
const DateInput: React.FC = () => {
  const [date1, setDate1] = useState<string>('');
  const [date2, setDate2] = useState<string>('');
  const [results, setResults] = useState<Stock[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [decompte,setDecompte] = useState<number>(0);
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const formatDate = (date: Date) => date.toISOString().slice(0, 10);
    const firstOfYear = new Date(year, 0, 1);
    setDate1(formatDate(firstOfYear));
    setDate2(formatDate(today));
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    
    if (!date1 || !date2) {
      setError('Veuillez remplir les deux dates.');
      return;
    }

    if (new Date(date1) > new Date(date2)) {
      setError('La première date doit être plus récente que la seconde.');
      return;
    }

    try {
        const response = await axios.get(BASE_URL+`stats`, {
            params: { date1, date2 }
        });
      setResults(response.data);

      const response2 = await axios.get(BASE_URL+`decompteDate`,{
        params: { date1, date2 }
      })
      setDecompte(response2.data);
    } catch (err) {
      setError(error);
      console.error(err);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="date1">
          <Form.Label>Date debut</Form.Label>
          <Form.Control
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="date2">
          <Form.Label>Date fin</Form.Label>
          <Form.Control
            type="date"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
          />
        </Form.Group>
        {error && 
            <div className="text-danger">
                <ReactTyped
                    strings={[error]}
                    typeSpeed={50}
                    backSpeed={50}
                    loop
                />                
            </div>
        }
        <br></br>
        <Button variant="secondary" type="submit">
          Soumettre
        </Button>
      </Form>

      {results.length > 0 && (
        <div>
            <BouttonStockExport stock={results} date1={date1} date2={date2} total={decompte}></BouttonStockExport>
            <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                <th>Ref Article</th>
                <th>Désignation</th>
                <th>Espèce des unités</th>
                <th>Prix Unitaire</th>
                <th>existant au {date1}</th>
                <th>Quantité Entrée</th>
                <th>Quantité Sortie</th>
                <th>reste au {date2}</th>
                <th>Décompte</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, index) => (
                <tr key={index}>
                    <td >{result.idArticle}</td>
                    <td>{result.designation}</td>
                    <td className='text-center'>{result.unite}</td>
                    <td className='text-end'>{result.prixUnitaire.toLocaleString('fr-FR')}</td>
                    <td className='text-center'>{result.quantiteAvant}</td>
                    <td className='text-center'>{result.quantiteEntree}</td>
                    <td className='text-center'>{result.quantiteSortie}</td>
                    <td className='text-center'>{result.quantiteApres}</td>
                    <td className='text-end'>{(result.quantiteApres*result.prixUnitaire).toLocaleString('fr-FR')}</td>
                </tr>
                ))}
            </tbody>
            </Table>
            <br />
            <Table striped bordered hover className="mt-4">
              <tr>
                <th>TOTAL</th>
                <th style={{padding:'10px',textAlign: 'right'}}>{decompte?.toLocaleString('fr-FR')} Ar</th>
              </tr>
            </Table>
        </div>
      )}
    </div>
  );
};

export default DateInput;
