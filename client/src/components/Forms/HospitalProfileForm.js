import React, { Fragment, useEffect, useState } from 'react'; 
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
import Spinner from '../layout/Spinner'; 
import { createHospital } from '../../redux/action/hospital'; 
import { setAlert } from '../../redux/action/alert';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";


const Hospitalregister = ({ setAlert, createHospital, isAuthenticated,title,hospital }) => {
    const [formData, setFormData] = useState({
        HospitalName: '',
        HospitalAddress: '',
        AFM: '',
        NumberofDoses: ''
 });

const { HospitalName, HospitalAddress, AFM, NumberofDoses } = formData; 
	
const onChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async (e) => { 
     e.preventDefault(); 
    Hospitalregister({ HospitalName, HospitalAddress, AFM, NumberofDoses }); 	     
    createHospital(formData); 
 };
        

class User extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Hospital Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form class="form" onSubmit={onSubmit}>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Hospital Name</label>
                          <Input
                            defaultValue=""
                            placeholder="Hospital"
                            type="text"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Hospital Address</label>
                          <Input
                            defaultValue=""
                            placeholder="Address"
                            type="text"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-2" md="5">
                        <FormGroup>
                          <label>Hospital Tax Identification number (AFM)</label>
                          <Input placeholder="Hospital AFM" type="text" 
                            value={AFM}
                            onChange={onChange}
                            minLength="9"
                            maxLength="9"
                            required
                            />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Number of Vaccine Doses</label>
                          <Input
                            defaultValue=""
                            placeholder="Number of Vaccine Doses"
                            type="number"
                          />
                        </FormGroup>
                      </Col>  
                    </Row>
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
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
}
export default User;