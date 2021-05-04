import React, { Fragment, useEffect, useState } from 'react';
import {
    Table,
    Card, CardHeader, CardBody, CardTitle, CardFooter,
    Row, Col,
    Pagination, PaginationItem, PaginationLink,
    Button,
    CardSubtitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatients } from '../redux/action/patient';
import useModal from '../components/Modals/useModal';
import PatientModal from './Modals/PatientModal';


const PatientTable = ({
    getPatients,
    patients: { loading, patients }
}) => {
    const { isShowing, toggle } = useModal();
    const [pageSize, setpageSize] = useState(7);
    const [pageCount, setpageCount] = useState(Math.ceil(patients.length / pageSize));
    const [currentPage, setcurrentPage] = useState(0);
    const [patient, setPatient] = useState(null);
    const [title, setTitle] = useState("");

    useEffect(() => {
        getPatients();
    }, [getPatients, loading]);

    useEffect(() => {
        getPatients();
    }, [getPatients, loading]);



    useEffect(() => {
        setpageCount(Math.ceil(patients.length / pageSize));
    }, [patients])


    function handleClick(e, index) {
        e.preventDefault();
        setcurrentPage(index);
    }


    // Table Body
    const tableBody = patients.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    ).map((patient, i) => {
        return (
            <tbody className=" text-center" key={patient.id}>
                <tr onClick={() => { setTitle("Edit Patient"); setPatient(patient); toggle(); }}>
                    <td>{patient.fullname}</td>
                    <td>{patient.amka}</td>
                    <td className="text-right">{patient.vaccineStatus === -1 ? "Not Scheduled" : patient.vaccineStatus === 0 ?
                        "Pending" : patient.vaccineStatus === 1 ? "Completed" : "Cancelled"}</td>

                    {/*  <td>{patient.vaccineBrand}</td>
                    <td>{patient.numberOfDOses}</td> */}
                </tr>
            </tbody>
        );
    });


    return (
        <Fragment>
            <PatientModal isShowing={isShowing} hide={toggle} patient={patient} title={title} />
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card">
                            <CardHeader className="card-header">
                                <CardTitle tag="h4" className="card-title">Vaccinations</CardTitle>
                                <CardSubtitle className="text-right"><Button onClick={() => { setTitle("Add Vaccination"); toggle(); setPatient(null); }} className=" btn-sm btn-outline-info  btn-round">Add Vaccination</Button></CardSubtitle>
                            </CardHeader>
                            
                            <CardBody className="card-body">
                                {patients ? (
                                    <Table responsive hover className=" table" >
                                        <thead className="text-primary text-center">
                                            <tr>
                                                <th>FullName</th>
                                                <th >Amka</th>
                                                <th className=" text-right">Vaccine Status</th>
                                                {/* <th>Vaccine Brand</th>
                                            <th>Number of Doses</th> */}

                                            </tr>
                                        </thead>
                                        {tableBody}
                                    </Table>
                                ) : <div className="text-center text-big">No Vaccinations yet...Start by adding one</div>
                                }
                            </CardBody>

                            <CardFooter>
                                <div className="pagination-wrapper">
                                    <Pagination>
                                        <PaginationItem disabled={currentPage <= 0}>
                                            <PaginationLink onClick={e =>
                                                handleClick(e, currentPage - 1)} previous href="#" />
                                        </PaginationItem>
                                        {[...Array(pageCount)].map((page, i) =>
                                            <PaginationItem active={i === currentPage} key={i}>
                                                <PaginationLink onClick={e => handleClick(e, i)} href="#">
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}

                                        <PaginationItem disabled={currentPage >= pageCount - 1}>

                                            <PaginationLink
                                                onClick={e => handleClick(e, currentPage + 1)}
                                                next
                                                href="#"
                                            />
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                            </CardFooter>
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