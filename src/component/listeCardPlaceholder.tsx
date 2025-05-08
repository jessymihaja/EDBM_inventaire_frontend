import { Col, Row } from "react-bootstrap";
import CardPlaceholder from "./cardPlaceholder";

const ListeCardPlaceholder = () =>{
    const placeholders = Array(3).fill(null);
    return(
        <div className="container mt-4">
            <Row className="flex-row g-3">
                {placeholders.map((_, index) => (
                <Col key={index} xs={12} md={3}>
                    <CardPlaceholder />
                </Col>
                ))}
            </Row>
        </div>    
    )
}
export default ListeCardPlaceholder;