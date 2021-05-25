import React, { Fragment, useEffect } from 'react';
import { Row, Col, CardBody, Card, CardTitle, CardHeader } from "reactstrap";
import { PieChartOneHospital } from '../Statistics/PieChartOneHospital';
import { PieChartforSEX } from '../Statistics/PieChartforSEX';
import { LineChart } from '../Statistics/LineChart' ;
import { Line, Pie } from "react-chartjs-2";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatients } from '../../redux/action/patient';
import { getVaccines } from '../../redux/action/vaccine';



const Statistics = ({ 
  patients: { loading, patients },
  getPatients,
  getVaccines,
  vaccines: { vaccines }
}) => {

  useEffect(() => {
    getPatients();
    getVaccines();
  }, [getPatients, loading]);
    
  //Pie Chart for Completed Vaccinated
  var patientsCompleted = 0;
  var patientsCancelled = 0;
  var patientsPending = 0;
  
  for (let i = 0; i<patients.length; i++){
    if (patients[i].vaccineStatus === "Completed"){
       patientsCompleted = patientsCompleted + 1;
    } else if (patients[i].vaccineStatus === "Pending") {
       patientsPending = patientsPending + 1;
    } else {
       patientsCancelled = patientsCancelled + 1;
    }
  }
    
  var allPatients = patients.length;

  //Pie Chart for Sex
  var patientsMale = 0;
  var patientsFemale = 0;
  
  for (let i = 0; i<patients.length; i++){
    if (patients[i].sex === "Male"){
      patientsMale = patientsMale + 1;
    } else if (patients[i].sex === "Female") {
      patientsFemale = patientsFemale + 1;
    }
  }
    
  var allPatients = patients.length;

  //Line Chart
  var sum;

  for (let i=0; i<patients.length; i++) {
    if (patients[i].age <= 20) {
      for (let j=0;j<vaccines.length; j++) {
        if (vaccines[j].vaccineBrand === patients[i].vaccineBrand) {
          sum[vaccines[j].vaccineBrand] = sum + 1;
        }
      }
    } 
  }

  return ( 
    <Fragment>
      <Row>
        <Col md="4">
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Completed Vaccinations for the My Hospital</CardTitle>
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
              <CardTitle tag="h5">Completed all Vaccinations for Male or Female</CardTitle>
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
                data={LineChart.data}
                options={LineChart.options}
                width={400}
                height={100}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment >
  );
};

Statistics.propTypes = {
  getPatients: PropTypes.func.isRequired,
  patients: PropTypes.object.isRequired,
  getVaccines: PropTypes.func.isRequired,
  vaccines: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  patients: state.patientReducer,
  vaccines: state.vaccineReducer
});
                        

export default connect(mapStateToProps, { getPatients, getVaccines })(
  Statistics
);