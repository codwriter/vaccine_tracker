import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AvForm, AvGroup, AvFeedback, AvInput } from 'availity-reactstrap-validation';
import { Button, Label, Row, Col } from 'reactstrap';
import { removeVaccine, updateVaccine, addVaccine } from '../../redux/action/vaccine';

const initialState = {
    vaccineBrand: '',
    doses: null,
    appointments: null
};
const VaccineForm = ({
    vaccine,
    removeVaccine,
    updateVaccine,
    addVaccine,
    hide,
}) => {
    useEffect(() => {
        if (vaccine) {
            const vaccineData = { ...initialState };
            for (const key in vaccine) {
                if (key in vaccineData) vaccineData[key] = vaccine[key];
            }
            setFormData(vaccineData);
        }
    }, [vaccine]);
    const [formData, setFormData] = useState(initialState);
    const { vaccineBrand, doses, appointments } = formData;

    const onChange = (e) => {
        if (e.target.name === "doses") {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        } else if (e.target.name === "appointments") {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleValidSubmit = async (e) => {
        if (vaccine != null) {
            updateVaccine(vaccine._id, formData);
        } else {
            addVaccine(formData);
        }
        hide();
        console.log(formData)
    }
    const deleteVaccine = async (e) => {
        const confirm = (window.confirm('Are you sure you wish to delete this vaccine?'));
        if (confirm) {
            removeVaccine(vaccine._id);
            hide();
        }
    }

    return (
        <AvForm className="form" onValidSubmit={handleValidSubmit}>
            <Row>
                <Col sm="6" md="6" lg="6">
                    <AvGroup>
                        <Label>Vaccine Brand</Label>
                        <AvInput
                            type="text"
                            placeholder="The vaccine brand"
                            name="vaccineBrand"
                            onChange={onChange}
                            value={vaccineBrand}
                            required
                        />
                        <AvFeedback>The vaccine brand is required!</AvFeedback>
                    </AvGroup>
                </Col>
                <Col>
                    <AvGroup>
                        <Label>Doses</Label>
                        <AvInput
                            type="number"
                            placeholder="Available doses"
                            name="doses"
                            onChange={onChange}
                            value={doses}
                            required
                        />
                        <AvFeedback>The available doses are required!</AvFeedback>
                    </AvGroup>
                </Col>
                <Col >
                    <AvGroup>
                        <Label>Appointments</Label>
                        <AvInput
                            type="number"
                            placeholder="N. Appointments"
                            name="appointments"
                            onChange={onChange}
                            value={appointments}
                            min="1"
                            max="2"
                            minlength="1"
                            maxlength="1"
                            required
                        />
                        <AvFeedback>The number of vaccine appointments is required!</AvFeedback>
                    </AvGroup>

                </Col>
            </Row>
            <AvGroup>
                <Button className="pull-right" type="submit">Submit</Button>
                {vaccine ? <Button className="pull-right btn-danger mr-2" onClick={deleteVaccine} type="submit"><i className="far fa-trash-alt"></i></Button> : ''}
            </AvGroup>
        </AvForm>
    );
}
VaccineForm.propTypes = {
    removeVaccine: PropTypes.func.isRequired,
    addVaccine: PropTypes.func.isRequired,
    updateVaccine: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { removeVaccine, updateVaccine, addVaccine })(VaccineForm);

