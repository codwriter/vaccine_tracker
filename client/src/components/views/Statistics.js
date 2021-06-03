import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, CardBody, Card, CardTitle, CardHeader, CustomInput, CardFooter, Spinner } from "reactstrap";
import { PieChartForHospital } from '../Statistics/PieChartForHospital';
import { PieChartForSEX } from '../Statistics/PieChartForSEX';
import { PieChartForBrands } from '../Statistics/PieChartForBrands';
import { LineChart } from '../Statistics/LineChart';
import { Line, Pie } from "react-chartjs-2";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHospitalPatients, getPatients } from '../../redux/action/patient';
import { getVaccines } from '../../redux/action/vaccine';
import { getCurrentHospital } from '../../redux/action/hospital';
import { Redirect } from 'react-router';

const Statistics = ({
  hospitalReducer: { loading: loadingHos, hospital },
  getPatients,
  getCurrentHospital,
  getHospitalPatients,
  user: { user },
  getVaccines,
  vaccines: { loading: loadingVac, vaccines },
  patients: { loading: loadingPat, patients }
}) => {
  const [title, settitle] = useState(null)
  const [switchHospital, setSwitchHospital] = useState(false);

  useEffect(() => {
    /*  getCurrentHospital(); */
    getHospitalPatients();
    /* getVaccines(); */
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
  console.log(user.hospital);
  if (!user.hospital) {
    return <Redirect to="/intro" />
  }

  //Pie Chart for Completed Vaccinated
  var patientsCompleted = 0;
  var patientsCancelled = 0;
  var patientsPending = 0;

  if (loadingPat === false && patients[0]) {
    for (let i = 0; i < patients.length; i++) {
      if (patients[i].vaccineStatus === "Completed") {
        patientsCompleted = patientsCompleted + 1;
      } else if (patients[i].vaccineStatus === "Pending") {
        patientsPending = patientsPending + 1;
      } else {
        patientsCancelled = patientsCancelled + 1;
      }
    }
  }


  //Pie Chart for Sex
  var patientsMale = 0;
  var patientsFemale = 0;

  if (loadingPat === false && patients[0]) {
    for (let i = 0; i < patients.length; i++) {
      if (patients[i].sex === "Male" &&
        patients[i].vaccineStatus === "Completed") {
        patientsMale = patientsMale + 1;
      } else if (patients[i].sex === "Female" &&
        patients[i].vaccineStatus === "Completed") {
        patientsFemale = patientsFemale + 1;
      }
    }
  }

  //Pie Chart for Brands
  var patientsPfizer = 0;
  var patientsAstra = 0;
  var patientsJohnson = 0;
  var patientsModerna = 0;

  if (loadingPat === false && patients[0]) {
    for (let i = 0; i < patients.length; i++) {
      if (patients[i].vaccineBrand === "Pfizer" &&
        patients[i].vaccineStatus === "Completed") {
        patientsPfizer = patientsPfizer + 1;
      } else if (patients[i].vaccineBrand === "AstraZeneca" &&
        patients[i].vaccineStatus === "Completed") {
        patientsAstra = patientsAstra + 1;
      } else if (patients[i].vaccineBrand === "J&J" &&
        patients[i].vaccineStatus === "Completed") {
        patientsJohnson = patientsJohnson + 1;
      } else if (patients[i].vaccineBrand === "Moderna" &&
        patients[i].vaccineStatus === "Completed") {
        patientsModerna = patientsModerna + 1;
      }
    }
  }

  //Line Chart
  var patientsPfizer20 = 0;
  var patientsPfizer30 = 0;
  var patientsPfizer40 = 0;
  var patientsPfizer50 = 0;
  var patientsPfizer60 = 0;
  var patientsPfizer70 = 0;
  var patientsPfizer80 = 0;
  var patientsPfizer90 = 0;
  var patientsPfizer100 = 0;

  var patientsAstraZeneca20 = 0;
  var patientsAstraZeneca30 = 0;
  var patientsAstraZeneca40 = 0;
  var patientsAstraZeneca50 = 0;
  var patientsAstraZeneca60 = 0;
  var patientsAstraZeneca70 = 0;
  var patientsAstraZeneca80 = 0;
  var patientsAstraZeneca90 = 0;
  var patientsAstraZeneca100 = 0;

  var patientsJohnson20 = 0;
  var patientsJohnson30 = 0;
  var patientsJohnson40 = 0;
  var patientsJohnson50 = 0;
  var patientsJohnson60 = 0;
  var patientsJohnson70 = 0;
  var patientsJohnson80 = 0;
  var patientsJohnson90 = 0;
  var patientsJohnson100 = 0;

  var patientsModerna20 = 0;
  var patientsModerna30 = 0;
  var patientsModerna40 = 0;
  var patientsModerna50 = 0;
  var patientsModerna60 = 0;
  var patientsModerna70 = 0;
  var patientsModerna80 = 0;
  var patientsModerna90 = 0;
  var patientsModerna100 = 0;

  if (loadingPat === false && patients[0]) {
    for (let i = 0; i < patients.length; i++) {
      if (patients[i].vaccineBrand === "Pfizer" && patients[i].age <= 20 && patients[i].vaccineStatus === "Completed") {
        patientsPfizer20 = patientsPfizer20 + 1;
      } else if (patients[i].vaccineBrand === "Pfizer" && patients[i].age <= 30 && patients[i].vaccineStatus === "Completed") {
        patientsPfizer30 = patientsPfizer30 + 1;
      } else if (patients[i].vaccineBrand === "Pfizer" && patients[i].age <= 40 && patients[i].vaccineStatus === "Completed") {
        patientsPfizer40 = patientsPfizer40 + 1;
      } else if (patients[i].vaccineBrand === "Pfizer" && patients[i].age <= 50 && patients[i].vaccineStatus === "Completed") {
        patientsPfizer50 = patientsPfizer50 + 1;
      } else if (patients[i].vaccineBrand === "Pfizer" && patients[i].age <= 60 && patients[i].vaccineStatus === "Completed") {
        patientsPfizer60 = patientsPfizer60 + 1;
      } else if (patients[i].vaccineBrand === "Pfizer" && patients[i].age <= 70 && patients[i].vaccineStatus === "Completed") {
        patientsPfizer70 = patientsPfizer70 + 1;
      } else if (patients[i].vaccineBrand === "Pfizer" && patients[i].age <= 80 && patients[i].vaccineStatus === "Completed") {
        patientsPfizer80 = patientsPfizer80 + 1;
      } else if (patients[i].vaccineBrand === "Pfizer" && patients[i].age <= 90 && patients[i].vaccineStatus === "Completed") {
        patientsPfizer90 = patientsPfizer90 + 1;
      } else if (patients[i].vaccineBrand === "Pfizer" && patients[i].age >= 100 && patients[i].vaccineStatus === "Completed") {
        patientsPfizer100 = patientsPfizer100 + 1;
      }

      if (patients[i].vaccineBrand === "AstraZeneca" && patients[i].age <= 20 && patients[i].vaccineStatus === "Completed") {
        patientsAstraZeneca20 = patientsAstraZeneca20 + 1;
      } else if (patients[i].vaccineBrand === "AstraZeneca" && patients[i].age <= 30 && patients[i].vaccineStatus === "Completed") {
        patientsAstraZeneca30 = patientsAstraZeneca30 + 1;
      } else if (patients[i].vaccineBrand === "AstraZeneca" && patients[i].age <= 40 && patients[i].vaccineStatus === "Completed") {
        patientsAstraZeneca40 = patientsAstraZeneca40 + 1;
      } else if (patients[i].vaccineBrand === "AstraZeneca" && patients[i].age <= 50 && patients[i].vaccineStatus === "Completed") {
        patientsAstraZeneca50 = patientsAstraZeneca50 + 1;
      } else if (patients[i].vaccineBrand === "AstraZeneca" && patients[i].age <= 60 && patients[i].vaccineStatus === "Completed") {
        patientsAstraZeneca60 = patientsAstraZeneca60 + 1;
      } else if (patients[i].vaccineBrand === "AstraZeneca" && patients[i].age <= 70 && patients[i].vaccineStatus === "Completed") {
        patientsAstraZeneca70 = patientsAstraZeneca70 + 1;
      } else if (patients[i].vaccineBrand === "AstraZeneca" && patients[i].age <= 80 && patients[i].vaccineStatus === "Completed") {
        patientsAstraZeneca80 = patientsAstraZeneca80 + 1;
      } else if (patients[i].vaccineBrand === "AstraZeneca" && patients[i].age <= 90 && patients[i].vaccineStatus === "Completed") {
        patientsAstraZeneca90 = patientsAstraZeneca90 + 1;
      } else if (patients[i].vaccineBrand === "AstraZeneca" && patients[i].age >= 100 && patients[i].vaccineStatus === "Completed") {
        patientsAstraZeneca100 = patientsAstraZeneca100 + 1;
      }

      if (patients[i].vaccineBrand === "J&J" && patients[i].age <= 20 && patients[i].vaccineStatus === "Completed") {
        patientsJohnson20 = patientsJohnson20 + 1;
      } else if (patients[i].vaccineBrand === "J&J" && patients[i].age <= 30 && patients[i].vaccineStatus === "Completed") {
        patientsJohnson30 = patientsJohnson30 + 1;
      } else if (patients[i].vaccineBrand === "J&J" && patients[i].age <= 40 && patients[i].vaccineStatus === "Completed") {
        patientsJohnson40 = patientsJohnson40 + 1;
      } else if (patients[i].vaccineBrand === "J&J" && patients[i].age <= 50 && patients[i].vaccineStatus === "Completed") {
        patientsJohnson50 = patientsJohnson50 + 1;
      } else if (patients[i].vaccineBrand === "J&J" && patients[i].age <= 60 && patients[i].vaccineStatus === "Completed") {
        patientsJohnson60 = patientsJohnson60 + 1;
      } else if (patients[i].vaccineBrand === "J&J" && patients[i].age <= 70 && patients[i].vaccineStatus === "Completed") {
        patientsJohnson70 = patientsJohnson70 + 1;
      } else if (patients[i].vaccineBrand === "J&J" && patients[i].age <= 80 && patients[i].vaccineStatus === "Completed") {
        patientsJohnson80 = patientsJohnson80 + 1;
      } else if (patients[i].vaccineBrand === "J&J" && patients[i].age <= 90 && patients[i].vaccineStatus === "Completed") {
        patientsJohnson90 = patientsJohnson90 + 1;
      } else if (patients[i].vaccineBrand === "J&J" && patients[i].age >= 100 && patients[i].vaccineStatus === "Completed") {
        patientsJohnson100 = patientsJohnson100 + 1;
      }

      if (patients[i].vaccineBrand === "Moderna" && patients[i].age <= 20 && patients[i].vaccineStatus === "Completed") {
        patientsModerna20 = patientsModerna20 + 1;
      } else if (patients[i].vaccineBrand === "Moderna" && patients[i].age <= 30 && patients[i].vaccineStatus === "Completed") {
        patientsModerna30 = patientsModerna30 + 1;
      } else if (patients[i].vaccineBrand === "Moderna" && patients[i].age <= 40 && patients[i].vaccineStatus === "Completed") {
        patientsModerna40 = patientsModerna40 + 1;
      } else if (patients[i].vaccineBrand === "Moderna" && patients[i].age <= 50 && patients[i].vaccineStatus === "Completed") {
        patientsModerna50 = patientsModerna50 + 1;
      } else if (patients[i].vaccineBrand === "Moderna" && patients[i].age <= 60 && patients[i].vaccineStatus === "Completed") {
        patientsModerna60 = patientsModerna60 + 1;
      } else if (patients[i].vaccineBrand === "Moderna" && patients[i].age <= 70 && patients[i].vaccineStatus === "Completed") {
        patientsModerna70 = patientsModerna70 + 1;
      } else if (patients[i].vaccineBrand === "Moderna" && patients[i].age <= 80 && patients[i].vaccineStatus === "Completed") {
        patientsModerna80 = patientsModerna80 + 1;
      } else if (patients[i].vaccineBrand === "Moderna" && patients[i].age <= 90 && patients[i].vaccineStatus === "Completed") {
        patientsModerna90 = patientsModerna90 + 1;
      } else if (patients[i].vaccineBrand === "Moderna" && patients[i].age >= 100 && patients[i].vaccineStatus === "Completed") {
        patientsModerna100 = patientsModerna100 + 1;
      }
    }
  }

  //Estimated Vaccine Doses (Average)
  var estimatedDoses = 0;

  if (loadingPat === false && patients[0]) {
    for (let patient of patients) {
      if (patient.vaccineStatus === "Pending") {
        if (patient.appointmentB) {
          estimatedDoses += 2;
        } else
          estimatedDoses += 1;
      }
    }
  }

  /* const time = Object.entries(estimatedDoses) */



  return (/* loadingVac ||  */loadingPat /* || loadingHos */ ? <Spinner /> : (
    <Fragment>
      <Row>
        <Col >
          <Card>
            <CardHeader>
              <h1 className="text-center text-accent">{title ? title : 'My Hospital Statistics'}</h1>
            </CardHeader>

            <CardFooter>
              <Row>
                {!switchHospital ?
                  <p className="h6 text-accent ml-2">Estimated Vaccine Doses: {estimatedDoses ? estimatedDoses : '0'}</p>
                  : ''}
                {<span className="ml-auto">
                  <CustomInput
                    checked={switchHospital}
                    className="hospital-switch pr-1 "
                    type="switch"
                    name="customSwitch"
                    id="cudtomHospitalSwitch"
                    label="All Hospitals"
                    onChange={allhospitalVaccination}
                  />
                </span>}
              </Row>
            </CardFooter>
          </Card>
        </Col>
      </Row>

      {patients[0]  /* && vaccines[0]  && hospital */ ?
        (
          <>
            <Row>
              <Col md="6" lg="4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center" tag="h5">Completed, Pending & Cancelled Vaccinations</CardTitle>
                    <hr />
                  </CardHeader>
                  <CardBody>
                    <Pie
                      data={PieChartForHospital(patientsCompleted, patientsPending, patientsCancelled).data}
                      options={PieChartForHospital.options}
                      className="p-2"
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" lg="4">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h5" className="text-center pieMaleFem">Completed vaccinations for Male or Female</CardTitle>
                    <hr />
                  </CardHeader>
                  <CardBody>
                    {patientsMale === 0 && patientsFemale === 0 ? <p className="my-5 text-center h6">There is no data yet..!</p> : <Pie
                      data={PieChartForSEX(patientsMale, patientsFemale).data}
                      options={PieChartForSEX.options}
                      className="p-2"
                    />
                    }
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" lg="4">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h5" className="text-center pieforBrands">Completed vaccinations for every vaccine brand</CardTitle>
                    <hr />
                  </CardHeader>
                  <CardBody>
                    {patientsPfizer === 0 && patientsAstra === 0 && patientsJohnson === 0 && patientsModerna === 0 ? <p className="my-5 text-center h6">There is no data yet..!</p> : <Pie
                      data={PieChartForBrands(patientsPfizer, patientsAstra, patientsJohnson, patientsModerna).data}
                      options={PieChartForBrands.options}
                      className="p-2"
                    />
                    }
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12" >
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h5">Completed vaccinations per age and brand </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Line
                      data={LineChart(patientsPfizer20, patientsAstraZeneca20, patientsJohnson20, patientsModerna20,
                        patientsPfizer30, patientsAstraZeneca30, patientsJohnson30, patientsModerna30,
                        patientsPfizer40, patientsAstraZeneca40, patientsJohnson40, patientsModerna40,
                        patientsPfizer50, patientsAstraZeneca50, patientsJohnson50, patientsModerna50,
                        patientsPfizer60, patientsAstraZeneca60, patientsJohnson60, patientsModerna60,
                        patientsPfizer70, patientsAstraZeneca70, patientsJohnson70, patientsModerna70,
                        patientsPfizer80, patientsAstraZeneca80, patientsJohnson80, patientsModerna80,
                        patientsPfizer90, patientsAstraZeneca90, patientsJohnson90, patientsModerna90,
                        patientsPfizer100, patientsAstraZeneca100, patientsJohnson100, patientsModerna100
                      ).data}
                      options={LineChart.options}
                      width={50}
                      height={15}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        ) : <>
          <Card>
            <p className="h3 text-center mx-auto p-5">There are no Statistics yet...!</p>
          </Card>
        </>}

    </Fragment >
  )
  );
};

Statistics.propTypes = {
  getHospitalPatients: PropTypes.func.isRequired,
  //getCurrentHospital: PropTypes.func.isRequired,
  getPatients: PropTypes.func.isRequired,
  patients: PropTypes.object.isRequired,
  //getVaccines: PropTypes.func.isRequired,
  //vaccines: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  patients: state.patientReducer,
  vaccines: state.vaccineReducer,
  hospitalReducer: state.hospitalReducer,
  user: state.auth
});


export default connect(mapStateToProps, { getPatients, getHospitalPatients, getCurrentHospital, getVaccines })(Statistics);