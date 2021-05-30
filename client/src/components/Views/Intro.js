import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Row, Col, Container, Spinner, Card, CardTitle, CardFooter, CardHeader, ListGroup, ListGroupItem, Collapse, Button, Input, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
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
                <Row>
                    <Col lg="12" md="6" sm="6">
                        <h1 className="large text-primary">Let's get started! </h1>
                    </Col>
                </Row>
                {isOpen ? "" : (
                    <Fragment>
                        <Col lg='12' md='6' sm='6'>
                            <h2 className='text-primary'> Select your hospital</h2>
                        </Col>
                        {/* <ListGroup >

                            {hospitals ? hospitals.map(hospital =>
                                <ListGroupItem tag="a"
                                    onClick={() => { linkHospital(hospital._id, history); }}>
                                    {hospital.name} Hospital
                        </ListGroupItem>) : ''}
                            </ListGroup> */}
                        {/* <Input type="select" >
                            <option>Select hospital</option>
                            {hospitals ? hospitals.map(hospital =>
                                <option tag="a" key={hospital._id}
                                    onClick={() => { linkHospital(hospital._id, history); }}>
                                    {hospital.name} Hospital
                        </option>) : ''}
                        </Input> */}
                        <UncontrolledButtonDropdown>
                            <DropdownToggle className="btn-wd"caret>
                                Select Hospital
                        </DropdownToggle>
                            <DropdownMenu>
                                {hospitals ? hospitals.map(hospital =>
                                    <DropdownItem tag="a" key={hospital._id}
                                        onClick={() => { linkHospital(hospital._id, history); }}>
                                        {hospital.name} Hospital </DropdownItem> ) :""}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <Row>
                            <Col lg='12' md='6' sm='6'>
                                Can't find your hospital?
                </Col>
                        </Row>
                    </Fragment>
                )}
                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>{isOpen ? 'Select Hospital' : 'Create Hospital'}</Button>
                <Collapse isOpen={isOpen}>
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

