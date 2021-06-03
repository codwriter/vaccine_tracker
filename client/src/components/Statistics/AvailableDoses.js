import React from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardFooter } from "reactstrap";

const AvailableDoses = ({ vaccines }) => {
  
    return (
        <> <Row >
            {vaccines.map(vaccine =>
                <Col lg="3" md="6" sm="6"className=" col-3" key={vaccine._id}>
                    <Card className="card-stats">

                        <CardBody  className="card-body">
                            <Row>
                                <Col md="4" xs="5">
                                    <div className="icon-big text-center">
                                        {vaccine.doses <= 200 ? (<i className="fas fa-syringe text-danger" />) : (<i className="fas fa-syringe text-success " />) }
                                    </div>
                                </Col>

                                <Col md="8" xs="7" key={vaccine._id}>
                                    <div className="numbers text-nowrap overflow-hidden">
                                        <p className="card-category">{vaccine.vaccineBrand}</p>
                                        <CardTitle tag="p">{vaccine.doses}</CardTitle>
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
                </Col>
            )}

        </Row>
        </>
    );
}
export default AvailableDoses;