import React, { Fragment, useEffect, useState } from 'react';
import {
    Card, CardHeader, CardBody, CardTitle, CardFooter, CardSubtitle,
    Row, Col,
    Button,
    CustomInput,    
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHospitalPatients, getPatients } from '../../redux/action/patient';
import useModal from '../Modals/useModal';
import PatientModal from '../Modals/PatientModal';
import XTable from './table';

const PatientTable = ({
    hospital,
    getPatients,
    patients: { loading, patients }
}) => {
    const { isShowing, toggle } = useModal();
    const [patient, setPatient] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [tableTitle, settableTitle] = useState(`Vaccinations in ${hospital.name}`)
    const [switchHospital, setSwitchHospital] = useState(false);

    useEffect(() => {
        getPatients();
    }, [getPatients, loading]);

    const allhospitalVaccination = () => {
        if (!switchHospital) {
            settableTitle("All Vaccinations");
            getPatients();
            setSwitchHospital(!switchHospital);
        }
        else {
            settableTitle(`Vaccinations in ${hospital.name}`);
            getHospitalPatients();
            setSwitchHospital(!switchHospital);
        }
    }

    const listHeader = [
        {
            Header:"Fullname",
            className: "t-cell-1 text-center",
            accessor: "fullname",
        },
        {
            Header: "Amka",
            accessor: "amka",
            className: "t-cell-2 text-center",
            
        },
        {
            Header: "City",
            accessor: "city",
            className: "t-cell-3 text-center"
        },
        {
            Header: "Vaccine Status",
            accessor: "vaccineStatus",
            className: "t-cell-4 text-center"
        }
    ];



    return (
        <Fragment>
            <PatientModal isShowing={isShowing} hide={toggle} patient={patient} title={modalTitle} />
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card">
                            <CardHeader className="card-header">
                                <Row>
                                    <Col>
                                        <CardTitle tag="h4" className="card-title">{tableTitle}
                                        </CardTitle>
                                    </Col>
                                    <Col>
                                        <CardSubtitle className="text-right">
                                            <Button
                                                onClick={() => { setModalTitle("Add Vaccination"); toggle(); setPatient(null); }}
                                                className=" btn-sm btn-outline-info  btn-round pull-right">Add Vaccination
                                        </Button>
                                        </CardSubtitle>
                                    </Col>
                                </Row>
                                <span className="float-right ">
                                    <CustomInput
                                        checked={switchHospital}
                                        className="hospital-switch "
                                        type="switch"
                                        name="customSwitch"
                                        id="cudtomHospitalSwitch"
                                        label="All Hospital"
                                        onChange={allhospitalVaccination}
                                    />
                                </span>
                            </CardHeader>


                            <CardBody className="card-body">
                                {patients ?
                                    (<XTable columns={listHeader} loading={loading} data={patients} toggle={toggle} setTitle={setModalTitle} setPatient={setPatient} />)
                                    : <div className="text-center text-big">No Vaccinations yet...Start by adding one</div>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
}
PatientTable.propTypes = {
    getPatients: PropTypes.func.isRequired,
    getHospitalPatients: PropTypes.func.isRequired,
    patients: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    patients: state.patientReducer
});

export default connect(mapStateToProps, { getPatients, getHospitalPatients })(
    PatientTable
);