import React, { Fragment, useEffect ,useState} from 'react';
import { Row, Col, CardBody, Card, CardTitle, CardFooter, CardHeader } from "reactstrap";
import { PieChartOneHospital } from '../Statistics/PieChartOneHospital';
import { PieChartAllHospitals } from '../Statistics/PieChartAllHospitals';
import { LineChart } from '../Statistics/LineChart' ;
import { Line, Pie } from "react-chartjs-2";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatients } from '../../redux/action/patient';


const Statistics = ({ 
  patients: { loading, patients },
  getPatients
}) => {

  useEffect(() => {
    getPatients();
  }, [getPatients, loading]);
    


  
  for (let i = 0; i<patients.length; i++){
    if (patients[i].vaccineStatus === 1){
      var patientsCompleted = + 1;
    } else if (patients[i].vaccineStatus === 0) {
      var patientsPending = +1;
    } else {
      var patientsCancelled = +1;
    }
    }
  
  
  var allPatients = patients.length;

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
                data={PieChartOneHospital(patientsCompleted,patientsPending,patientsCancelled).data}
                options={PieChartOneHospital.options}
              />
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Completed Vaccinations for All Hospitals</CardTitle>
            </CardHeader>
            <CardBody>
              <Pie
                data={PieChartAllHospitals.data}
                options={PieChartAllHospitals.options}
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
};

const mapStateToProps = (state) => ({
  patients: state.patientReducer
});
                        

export default connect(mapStateToProps, { getPatients })(
  Statistics
);