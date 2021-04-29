import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Row, Col, Button } from "reactstrap";
import { getCurrentHospital } from '../redux/action/hospital';
import useModal from './Modals/useModal';
import PatientModal from './Modals/PatientModal';
import PatientsTable from './PatientTableComponent';
//import Sidebar from './Sidebar/Sidebar';

const Dashboard = ({
    getCurrentHospital,
    auth: { user },
    hospital: { hospital }
}) => {
    useEffect(() => {
        getCurrentHospital();
    }, []);

    const { isShowing, toggle } = useModal();

    return (

        <Fragment>
        {/*    <Sidebar/> */}
            <div className="content">
                <Row>
                    <Col>
                        <h1 className="large text-primary">Welcome to Dashboard </h1>
                    </Col>
                </Row>
                {hospital !== null ? (
                    <Fragment>
                        <h1 className="large text-primary">{hospital && hospital.name} Hospital</h1>
                        <PatientsTable />
                        <PatientModal isShowing={isShowing} hide={toggle} title="Add Patient" />
                        <Button onClick={toggle} className=" btn-primary btn-round float"><i className="fa fa-plus my-float"></i></Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <p>You are not linked to a hospital yet, please add some info</p>
                        <Link to="/create-hospital-profile" className="btn btn-primary my-1">
                            Create Profile
          </Link>
                    </Fragment>
                )
                }
            </div>
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

export default connect(mapStateToProps, { getCurrentHospital })(
    Dashboard
);
