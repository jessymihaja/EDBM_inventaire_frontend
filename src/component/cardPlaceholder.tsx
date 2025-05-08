import {Card, Placeholder } from "react-bootstrap";

const CardPlaceholder = () => {
    return(
        <div className="justify-content-around">
            <Card style={{ width: '18rem' ,marginLeft: '10px'}}>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="success" xs={5}/>
                    <Placeholder.Button variant="warning" xs={5} style={{marginLeft:'3px'}}/>
                </Card.Body>
            </Card>
        </div>
    )
}
export default CardPlaceholder;