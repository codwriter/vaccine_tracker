import React, { Fragment, useEffect, useState } from 'react'; 
import PropTypes from 'prop-types'; 
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
import Spinner from '../layout/Spinner'; 
import { createHospital, updateHospital, getCurrentHospital } from '../../redux/action/hospital'; 
import { setAlert } from '../../redux/action/alert';
import { AvForm, AvGroup, AvFeedback, AvInput } from 'availity-reactstrap-validation';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Row,
  Col,
} from "reactstrap";


 const initialState = {
        name: '',
        address: '',
        afm: '',
        NumberofDosesAvailable: null
};

const Hospitalregister = ({
  getCurrentHospital,
  createHospital,
  updateHospital,
  title,
  history,
  hospital: { hospital, loading }
}) => {
  const [formData, setFormData] = useState(initialState);
  const [disabled, setdisabled] = useState(false);
  useEffect(() => {
    if (!hospital) getCurrentHospital();
    if (!loading && hospital) {
        const hospitalData = { ...initialState };
        for (const key in hospital) {
            if (key in hospitalData) hospitalData[key] = hospital[key];
        }
        setFormData(hospitalData);
        setdisabled(true);
    }
}, [loading, getCurrentHospital, hospital]);

const { name, address, afm, NumberofDosesAvailable } = formData; 
	
const onChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleValidSubmit = async (e) => { 
     console.log(formData);
     if (hospital != null) {
       updateHospital(formData);
     } else 
     createHospital(formData, history);
 }

    return (
      <Fragment>
       {loading ? 
          <Spinner />
         :(
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h1 className="large text-primary">{title}</h1>
                </CardHeader>
                <CardBody>
                  <AvForm class="form" onValidSubmit={handleValidSubmit}>

                    <AvGroup>
                      <Col className="pr-1" md="5"> 
                          <label>Hospital Name</label>
                          <Input
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Hospital"
                            type="text"
                            required
                          />
                        <AvFeedback>The name of the hospital is required</AvFeedback>
                      </Col>
                      </AvGroup>

                      <AvGroup>
                      <Col className="px-1" md="3">
                          <label>Hospital Address</label>
                          <Input
                            name="address"
                            value={address}
                            onChange={onChange}
                            placeholder="Hospital Address"
                            type="text"
                            required
                          />
                        <AvFeedback>The address of the hospital is required</AvFeedback>
                      </Col>
                      </AvGroup>
                    
                      <AvGroup>
                      <Col className="pl-2" md="5">
                          <label>Hospital Tax Identification number (AFM)</label>
                          <Input placeholder="Hospital AFM" type="text" 
                            id="afm"
                            name="afm"
                            value={AFM}
                            onChange={onChange}
                            minLength="9"
                            maxLength="9"
                            pattern="^[0-9]+$"
                            disabled={disabled}
                            required
                            />
                            <AvFeedback>The AFM is required and must be 9 numbers in length!</AvFeedback>
                      </Col>
                      </AvGroup>

                    <AvForm>
                    <Row>
                      <Col className="pr-1" md="6">
                          <label>Number of Vaccine Doses</label>
                          <Input
                            id="numberofDosesAvailable"
                            placeholder="Number of Vaccine Doses"
                            value={numberOfDosesAvailable}
                            type="number"
                            onChange={onChange}
                            min="0"
                          />

                      </Col>  
                    </Row>
                    </AvForm>

                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Update Hospital Profile
                        </Button>
                      </div>
                    </Row>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
         </div>
          ) 
        }
      </Fragment>
    ); 
};

Hospitalregister.propTypes = {
  getCurrentHospital: PropTypes.func.isRequired,
  createHospital: PropTypes.func.isRequired,
  updateHospital: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.object.isRequired,
  hospital: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  getCurrentHospital: state.hospitalReducer,
  createHospital: state.hospitalReducer,
  updateHospital: state.hospitalReducer,
  hospital: state.hospitalReducer,
  isAuthenticated: state.auth
});

export default connect(mapStateToProps, {setAlert, createHospital, updateHospital, getCurrentHospital  })(withRouter(Hospitalregister));