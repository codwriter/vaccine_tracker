import React, { useState } from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardFooter } from "reactstrap";

const AvailableDoses = ({ vaccines }) => {
    const [cardColor, setcardColor] = useState("white");

    return (
        <> <Row>
            {vaccines.map(vaccine =>
                <Col className="justify-content-center" key={vaccine._id}>
                    <Card className="card-stats">

                        <CardBody  className="card-body">
                            <Row>
                                <Col lg="2" md="2" sm="2">
                                    <div className="icon-big text-center">
                                        {vaccine.doses <= 200 ? (<i className="fas fa-syringe text-danger" />) : (<i className="fas fa-syringe text-success " />) }
                                    </div>
                                </Col>

                                <Col key={vaccine._id}>
                                    <div className="numbers">
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