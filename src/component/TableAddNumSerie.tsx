import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Pagination, Button, Form } from 'react-bootstrap';   
import { detailEntree } from './tableEntrees';
import { BASE_URL, ERREUR_AJOUT, ERREUR_RECUP, ERROR_MAJ, SUCCES_AJOUT } from '../types/Variables';
import CustomToast from './CostumToast';

interface DetailArticle {
    refarticle: string;
    iddetailEntree: detailEntree;
    numserie: string | null;
}

interface PaginatedResponse {
    totalPages: number;
    totalElements: number;
    size: number;
    content: DetailArticle[];
    number: number;
    first: boolean;
    last: boolean;
}

const TableAddNumSerie = () => {
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [data, setData] = useState<PaginatedResponse | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [numSerieMap, setNumSerieMap] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<PaginatedResponse>(`${BASE_URL}findDetailArticlesWithoutNumSerie/paginated?page=${currentPage}&size=10`);
                setData(response.data);
            } catch (error) {
                console.error(ERREUR_RECUP, error);
            }
        };

        fetchData();
    }, [currentPage]);

    if (!data) return <div>Chargement...</div>;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleNumSerieChange = (refarticle: string, value: string) => {
        setNumSerieMap((prev) => ({ ...prev, [refarticle]: value }));
    };

    const handleUpdateNumSerie = async (refarticle: string) => {
        try {
            const numserie = numSerieMap[refarticle];
            await axios.put(`${BASE_URL}updateNumSerie/${refarticle}/${numserie}`);
            setTimeout(() => {
                window.location.reload();
            }, 1800);
            setToast({ message: SUCCES_AJOUT, type: 'success' });
        } catch (error) {
            console.error(ERROR_MAJ, error);
            setToast({ message: ERREUR_AJOUT, type: 'error' });
            console.log(refarticle+" "+ numSerieMap[refarticle])
        }
    };

    return (
        <Container>
            {toast && (
                <CustomToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Réf. Article</th>
                        <th>Désignation</th>
                        <th>Unité</th>
                        <th>Catégorie</th>
                        <th>Numéro de Série</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.content.map((article) => (
                        <tr key={article.refarticle}>
                            <td>{article.refarticle}</td>
                            <td>{article.iddetailEntree.idarticle.designation}</td>
                            <td>{article.iddetailEntree.idarticle.unite}</td>
                            <td>{article.iddetailEntree.idarticle.idCategorie.designation}</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrez le numéro de série"
                                    value={numSerieMap[article.refarticle] || ""}
                                    onChange={(e) => handleNumSerieChange(article.refarticle, e.target.value)}
                                />
                            </td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleUpdateNumSerie(article.refarticle)}
                                    disabled={!numSerieMap[article.refarticle]}
                                >
                                    Mettre à jour
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev
                    onClick={() => handlePageChange(data.number - 1)}
                    disabled={data.first}
                />
                {[...Array(data.totalPages).keys()].map((page) => (
                    <Pagination.Item
                        key={page}
                        active={page === data.number}
                        onClick={() => handlePageChange(page)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(data.number + 1)}
                    disabled={data.last}
                />
            </Pagination>
        </Container>
    );
};

export default TableAddNumSerie;
