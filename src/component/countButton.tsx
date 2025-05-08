import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, ERREUR_RECUP } from '../types/Variables';

const CountButton = () => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await axios.get(BASE_URL + 'getCountWithoutNumSerie');
                console.log("Response data:", response.data); 
                setCount(response.data); 
            } catch (error) {
                console.error(ERREUR_RECUP, error);
            }
        };

        fetchCount();
    }, []); 

    const handleClick = () => {
        navigate('/ListeAddnum');
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <Button 
                onClick={handleClick} 
                variant="outline-light" 
                className="mb-3"
                style={{
                    display: "flex", 
                    alignItems: "center", 
                    padding: "7px 10px", 
                    backgroundColor: "#8e735b",  
                    borderRadius: "30px",
                    color: "#fff",
                    fontWeight: "bold",
                    boxShadow: "0 4px 8px rgba(142, 115, 91, 0.3)", 
                    border: "2px solid #8e735b",  
                    cursor: "pointer"
                }}
            >
                <BsInfoCircle className="mr-2" style={{ fontSize: "20px" }} />
                <span style={{ fontSize: "16px" }}>Articles sans num. série: </span>
                <span 
                    style={{
                        backgroundColor: "#e2cba7",
                        borderRadius: "12px", 
                        padding: "4px 12px", 
                        marginLeft: "10px", 
                        color: "#8e735b", 
                        fontSize: "16px",
                        fontWeight: "bold",
                        display: "inline-block",
                        
                    }}
                >
                    {count}
                </span>
            </Button>

        </div>
    );
};

export default CountButton;
