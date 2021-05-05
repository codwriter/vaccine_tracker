import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvForm, AvGroup, AvFeedback, AvInput } from 'availity-reactstrap-validation';
import { createHospital, updateHospital, getCurrentHospital } from '../../redux/action/hospital';
import { Button, Label, Spinner, Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import Alert from '../../components/layout/Alert';
const initialState = {
  name: '',
  afm: '',
  address: '',
  numberOfDosesAvailable: null
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


  const { name, address, afm, numberOfDosesAvailable } = formData;

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
      {loading ? <Spinner /> : (
        <Card>
          <CardHeader>
            <h1 className="large text-primary">{title}</h1>
          </CardHeader>
          <CardBody>
            <AvForm className="form text-white" onValidSubmit={handleValidSubmit}>
              <AvGroup>
                <Label>Hospital Name</Label>
                <AvInput
                  autocomplete="true"
                  type="text"
                  placeholder="The name of the hospital"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
                <AvFeedback>The name of the hospital is required!</AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label>Hospital Address</Label>
                <AvInput
                  autocomplete="true"
                  type="text"
                  placeholder="Hospital Address"
                  name="address"
                  value={address}
                  onChange={onChange}
                  required
                />
                <AvFeedback>The address of the hospital is required!</AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label for="afm">Tax Identification Number</Label>
                <AvInput
                  autocomplete="true"
                  type="text"
                  id="afm"
                  placeholder="Tax Identification Number(AFM)"
                  name="afm"
                  value={afm}
                  onChange={onChange}
                  minLength="9"
                  maxLength="9"
                  pattern="^[0-9]+$"
                  required
                  disabled={disabled}
                />
                <AvFeedback>The afm is required and must be 9 numbers in length!</AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label for="numberOfDosesAvailable">Number of Doses</Label>
                <AvInput
                  autocomplete="true"
                  id="numberOfDosesAvailable"
                  type="number"
                  placeholder="Number of Doses"
                  name="numberOfDosesAvailable"
                  value={numberOfDosesAvailable}
                  onChange={onChange}
                  min="0"
                />
              </AvGroup>
              <AvGroup>
                <Button type="submit">Submit</Button>
              </AvGroup>
            </AvForm>
          </CardBody>
        </Card>
      )}
    </Fragment>
  );
};

Hospitalregister.propTypes = {
  getCurrentHospital: PropTypes.func.isRequired,
  createHospital: PropTypes.func.isRequired,
  updateHospital: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.object.isRequired,
  hospital: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  hospital: state.hospitalReducer,
  isAuthenticated: state.auth
});

export default connect(mapStateToProps, { createHospital, updateHospital, getCurrentHospital })(withRouter(Hospitalregister));