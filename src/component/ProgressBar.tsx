import * as React from 'react';
import { etatArticle } from '../types/Variables';

interface ProgressBarProps {
  value: number;
}

const getProgressBarColor = (value: number) => {
  if (value >= 0 && value <= 2) return 'red';
  if (value >= 3 && value <= 4) return 'orange';
  if (value >= 5 && value <= 6) return 'yellow';
  if (value >= 7 && value <= 8) return 'lightgreen';
  if (value >= 9 && value <= 10) return '#689d71';
  return 'gray';
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const color = getProgressBarColor(value);

  return (
    <div>
      <strong>Etat: {etatArticle[value]}</strong>
      <div style={{
        height: '14px',
        width: '30%',
        borderColor: '#000',
        borderWidth: '1px',
        borderRadius: '5px',
        borderStyle: 'solid',
        backgroundColor: '#e0e0df'
      }}>
        <div style={{
          height: '100%',
          width: `${value * 10}%`,
          backgroundColor: color,
          borderRadius: '5px'
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;
