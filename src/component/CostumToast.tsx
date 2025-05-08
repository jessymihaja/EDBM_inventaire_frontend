import React, { useEffect } from 'react';
import '../assets/css/CostumToast.css';

interface CustomToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type, onClose }) => {
    // Affiche le toast pendant 2 secondes avec une progress bar
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`custom-toast ${type}`}>
            <span>{message}</span>
            <div className="progress-bar"></div>
        </div>
    );
};

export default CustomToast;
