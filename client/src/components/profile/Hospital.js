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
import { getCurrentHospital, unlinkHospital } from '../../redux/action/hospital';
import { Redirect } from "react-router";
import avatar from '../../assets/images/man.svg';

const Hospital = ({
  auth:{user},
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
                        <h5 className="title">{user && user.email}</h5>
                      </a>
                     {/*  <p className="description">@chetfaker</p> */}
                    </div>
                    {/* <p className="description text-center">
                      "I like the way you work it <br />
                    No diggity <br />I wanna bag it up"
                  </p> */}
                  </CardBody>
                  <CardFooter>
                    <hr />
                {/*     <div className="button-container">
                      <Row>
                        <Col className="ml-auto" lg="3" md="6" xs="6">
                          <h5>
                            12 <br />
                            <small>Files</small>
                          </h5>
                        </Col>
                        <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                          <h5>
                            2GB <br />
                            <small>Used</small>
                          </h5>
                        </Col>
                        <Col className="mr-auto" lg="3">
                          <h5>
                            24,6$ <br />
                            <small>Spent</small>
                          </h5>
                        </Col>
                      </Row>
                    </div> */}
                  </CardFooter>
                </Card>
              
              </Col>
              <Col md="8">
                <HospitalProfileForm hospital={hospital} title="Edit Hospital Info" />
              </Col>
              <Col>
              <Button onClick={unlinkHospital}>Unlink</Button>
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
  unlinkHospital:PropTypes.func.isRequired,
  hospital: PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth:state.auth,
  getCurrentHospital:state.hospitalReducer,
  hospital: state.hospitalReducer
});


export default connect(mapStateToProps, { getCurrentHospital,unlinkHospital })(Hospital);
