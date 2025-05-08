import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Pagination,Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '../assets/css/table.css';
import { BASE_URL, ERREUR_RECUP } from "../types/Variables";
import TablePlaceholder from "./tablePLaceholder";

interface Categorie {
    idCategorie: number;
    designation: string;
}
  
export interface Article {
    idArticle: string;
    idCategorie: Categorie;
    designation: string;
    unite: string;
    idajouteur: string;
    idmodificateur: string | null;
    datemodification: string | null;
}

export interface detailEntree{
id:number;
idarticle:Article;
idEntree:Entree;
quantite:number;
prixunitaire:number;
provenance:String;
}

export interface Entree {
    id: number;
    numfactureprovenance:String;
    provenance:String;
    adresseprovenance:String;
    dateentree:String;
    detailEntrees:detailEntree[];
}
export interface PaginatedResponse {
    totalPages: number;
    totalElements: number;
    size: number;
    content: Entree[];
    number: number;
    first: boolean;
    last: boolean;
  }

const TableEntrees = () => {
    const [data, setData] = useState<PaginatedResponse | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate=useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<PaginatedResponse>(BASE_URL+`entrees/paginated?page=${currentPage}&size=10`);
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
    const handleViewDetails = (identree:number) => {
      navigate(`/entrees/${identree}`);
    };
  return (
    <Container>
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID entree</th>
            <th>numero facture provenance</th>
            <th>provenance</th>
            <th>adresse provenance</th>
            <th>date entree</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map(entree => (
            <tr key={entree.id}>
              <td>{entree.id}</td>
              <td>{entree.numfactureprovenance}</td>
              <td>{entree.provenance}</td>
              <td>{entree.adresseprovenance}</td>
              <td>{entree.dateentree}</td>
              <td>
                <FaEye
                onClick={() => handleViewDetails(entree.id)}
                  className="action-icon me-3"
                />
                
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
    </Container>
  );
}
export default TableEntrees;