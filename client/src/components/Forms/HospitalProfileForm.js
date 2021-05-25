import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvForm, AvGroup, AvFeedback, AvInput } from 'availity-reactstrap-validation';
import { createHospital, updateHospital, getCurrentHospital } from '../../redux/action/hospital';
import { Button, Label, Spinner, Card, CardHeader, CardBody, Row, Col, CardTitle } from 'reactstrap';
import VaccineTable from '../profile/VaccineTable';
import useModal from '../Modals/useModal';
import VaccineModal from '../Modals/vaccineModal';

const initialState = {
  name: '',
  afm: '',
  address: '',
  city: '',
  country: '',
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
  const { isShowing, toggle } = useModal();
  const [vaccine, setVaccine] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  //const [disabled, setdisabled] = useState(false);

  useEffect(() => {
    if (!hospital) getCurrentHospital();
    if (!loading && hospital) {
      const hospitalData = { ...initialState };
      for (const key in hospital) {
        if (key in hospitalData) hospitalData[key] = hospital[key];
      }
      setFormData(hospitalData);
    }
  }, [loading, getCurrentHospital, hospital,]);


  const { name, address, afm, city, country } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


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
            <CardTitle className="text-primary text-center h6">{title}</CardTitle>
          </CardHeader>
          <CardBody>
            <AvForm className="form" onValidSubmit={handleValidSubmit} onChange={onChange}>
              <AvGroup>
                <Label>Hospital Name</Label>
                <AvInput
                  autoComplete="true"
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
                <Label>Address</Label>
                <AvInput
                  autoComplete="true"
                  type="text"
                  placeholder="Hospital Address"
                  name="address"
                  value={address}
                  onChange={onChange}
                  required
                />
                <AvFeedback>The address of the hospital is required!</AvFeedback>
              </AvGroup>
              <Row>
                <Col>
                  <AvGroup>
                    <Label>City</Label>
                    <AvInput
                      autoComplete="true"
                      type="text"
                      placeholder="Hospital City"
                      name="city"
                      value={city}
                      onChange={onChange}
                      required
                    />
                    <AvFeedback>The city of the hospital is required!</AvFeedback>
                  </AvGroup>
                </Col>
                <Col>
                  <AvGroup>
                    <Label>Country</Label>
                    <AvInput
                      autoComplete="true"
                      type="text"
                      placeholder="Hospital Country"
                      name="country"
                      value={country}
                      onChange={onChange}
                      required
                    />
                    <AvFeedback>The country of the hospital is required!</AvFeedback>
                  </AvGroup>
                </Col>
              </Row>

              <AvGroup>
                <Label for="afm">Tax Identification Number</Label>
                <AvInput
                  autoComplete="true"
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
                />
                <AvFeedback>The afm is required and must be 9 numbers in length!</AvFeedback>
              </AvGroup>
              <Row>
                <Col>
                  <Row>
                    <Col className="text-center">
                      <Button className="btn-primary" type="submit">Submit</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </AvForm>

          </CardBody>
        </Card>
      )}
      <Card className="card">
        <CardHeader>

          <Row>
            <Col>
              <CardTitle className="text-primary text-center h6">Vaccines</CardTitle>
            </Col>
            <Col sm="1" md="1" lg="1">
              <Button
                onClick={() => { setModalTitle("Add Vaccine"); toggle(); setVaccine(null); }}
                className=" btn-sm btn-icon btn-primary btn-round pull-right">
                <i className="fas fa-plus"></i>
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row className="mt-4">
            <VaccineModal isShowing={isShowing} hide={toggle} vaccine={vaccine} title={modalTitle} />
            <Col>
              <VaccineTable loading={loading} toggle={toggle} setTitle={setModalTitle} setVaccine={setVaccine} />
            </Col>
          </Row>
        </CardBody>
      </Card>
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