import { useEffect, useState } from "react";
import { Categorie } from "./tableArticles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Pagination,Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { BASE_URL, ERREUR_RECUP } from "../types/Variables";
import TablePlaceholder from "./tablePLaceholder";

interface PaginatedResponse {
    totalPages: number;
    totalElements: number;
    size: number;
    content: Categorie[];
    number: number;
    first: boolean;
    last: boolean;
  }


const TableCategories = () => {

    const [data, setData] = useState<PaginatedResponse | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<PaginatedResponse>(BASE_URL+`categories/paginated?page=${currentPage}&size=10`);
                setData(response.data);
            } catch (error) {
                console.error(ERREUR_RECUP, error);
            }
        };
        fetchData();
    }, [currentPage]);

    if (!data) return (
       <TablePlaceholder></TablePlaceholder>
    )
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleViewDetails = (id:number) => {
        navigate(`/ArticleCategorie/${id}`);
    };

    return(
        <Container>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>désignation</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.content.map(categorie=> (
                        <tr key={categorie.idCategorie}>
                        <td>{categorie.idCategorie}</td>
                        <td>{categorie.designation}</td>
                        <td>
                        <FaEye
                                onClick={() => handleViewDetails(categorie.idCategorie)}
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
export default TableCategories;