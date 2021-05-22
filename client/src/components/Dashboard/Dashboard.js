import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Row, Col, Container, Spinner, Card, CardTitle, CardFooter, CardHeader } from "reactstrap";
import { getCurrentHospital } from '../../redux/action/hospital';
import PatientsTable from './PatientTableComponent';
import AvailableDoses from '../Statistics/AvailableDoses';
//import Sidebar from './Sidebar/Sidebar';

const Dashboard = ({
    getCurrentHospital,
    hospital: { hospital, loading }
}) => {
    useEffect(() => {
        getCurrentHospital();
    }, [getCurrentHospital]);


    return (
        <Fragment>
            {/*    <Sidebar/> */}
            {loading ? (
                <Spinner />
            ) : (
                <Container >
                    {hospital != null ? (
                        <>
                            <Row>
                                <Col >
                                    <Card >
                                        <CardHeader >
                                            <CardTitle className="align-self-center" ><h1 className="large text-primary text-center" >{hospital && hospital.name} Hospital</h1>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardFooter></CardFooter>
                                    </Card>
                                </Col>
                                </Row>
                                <Row>
                                    {hospital.vaccines ? <Col lg="12" md="12" sm="12"  >
                                    <AvailableDoses vaccines={hospital.vaccines} />
                                </Col> : ''}
                            </Row>

                            <Row>
                                <Col lg="12" md="12" sm="12" >
                                    <PatientsTable hospital={hospital} />
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <Redirect to='/intro'/>
                    )
                    }
                </Container>
            )}
        </Fragment >
    );
};

Dashboard.propTypes = {
    getCurrentHospital: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    hospital: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    hospital: state.hospitalReducer
});

export default connect(mapStateToProps, { getCurrentHospital })(Dashboard);