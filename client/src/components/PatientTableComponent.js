import React, { Fragment, useEffect, useState } from 'react';
import {
    Card, CardHeader, CardBody, CardTitle, CardFooter,
    Row, Col,
    Button,
    CardSubtitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatients } from '../redux/action/patient';
import useModal from '../components/Modals/useModal';
import PatientModal from './Modals/PatientModal';
import XTable from './table';


const PatientTable = ({
    getPatients,
    patients: { loading, patients }
}) => {
    const { isShowing, toggle } = useModal();
    const [patient, setPatient] = useState(null);
    const [title, setTitle] = useState("");

    useEffect(() => {
        getPatients();
    }, [getPatients, loading]);


    const listHeader = [
        {
            Header: "Fullname",
            className: "t-cell-1 text-left",
            accessor: "fullname",
        },
        {
            Header: "Amka",
            accessor: "amka",
            className: "t-cell-2 text-left"
        },
        {
            Header: "City",
            accessor: "city",
            className: "t-cell-3 text-left"
        },
        {
            Header: "Vaccine Status",
            accessor: "vaccineStatus",
            className: "t-cell-4 text-left"
        }
    ];



    return (
        <Fragment>
            <PatientModal isShowing={isShowing} hide={toggle} patient={patient} title={title} />
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card">
                            <CardHeader className="card-header">
                                <CardTitle tag="h4" className="card-title text-c">Vaccinations</CardTitle>
                                <CardSubtitle className="text-right">
                                    <Button
                                        onClick={() => { setTitle("Add Vaccination"); toggle(); setPatient(null); }}
                                        className=" btn-sm btn-outline-info  btn-round">Add Vaccination
                                        </Button>
                                </CardSubtitle>
                            </CardHeader>

                            <CardBody className="card-body">
                                {patients ?
                                    (<XTable columns={listHeader} loading={loading} data={patients} toggle={toggle} setTitle={setTitle} setPatient={ setPatient}/>)
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
    patients: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    getPatients: state.patientReducer,
    patients: state.patientReducer
});

export default connect(mapStateToProps, { getPatients })(
    PatientTable
);