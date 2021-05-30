import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import HospitalProfileForm from '../Forms/HospitalProfileForm';
import {
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { getCurrentHospital } from '../../redux/action/hospital';
import { Redirect } from "react-router";
import VaccineTable from '../profile/VaccineTable'
import UserInfoForm from "../Forms/UserInfoForm";

const Hospital = ({
  getCurrentHospital,
  hospital: { hospital, loading }
}) => {
  useEffect(() => {
    getCurrentHospital();
  }, [getCurrentHospital]);
  return (
    <>
      {loading ? <Spinner /> : (
        <>
          {hospital ? (<div className="content" >
            <Row>
              <Col md="4">
                <UserInfoForm />
              </Col>
              <Col md="8"> 
                  <HospitalProfileForm hospital={hospital} title="Edit Hospital Info" />
                  <VaccineTable />
              </Col>
            </Row>
          </div>)
            : <Redirect to='/intro' />
          }</>
      )}
    </>
  );
}

Hospital.propTypes = {
  getCurrentHospital: PropTypes.func.isRequired,
  hospital: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  getCurrentHospital: state.hospitalReducer,
  hospital: state.hospitalReducer
});



export default connect(mapStateToProps, { getCurrentHospital })(Hospital);
