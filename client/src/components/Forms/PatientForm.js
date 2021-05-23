import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AvForm, AvGroup, AvFeedback, AvInput } from 'availity-reactstrap-validation';
import { Button, Label, Row, Col, FormText, Collapse } from 'reactstrap';
import { addPatient, updatePatient, removePatient } from '../../redux/action/patient';



const initialState = {
    firstname: '',
    lastname: '',
    birthdate: '',
    sex: '',
    age: null,
    amka: '',
    address: '',
    city: '',
    country: '',
    vaccineStatus: '',
    vaccineBrand: '',
    appointmentA: '',
    appointmentB: '',
    additionalInfo: ''
};

const PatientForm = ({ addPatient, updatePatient, removePatient, patient, hide }) => {
    const [formData, setFormData] = useState({ initialState });
   
    const [addInfoOpen, setaddInfoOpen] = useState(false);
    const [patientInfoOpen, setpatientInfoOpen] = useState(true);
    const [vacInfoOpen, setvacInfoOpen] = useState(true);

    //Vaccine brand Date
    var currentDate = new Date().toISOString().split('T');;
   // var nextVaccineDate = new Date();
   // nextVaccineDate.setDate(currentDate.getDate() + 0);
    //nextVaccineDate = nextVaccineDate.toISOString().split('T');
    
    useEffect(() => {
        if (patient) {
            const patientData = { ...initialState };
            for (const key in patient) {
                if (key in patientData) patientData[key] = patient[key];
            }
            setFormData(patientData);
        }
    }, [patient]);

    const {
        firstname,
        lastname,
        birthdate,
        sex,
        age,
        amka,
        address,
        city,
        country,
        vaccineStatus,
        vaccineBrand,
        appointmentA,
        appointmentB,
        additionalInfo
    } = formData;

    const togglePatientInfo = () => setpatientInfoOpen(!patientInfoOpen);

    const toggleVacInfo = () => setvacInfoOpen(!vacInfoOpen);

    const toggleAddInfo = () => {
        if (patientInfoOpen || vacInfoOpen) {
            setpatientInfoOpen(false);
            setvacInfoOpen(false);
        }
        setaddInfoOpen(!addInfoOpen);
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleValidSubmit = async (e) => {
        if (patient != null) {
            formData.age = currentDate[0] - formData.birthdate;
            updatePatient(patient._id, formData);
        } else {
            formData.age = currentDate[0] - formData.birthdate;
            addPatient(formData);
            hide();
        }
    }
    const removeVaccination = async (e) => {
        const confirm = (window.confirm('Are you sure you wish to delete this vaccination?'));
        if (confirm) {
            removePatient(patient._id);
            hide();
        }
    }

    return (
        <Fragment>
            <AvForm className="form" onValidSubmit={handleValidSubmit}>

                <FormText type="button" className="h6 pb-2 " onClick={togglePatientInfo}>
                    Patient Info
                {!patientInfoOpen ? <i className="ml-1 fas fa-caret-right"></i> : <i className="ml-1 fas fa-caret-down"></i>}
                </FormText>

                <Collapse isOpen={patientInfoOpen}>
                    <Row>
                        <Col>
                            <AvGroup>
                                <Label for="firstname">Firstname:</Label>
                                <AvInput
                                    type="text"
                                    placeholder="Firstname "
                                    name="firstname"
                                    value={firstname}
                                    onChange={onChange}
                                    required
                                />
                                <AvFeedback>The firstname name of the patient is required!</AvFeedback>
                            </AvGroup>
                        </Col>

                        <Col>
                            <AvGroup>
                                <Label for="lastname">Lastname:</Label>
                                <AvInput
                                    type="text"
                                    placeholder="Lastname "
                                    name="lastname"
                                    value={lastname}
                                    onChange={onChange}
                                    required
                                />
                                <AvFeedback>The lastname name of the patient is required!</AvFeedback>
                            </AvGroup>
                        </Col>
                    </Row>
                    <Row xs="2">
                        <Col>
                            <AvGroup>
                                <Label for="sex">Sex:</Label>
                                <AvInput type="select" name="sex" id="sex" onChange={onChange} value={sex} required>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </AvInput>
                                <AvFeedback>The sex is required!</AvFeedback>
                            </AvGroup>
                        </Col>

                        <Col>
                            <AvGroup>
                                <Label for="birthdate">Birthdate:</Label>
                                <AvInput
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    value={birthdate}
                                    onChange={onChange}
                                    required
                                />
                                <AvFeedback>The Birthdate is required!</AvFeedback>
                            </AvGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AvGroup>
                                <Label for="afm">AMKA:</Label>
                                <AvInput
                                    type="text"
                                    id="amka"
                                    placeholder="Amka"
                                    name="amka"
                                    value={amka}
                                    onChange={onChange}
                                    minLength="11"
                                    maxLength="11"
                                    pattern="^[0-9]+$"
                                    required
                                />
                                <AvFeedback>The AMKA is required and must be 11 numbers in length!</AvFeedback>
                            </AvGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <AvGroup>
                                <Label>Address:</Label>
                                <AvInput
                                    type="text"
                                    placeholder="Patient Address"
                                    name="address"
                                    value={address}
                                    onChange={onChange}
                                    required
                                />
                                <AvFeedback>The address of the patient is required!</AvFeedback>
                            </AvGroup>
                        </Col>
                    </Row>
                    <Row xs="2">
                        <Col>
                            <AvGroup>
                                <Label>City:</Label>
                                <AvInput
                                    type="text"
                                    placeholder="City"
                                    name="city"
                                    value={city}
                                    onChange={onChange}
                                    required
                                />
                                <AvFeedback>The city of the patient is required!</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col>
                            <AvGroup>
                                <Label>Country:</Label>
                                <AvInput
                                    type="text"
                                    placeholder="Country of Patient"
                                    name="country"
                                    value={country}
                                    onChange={onChange}
                                    required
                                />
                                <AvFeedback>The country of the patient is required!</AvFeedback>
                            </AvGroup>
                        </Col>
                    </Row>
                </Collapse>

                <FormText type="button" id="vaccInfo" onClick={toggleVacInfo} className="h6 mt-4 pb-2">
                    Vaccination Info
                     {!vacInfoOpen ? <i className="ml-1 fas fa-caret-right"></i> : <i className="ml-1 fas fa-caret-down"></i>}
                </FormText>
                <Collapse isOpen={vacInfoOpen}>
                    <AvGroup>
                        <Label for="vaccineBrand">Vaccine Brand:</Label>
                        <AvInput
                            id="vaccineBrand"
                            type="text"
                            placeholder="The brand of the vaccine"
                            name="vaccineBrand"
                            value={vaccineBrand}
                            onChange={onChange}
                        />
                    </AvGroup>
                    <Row>
                        <Col>
                            <AvGroup>
                                <Label for="appointmentA">First Appointment:</Label>
                                <AvInput
                                    type="date"
                                    id="appointmentA"
                                    name="appointmentA"
                                    value={appointmentA}
                                    onChange={onChange}
                                    min={currentDate[0]}
                                    required
                                />
                                <AvFeedback>The First Appointment is required!</AvFeedback>
                            </AvGroup>
                        </Col> <Col>
                            <AvGroup>
                                <Label for="appointmentB">Second Appointment:</Label>
                                <AvInput
                                    type="date"
                                    id="appointmentB"
                                    name="appointmentB"
                                    value={appointmentB}
                                    onChange={onChange}
                                    min={currentDate[0]}
                                    required
                                />
                                <AvFeedback>The second appointment is required!</AvFeedback>
                            </AvGroup>
                        </Col>
                    </Row>
                    <AvGroup>
                        <Label for="vaccineStatus">Status of Vaccination:</Label>
                        <AvInput type="select" name="vaccineStatus" id="vaccineStatus" onChange={onChange} value={vaccineStatus} required>
                            <option value="">Not Scheduled</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </AvInput>
                    </AvGroup>
                </Collapse>

                <FormText type="button" id="addInfo" className="h6 mt-4 pb-2" onClick={toggleAddInfo}>
                    Additional Info
                     {!addInfoOpen ? <i className="ml-1 fas fa-caret-right"></i> : <i className="ml-1 fas fa-caret-down"></i>}
                </FormText>
                <Collapse isOpen={addInfoOpen}>
                    <AvGroup>
                        <Label for="addtionalInfo">Additional Info:</Label>
                        <AvInput
                            type="textarea"
                            name="additionalInfo"
                            id="additionalInfo"
                            onChange={onChange}
                            value={additionalInfo}
                            placeholder="symptoms..etc"
                        />
                    </AvGroup>
                </Collapse>

                <AvGroup className="float-right">
                    <Button type="submit">Submit</Button>
                </AvGroup>
            </AvForm>
            {patient ? <Button color="danger " className="float-right" onClick={removeVaccination}>Delete Patient</Button> : ""}
        </Fragment>
    );
}

PatientForm.propTypes = {
    removePatient: PropTypes.func.isRequired,
    addPatient: PropTypes.func.isRequired,
    updatePatient: PropTypes.func.isRequired,
    getVaccines:PropTypes.func.isRequired,
    isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth
});

export default connect(mapStateToProps, { addPatient, updatePatient, removePatient })(PatientForm);
