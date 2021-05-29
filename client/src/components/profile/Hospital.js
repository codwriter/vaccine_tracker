import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import HospitalProfileForm from '../Forms/HospitalProfileForm';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Spinner,
} from "reactstrap";

import { getCurrentHospital,unlinkHospital } from '../../redux/action/hospital';
import { deleteUser } from '../../redux/action/auth';
import { Redirect } from "react-router";
import avatar from '../../assets/images/man.svg';
import VaccineTable from '../profile/VaccineTable'

const Hospital = ({

  auth:{user},
  deleteUser,
  getCurrentHospital,
  unlinkHospital,
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
                <Card className="card-user">

                  <div className="image" >
                    {/*   <img
                    alt="..."
                    src={avatar}
                  />  */}
                  </div>
                  <CardBody>
                    <div className="author">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={avatar}
                        />
                        <h5 className="title">Email: {user && user.email}</h5>
                      </a>
                      <p className=" title text-center">Fullname: {user.firstname + " " + user.lastname}</p>
                      <p className=" title text-center">Amka: {user.amkaUser}</p>
                      <p className=" title text-center">Birthdate: {user.birthdate}</p>
                    </div>
                    
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="button-container justify-content-center"><Button className="btn-sm btn-round btn-accent" onClick={unlinkHospital}>Unlink from hospital</Button></div>
                  </CardFooter>
                </Card>

              </Col>
              <Col md="8">
                <HospitalProfileForm hospital={hospital} title="Edit Hospital Info" />
                <VaccineTable />
              </Col>

              <Col>
                <Button onClick={unlinkHospital}>Unlink from hospital</Button>
              </Col>
              <Col>
                <Button className="btn btn-danger" onClick={deleteUser}>Delete my account</Button>
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
  getCurrentHospital:PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  hospital: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  getCurrentHospital: state.hospitalReducer,
  hospital: state.hospitalReducer
});



export default connect(mapStateToProps, { getCurrentHospital,unlinkHospital, deleteUser })(Hospital);

