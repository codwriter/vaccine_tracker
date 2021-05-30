import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Row, Col, Container, Spinner, Card, CardTitle, CardFooter, CardHeader, ListGroup, ListGroupItem, Collapse, Button, Input, CardBody } from "reactstrap";
import { getHospitals, linkHospital } from '../../redux/action/hospital';
import HospitalProfileForm from '../Forms/HospitalProfileForm';


const Intro = ({
  history,
  linkHospital,
  getHospitals,
  hospitals: { hospitals, loading },
}) => {
  useEffect(() => {
    getHospitals();
  }, [getHospitals]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

    const toggle = () => setIsOpen(!isOpen);

    return (
        loading ? (<><Spinner /></>) : (
            <Fragment>
                <Card className="p-5">
                    <Row>
                        <Col lg="12" md="6" sm="6">
                            <h1 className="large text-primary text-center">Let's get started! </h1>
                        </Col>
                    </Row>
                </Card>
                {isOpen ? "" : (
                    <Fragment>
                        <Card className="p-5">
                            <CardHeader>
                                <Col lg='12' md='6' sm='6'>
                                    <h3 className='text-primary'> Select an existing hospital:</h3>
                                </Col>
                            </CardHeader>
                            {/* <ListGroup >
                            {hospitals ? hospitals.map(hospital =>
                                <ListGroupItem tag="a"
                                    onClick={() => { linkHospital(hospital._id, history); }}>
                                    {hospital.name} Hospital
                        </ListGroupItem>) : ''}
                            </ListGroup> */}
                            <CardBody>
                                <Input type="select" >
                                    <option>Select hospital</option>
                                    {hospitals ? hospitals.map(hospital =>
                                        <option value={hospital._id} tag="a" key={hospital._id}>
                                            {hospital.name} Hospital
                        </option>) : ''}
                                </Input>
                            </CardBody>
                        </Card>
                        <Row className="d-flex justify-content-center m-3">
                            <Col>
                                <hr />
                            </Col>
                            <Col className=" align-self-center" md="1" sm="1" lg="1">
                                <p className="text-center align-middle">OR</p>
                            </Col>
                            <Col>
                                <hr />
                            </Col>

                        </Row>
                    </Fragment>
                )}
                <div className="text-center">
                    <Button color="primary" onClick={toggle} className="mt-4">{isOpen ? 'Select Hospital' : 'Create Hospital'}</Button>
                </div>

                <Collapse isOpen={isOpen}>
                    <hr />
                    <HospitalProfileForm title="Create New Hospital" />
                </Collapse>
            </Fragment >
        )
    );
};

Intro.propTypes = {
    getHospitals: PropTypes.func.isRequired,
    linkHospital: PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
  hospitals: state.hospitalReducer,
});


export default connect(mapStateToProps, { getHospitals, linkHospital })(withRouter(Intro));