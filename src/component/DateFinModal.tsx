import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'; 
import { BASE_URL, ERROR_MAJ, SUCCESS_MAJ } from '../types/Variables';
import CustomToast from './CostumToast';


interface BonProps {
  id: number;
  dateFin?: string | null;
  dateBon: string;
}

interface DateFinModalProps {
  show: boolean;
  onHide: () => void;
  bon: BonProps;
}

const DateFinModal = ({ show, onHide, bon }: DateFinModalProps) => {

const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const updateDateFin = async (bonId: number, dateFin: Date) => {
    try {
      await axios.put(BASE_URL+`updateDateBon/${bonId}`, { dateFin: dateFin.toISOString() });
      setTimeout(() => {
        onHide();
        window.location.reload();
    }, 1800);
    setToast({ message: SUCCESS_MAJ, type: 'success' });
      console.log(SUCCESS_MAJ);
      
    } catch (error) {
        setToast({ message: ERROR_MAJ, type: 'error' });
      console.error(ERROR_MAJ, error);
      console.log("dateFin : "+dateFin.toISOString());
    }
  };

  const handleSave = () => {
    if (selectedDate && bon.id) {
      updateDateFin(bon.id, selectedDate);
    }
  };

  return (
    <>
   7
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Mettre à jour la Date de Fin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="dateFin">
            <Form.Label>Date de Fin</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ''}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleSave}>
          confirmer
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default DateFinModal;
