import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, CardBody, Card, CardTitle, CardHeader, CustomInput, CardFooter, Spinner } from "reactstrap";
import { PieChartOneHospital } from '../Statistics/PieChartOneHospital';
import { PieChartforSEX } from '../Statistics/PieChartforSEX';
import { LineChart } from '../Statistics/LineChart' ;
import { Line, Pie } from "react-chartjs-2";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHospitalPatients, getPatients } from '../../redux/action/patient';
import { getVaccines } from '../../redux/action/vaccine';
import { getCurrentHospital } from '../../redux/action/hospital';

const Statistics = ({ 
  hospitalReducer: { loading: loadingHos, hospital },
  getPatients,
  getCurrentHospital,
  getHospitalPatients,
  getVaccines,
  vaccines: { loading: loadingVac, vaccines },
  patients: { loading: loadingPat, patients }
}) => {
  const [title, settitle] = useState(null)
  const [switchHospital, setSwitchHospital] = useState(false);

  useEffect(() => {
    getCurrentHospital();
    getHospitalPatients();
    getVaccines();
  }, []);

  const allhospitalVaccination = () => {
    if (!switchHospital) {
        settitle("All Hospitals Statistics");
        getPatients();
        setSwitchHospital(!switchHospital);
    }
    else {
        settitle(`My Hospital Statistics`);
        getHospitalPatients();
        setSwitchHospital(!switchHospital);
    }
  }
    
  //Pie Chart for Completed Vaccinated
  var patientsCompleted = 0;
  var patientsCancelled = 0;
  var patientsPending = 0;
  
  if (loadingPat === false && patients[0]) {
    for (let i = 0; i<patients.length; i++){
      if (patients[i].vaccineStatus === "Completed") {
        patientsCompleted = patientsCompleted + 1;
      } else if (patients[i].vaccineStatus === "Pending") {
        patientsPending = patientsPending + 1;
      } else {
        patientsCancelled = patientsCancelled + 1;
      }
    }
  }
    
  var allPatients = patients.length;

  //Pie Chart for Sex
  var patientsMale = 0;
  var patientsFemale = 0;
  
  if (loadingPat === false && patients[0]) {
    for (let i = 0; i<patients.length; i++) {
      if (patients[i].sex === "Male" && patients[i].vaccineStatus != "Cancelled") {
        patientsMale = patientsMale + 1;
      } else if (patients[i].sex === "Female" && patients[i].vaccineStatus != "Cancelled") {
        patientsFemale = patientsFemale + 1;
      }
    }
  }

  //Line Chart
  var age20 = {};
  var age30 = {};
  var age40 = {};
  var age50 = {};
  var age60 = {};
  var age70 = {};
  var age80 = {};
  var age90 = {};
  var age100 = {};

  for (let patient of patients) {
    if (patient.age <= 20) {
      if (age20[patient.vaccineBrand] == null) {
        age20[patient.vaccineBrand] = 0;
      }
      age20[patient.vaccineBrand] += 1;
    } else if (patient.age > 20 && patient.age <= 30) {
      if (age30[patient.vaccineBrand] == null) {
        age30[patient.vaccineBrand] = 0;
      }
      age30[patient.vaccineBrand] += 1;
    } else if (patient.age > 30 && patient.age <= 40) {
      if (age40[patient.vaccineBrand] == null) {
        age40[patient.vaccineBrand] = 0;
      }
      age40[patient.vaccineBrand] += 1;
    } else if (patient.age > 40 && patient.age <= 50) {
      if (age50[patient.vaccineBrand] == null) {
        age50[patient.vaccineBrand] = 0;
      }
      age50[patient.vaccineBrand] += 1;
    } else if (patient.age > 50 && patient.age <= 60) {
      if (age60[patient.vaccineBrand] == null) {
        age60[patient.vaccineBrand] = 0;
      }
      age60[patient.vaccineBrand] += 1;
    } else if (patient.age > 60 && patient.age <= 70) {
      if (age70[patient.vaccineBrand] == null) {
        age70[patient.vaccineBrand] = 0;
      }
      age70[patient.vaccineBrand] += 1;
    } else if (patient.age > 70 && patient.age <= 80) {
      if (age80[patient.vaccineBrand] == null) {
        age80[patient.vaccineBrand] = 0;
      }
      age80[patient.vaccineBrand] += 1;
    } else if (patient.age > 80 && patient.age <= 90) {
      if (age90[patient.vaccineBrand] == null) {
        age90[patient.vaccineBrand] = 0;
      }
      age90[patient.vaccineBrand] += 1;
    } else if (patient.age > 90) {
      if (age100[patient.vaccineBrand] == null) {
        age100[patient.vaccineBrand] = 0;
      }
      age100[patient.vaccineBrand] += 1;
    }
  }


  console.log(age20, age30, age40, age50, age60, age70, age80, age90, age100);
  
  return ( loadingVac || loadingPat || loadingHos?<Spinner/>:( 
    patients[0] && vaccines[0]?(
    <Fragment>
      <Row>
        <Col >
          <Card>
            <CardHeader>
              <h1 className="text-center">{title?title:'My Hospital Statistics'}</h1>
            </CardHeader>
            <CardFooter >
              { <span className="float-right ">
                <CustomInput
                  checked={switchHospital}
                  className="hospital-switch "
                  type="switch"
                  name="customSwitch"
                  id="cudtomHospitalSwitch"
                  label="All Hospital"
                  onChange={allhospitalVaccination}
                />
              </span> }
            </CardFooter>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Completed, Pending & Cancelled Vaccinations</CardTitle>
            </CardHeader>
            <CardBody>
              <Pie
                data={PieChartOneHospital(patientsCompleted, patientsPending, patientsCancelled).data}
                options={PieChartOneHospital.options}
              />
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Completed Vaccinations for Male or Female</CardTitle>
            </CardHeader>
            <CardBody>
              <Pie
                data={PieChartforSEX(patientsMale, patientsFemale).data}
                options={PieChartforSEX.options}
              />
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Completed Vaccinations for Brands</CardTitle>
            </CardHeader>
            <CardBody>
              <Pie
                data={PieChartforSEX(patientsMale, patientsFemale).data}
                options={PieChartforSEX.options}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h5">Vaccinations </CardTitle>
            </CardHeader>
            <CardBody>
              <Line
                data={LineChart(age20, 
                                age30, 
                                age40, 
                                age50, 
                                age60, 
                                age70, 
                                age80, 
                                age90, 
                                age100).data}
                options={LineChart.options}
                width={400}
                height={100}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment >
    ):(
    <Fragment>
      <Card>
        <h1>There are no Statistics yet...!</h1>
      </Card>
    </Fragment>
    )
  )
  );
};

Statistics.propTypes = {
  getHospitalPatients: PropTypes.func.isRequired,
  getCurrentHospital: PropTypes.func.isRequired,
  getPatients: PropTypes.func.isRequired,
  patients: PropTypes.object.isRequired,
  getVaccines: PropTypes.func.isRequired,
  vaccines: PropTypes.object.isRequired,
  hospital: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  patients: state.patientReducer,
  vaccines: state.vaccineReducer,
  hospitalReducer: state.hospitalReducer
});
                        

export default connect(mapStateToProps, { getPatients, getHospitalPatients, getCurrentHospital, getVaccines })( Statistics );