import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Row, Col,Container, Spinner, Card, CardTitle, CardFooter, CardHeader } from "reactstrap";
import { getCurrentHospital } from '../redux/action/hospital';
import PatientsTable from './PatientTableComponent';
import AvailableDoses from './Statistics/AvailableDoses';
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
                <Container>
                    {hospital != null ? (
                        <>
                            <Row>
                                <Col lg="9" md="6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="align-self-center" ><h1 className="large text-primary text-center" >{hospital && hospital.name} Hospital</h1>
                                                </CardTitle>
                                        </CardHeader>
                                        <CardFooter></CardFooter>
                                    </Card>
                                </Col>

                                {hospital.numberOfDosesAvailable ? <Col lg="3" md="6" sm="6" >
                                    <AvailableDoses doses={hospital.numberOfDosesAvailable} />
                                </Col> : ''}
                            </Row>

                            <Row>
                                <Col lg="12" md="12" sm="12" >
                                    <PatientsTable />
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <Row>
                                <Col lg="12" md="6" sm="6">
                                    <h1 className="large text-primary">Welcome to Dashboard </h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="text-white">You are not linked to a hospital yet, please add some info.</p>
                                    <Link to="/create-hospital-profile" className="btn btn-primary">
                                        Create Profile
                            </Link>
                                </Col>
                            </Row>
                        </>
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