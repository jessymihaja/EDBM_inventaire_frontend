import { useEffect, useState } from "react";
import { detailArticle } from "./tableDetailArticles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, ERREUR_RECUP } from "../types/Variables";
import TablePlaceholder from "./tablePLaceholder";
import { Container, Pagination, Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";

interface sortie{
    idsortie : number;
    refarticle : detailArticle;
    justification : string;
    datesortie : string;
}
interface PaginatedResponse {
    totalPages: number;
    totalElements: number;
    size: number;
    content: sortie[];
    number: number;
    first: boolean;
    last: boolean;
  }

const TableSortie = () => {
    const [data, setData] = useState<PaginatedResponse | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get<PaginatedResponse>(BASE_URL+`sorties/paginated?page=${currentPage}&size=10`);
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
    const handleViewDetails = (id:String) => {
        navigate(`/detailArticle/${id}`);
      };

    return(
        <Container>
            <Table bordered hover>
                <thead>
                <tr>
                    <th>ref Article</th>
                    <th>designation</th>
                    <th>justification</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {data.content.map(sortie => (
                        <tr>
                        <td>{sortie.refarticle.refarticle}</td>
                        <td>{sortie.refarticle.iddetailEntree.idarticle.designation}</td>
                        <td>{sortie.justification}</td>
                        <td>{sortie.datesortie}</td>
                        <td>
                            <FaEye
                                onClick={() => handleViewDetails(sortie.refarticle.refarticle)}
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
    )
    
}
export default TableSortie;