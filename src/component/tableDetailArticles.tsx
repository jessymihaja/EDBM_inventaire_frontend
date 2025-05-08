import { useEffect, useState } from "react";
import {detailEntree} from "./tableEntrees";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Pagination,Table } from "react-bootstrap";
import { Popconfirm } from "antd";
import {FaEye, FaSignOutAlt} from "react-icons/fa";
import { BASE_URL, ERREUR_RECUP } from "../types/Variables";
import TablePlaceholder from "./tablePLaceholder";
import CustomBadge from "./costumBadge";

export interface detailArticle{
    refarticle : String;
    iddetailEntree : detailEntree;
    numSerie: String | null;
}
interface PaginatedResponse {
    totalPages: number;
    totalElements: number;
    size: number;
    content: detailArticle[];
    number: number;
    first: boolean;
    last: boolean;
  }


const TableDetailArticles = () => {
    const [data, setData] = useState<PaginatedResponse | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get<PaginatedResponse>(BASE_URL+`findDetailArticlesNotInSortie/paginated?page=${currentPage}&size=10`);
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
    const handleSortieDetail= (id:String) => {
        navigate(`/sortieDetailArticle/${id}`)
    };
    return (
    <Container>
      <Table bordered hover>
        <thead>
          <tr>
            <th>ref Article</th>
            <th>Désignation</th>
            <th>Unité</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map(article => (
            <tr key={`${article.refarticle}`}>
              <td>{article.refarticle}</td>
              <td>{article.iddetailEntree.idarticle.designation}</td>
              <td>{article.iddetailEntree.idarticle.unite}</td>
              <td>
                  <CustomBadge
                    idCategorie={article.iddetailEntree.idarticle.idCategorie.idCategorie}
                    designation={article.iddetailEntree.idarticle.idCategorie.designation}
                  ></CustomBadge>
              </td>
              <td>
              <FaEye
                    onClick={() => handleViewDetails(article.refarticle)}
                    className="action-icon me-3"
                />
                <Popconfirm
                    title=" voulez-vous créer une sortie pour cet article ?"
                    onConfirm={() => handleSortieDetail(article.refarticle)}
                    okText="Oui"
                    cancelText="Non"
                    >
                    <FaSignOutAlt
                        className="action-icon"
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
    </Container>
    )
};
export default TableDetailArticles;