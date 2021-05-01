import react, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addPatient } from '../../redux/action/patient';
import {setAlert} from '../../redux/action/alert';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";
  
  /*
  const {
    fullname,
    amka,
    age,
    address,
    city,
    country,
    /* vaccineStatus,
    vaccineBrand,
    numberOfDoses 
} = formData;*/

const PatientForm = ({addPatient, setAlert, isAuthorized, hide, patient}) => {
    const [formData, setformData] = useState({
        fullname : '',
        amka : '',
        age : 1,
        address : '',
        city : '',
        country : '',
        /* vaccineStatus : 1,
        vaccineBrand : '',
        numberOfDoses : 0, */
    });
}


    const onChange = (e) =>
        setformData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        /* PatientForm({ 
            fullname,
            amka,
            age,
            address,
            city,
            country,
            vaccineStatus,
            vaccineBrand,
            numberOfDoses }); */
        addPatient(formData);
        hide();
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
                        <CardTitle tag="h5">Patient Registration</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form>
                          <Row>
                            <Col className="pr-1" md="5">
                              <FormGroup>
                                <label>Fullname</label>
                                <Input
                                  defaultValue=""
                                  placeholder="name"
                                  type="text"
                                  onChange={onChange} 
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="px-1" md="3">
                              <FormGroup>
                                <label>amka</label>
                                <Input
                                  defaultValue=""
                                  placeholder="Amka"
                                  type="text"
                                  onChange={onChange} 
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-2" md="5">
                              <FormGroup>
                                <label>Age</label>
                                <Input placeholder="age" type="number" onChange={onChange} required/>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="pr-1" md="6">
                              <FormGroup>
                                <label>Address</label>
                                <Input
                                  defaultValue=""
                                  placeholder="address"
                                  type="text"
                                  onChange={onChange} 
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pr-1" md="6">
                              <FormGroup>
                                <label>City</label>
                                <Input
                                  defaultValue=""
                                  placeholder="city"
                                  type="text"
                                  onChange={onChange} 
                                  required
                                />
                              </FormGroup>
                            </Col>  
                            <Col className="pr-1" md="6">
                              <FormGroup>
                                <label>Country</label>
                                <Input
                                  defaultValue=""
                                  placeholder="country"
                                  type="text"
                                  onChange={onChange} 
                                  required
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
                                Create Patient
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

PatientForm.propTypes = {
    addPatient: PropTypes.func.isRequired,
    setAlert: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    addPatient: state.patientReducer,
    isAuthenticated: state.auth
});

export default connect(mapStateToProps, { setAlert, addPatient })(PatientForm);