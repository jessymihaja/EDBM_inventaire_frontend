import { useState, useEffect } from 'react';
import { Table, Pagination, Container} from 'react-bootstrap';
import axios from 'axios';
import '../assets/css/table.css'
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Popconfirm } from 'antd';
import { BASE_URL, ERREUR_RECUP, VALIDATION_SUPPR } from '../types/Variables';
import TablePlaceholder from './tablePLaceholder';
import CustomBadge from './costumBadge';
import StockOffcanvas from './stockOffCanvas';

export interface Categorie {
  idCategorie: number;
  designation: string;
}

interface Article {
  idArticle: string;
  idCategorie: Categorie;
  designation: string;
  unite: string;
  idajouteur: string;
  idmodificateur: string | null;
  datemodification: string | null;
}

interface PaginatedResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Article[];
  number: number;
  first: boolean;
  last: boolean;
}

const TableArticles = () => {
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedArticleStock, setSelectedArticleStock] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState<Categorie | null>(null);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PaginatedResponse>(BASE_URL+`articles/paginated?page=${currentPage}&size=10`);
        setData(response.data);
      } catch (error) {
        console.error(ERREUR_RECUP, error);
      }
    };

    fetchData();
  }, [currentPage]);

  if (!data) return (
    <TablePlaceholder></TablePlaceholder>
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleDelete = (idArticle: string) => {
    
    console.log(`Delete article with ID: ${idArticle}`);
  };

  const handleUpdate = (idArticle: string) => {
    navigate(`/update_article/${idArticle}`);
  };


  const handleClose = () => setShowOffcanvas(false);
  const handleShow = (idarticle: string,categorie:Categorie) => {
    setSelectedCategorie(categorie)
    fetch(BASE_URL+`stock/${idarticle}`)
      .then(response => response.json())
      .then(data => {
        setSelectedArticleStock(data);  
        setShowOffcanvas(true);  
      });
  };

  return (
    <Container>
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID Article</th>
            <th>Désignation</th>
            <th>Unité</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map(article => (
            <tr key={article.idArticle} onClick={() => handleShow(article.idArticle,article.idCategorie)}>
              <td>{article.idArticle}</td>
              <td>{article.designation}</td>
              <td>{article.unite}</td>
              <td>
                  <CustomBadge
                    idCategorie={article.idCategorie.idCategorie}
                    designation={article.idCategorie.designation}
                  ></CustomBadge>
              </td>
              <td>
                <FaEdit
                  className="action-icon me-3"
                  onClick={() => handleUpdate(article.idArticle)}
                />
                <Popconfirm
                    title={VALIDATION_SUPPR}
                    onConfirm={() => handleDelete(article.idArticle)}
                    okText="Oui"
                    cancelText="Non"
                >
                    <FaTrashAlt
                        className="delete-icon"
                    />
                </Popconfirm>
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
        {[...Array(data.totalPages).keys()].map(page => (
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
      <StockOffcanvas
        show={showOffcanvas}
        handleClose={handleClose}
        stockData={selectedArticleStock}  
        categorie={selectedCategorie}
      />
    </Container>
  );
};

export default TableArticles;
