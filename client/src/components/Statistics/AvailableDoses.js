import React from 'react'
import { Row,Col,Card,CardBody,CardTitle,CardFooter } from "reactstrap";

const AvailableDoses = ({ vaccines }) => {
    console.log(vaccines);
    return (
        <Card className="card-stats">
            <CardBody className="card-body">
                <Row>
                    <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                            <i className="fas fa-syringe text-warning"  />
                        </div>
                    </Col>
                    <Col md="8" xs="7">
                       { vaccines.map(vaccine=>
                           <div className="numbers" key="vaccine._id">
                               <p className="card-category">{vaccine.vaccineBrand}</p>
                               <CardTitle tag="p">{vaccine.doses}</CardTitle>
                               <p />
                           </div>
                        )}
                        
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