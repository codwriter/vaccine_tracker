import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AvForm, AvGroup, AvFeedback, AvInput, AvField } from 'availity-reactstrap-validation';
import { Button, Label, Row, Col } from 'reactstrap';
import { addPatient, updatePatient, removePatient } from '../../redux/action/patient';



const initialState = {
    fullname: '',
    amka: '',
    age: null,
    address: '',
    city: '',
    country: '',
    vaccineStatus: -1,
    vaccineBrand: '',
    numberOfDoses: 0
};

const PatientForm = ({ addPatient, updatePatient, removePatient, patient, hide }) => {
    const [formData, setFormData] = useState({ initialState });
    const [disabled, setdisabled] = useState(false);

    useEffect(() => {
        if (patient) {
            const patientData = { ...initialState };
            for (const key in patient) {
                if (key in patientData) patientData[key] = patient[key];
            }
            setFormData(patientData);
            setdisabled(true);
        }
    }, [patient]);

    const {
        fullname,
        amka,
        age,
        address,
        city,
        country,
        vaccineStatus,
        vaccineBrand,
        numberOfDoses
    } = formData;


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleValidSubmit = async (e) => {
        if (patient != null) {
            updatePatient(patient._id, formData);
        } else
            addPatient(formData);
        hide();
    }
    const removeVaccination = async (e) => {
        removePatient(patient._id);
        hide();
    }

    return (
        <Fragment>
            <AvForm className="form" onValidSubmit={handleValidSubmit}>
                <Row>
                    <Col>
                        <AvGroup>
                            <Label>Fullname</Label>
                            <AvInput
                                type="text"
                                placeholder="The name of the patient"
                                name="fullname"
                                value={fullname}
                                onChange={onChange}
                                required
                            />
                            <AvFeedback>The name of the patient is required!</AvFeedback>
                        </AvGroup>
                    </Col>
                </Row>
                <Row xs="2">
                    <Col>
                        <AvGroup>
                            <Label for="afm">AMKA</Label>
                            <AvInput
                                type="text"
                                id="amka"
                                placeholder="AMKA"
                                name="amka"
                                value={amka}
                                onChange={onChange}
                                minLength="11"
                                maxLength="11"
                                pattern="^[0-9]+$"
                                required
                                disabled={disabled}
                            />
                            <AvFeedback>The AMKA is required and must be 11 numbers in length!</AvFeedback>
                        </AvGroup>
                    </Col>
                    <Col>
                        <AvGroup>
                            <Label>Age</Label>
                            <AvInput
                                type="number"
                                placeholder="The age of the patient"
                                min='1'
                                max='120'
                                name="age"
                                value={age}
                                onChange={onChange}
                                required
                            />
                            <AvFeedback>The age of the patient is required and must be between 1-120!</AvFeedback>
                        </AvGroup>
                    </Col>
                </Row>

                <AvGroup>
                    <Label>Address</Label>
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
                <Row xs="2">
                    <Col>
                        <AvGroup>
                            <Label>City</Label>
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
                            <Label>Country</Label>
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


                <AvGroup>
                    <Label for="vaccineBrand">Vaccine Brand</Label>
                    <AvInput
                        id="vaccineBrand"
                        type="text"
                        placeholder="The brand of the vaccine"
                        name="vaccineBrand"
                        value={vaccineBrand}
                        onChange={onChange}
                    />
                </AvGroup>

                <AvGroup>
                    <Label for="vaccineStatus">Status of Vaccination</Label>
                    <AvInput type="select" name="vaccineStatus" id="vaccineStatus" onChange={onChange} value={vaccineStatus}>
                        <option value="-1">Not Scheduled</option>
                        <option value="0">Pending</option>
                        <option value="1">Completed</option>
                        <option value="2">Cancelled</option>
                    </AvInput>
                </AvGroup>

                <AvGroup>
                    <Label for="numberOfDoses">Number of Doses</Label>
                    <AvInput
                        id="numberOfDoses"
                        type="number"
                        placeholder="Number of Doses"
                        name="numberOfDoses"
                        value={numberOfDoses}
                        onChange={onChange}
                        min="0"
                    />
                </AvGroup>

                <AvGroup>
                    <Button type="submit">Submit</Button>
                </AvGroup>
            </AvForm>
            {patient? <Button color="danger " onClick={removeVaccination}>Delete Patient</Button>:""}
        </Fragment>
    );
}

PatientForm.propTypes = {
    removePatient: PropTypes.func.isRequired,
    addPatient: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth
});

export default connect(mapStateToProps, { addPatient, updatePatient, removePatient })(PatientForm);
