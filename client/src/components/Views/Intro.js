import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Row, Col, Container, Spinner, Card, CardTitle, CardFooter, CardHeader, ListGroup, ListGroupItem, Collapse, Button } from "reactstrap";
import { getHospitals, linkHospital } from '../../redux/action/hospital';
import HospitalProfileForm from '../Forms/HospitalProfileForm';

const Intro = ({
    history,
    linkHospital,
    getHospitals,
    hospitals: { hospitals, loading }
}) => {
    useEffect(() => {
        getHospitals();
    }, [getHospitals]);


    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        loading ? (<><Spinner /></>) : (
            <Fragment>
                <Row>
                    <Col lg="12" md="6" sm="6">
                        <h1 className="large text-primary">Let's get started! </h1>
                    </Col>
                </Row>
                <Col lg='12' md='6' sm='6'>
                    <h2 className='text-primary'> Select your hospital</h2>
                </Col>
                <ListGroup >
                    {hospitals?hospitals.map(hospital =>
                        <ListGroupItem tag="a"
                            onClick={() => { linkHospital(hospital._id,history);}}>
                            {hospital.name} Hospital
                        </ListGroupItem>):''}
                </ListGroup>
                <Row>
                    <Col lg='12' md='6' sm='6'>
                        Can't find your hospital?
                </Col>
                </Row>
                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Create Hospital</Button>
                <Collapse isOpen={isOpen}>
                    <HospitalProfileForm title="Create New Hospital" />
                </Collapse>
            </Fragment>
        )
    );
};

Intro.propTypes = {
    getHospitals: PropTypes.func.isRequired,
    linkHospital: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    hospitals: state.hospitalReducer
});

export default connect(mapStateToProps, { getHospitals, linkHospital })(withRouter(Intro));
