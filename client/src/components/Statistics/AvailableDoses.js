import React from 'react'
import { Row,Col,Card,CardBody,CardTitle,CardFooter } from "reactstrap";

const AvailableDoses = ({ doses }) => {
    return (
        <Card className="card-stats">
            <CardBody className="card-body">
                <Row>
                    <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                            <i className="nc-icon nc-favourite-28 text-warning"  />
                        </div>
                    </Col>
                    <Col md="8" xs="7">
                        <div className="numbers">
                            <p className="card-category">Available Doses</p>
                            <CardTitle tag="p">{doses}</CardTitle>
                            <p />
                        </div>
                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <hr />
                <div className="stats">
                  </div>
            </CardFooter>
        </Card>
    );
}
export default AvailableDoses;