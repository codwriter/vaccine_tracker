import React, { Fragment, useEffect, useState } from 'react';
import {
    Table,
    Card, CardHeader, CardBody, CardTitle, CardFooter,
    Row, Col,
    Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatients } from '../redux/action/patient';
import useModal from '../components/Modals/useModal';
import PatientModal from './Modals/PatientModal';


const PatientTable = ({
    getPatients,
    patients: { patients }
}) => {
    useEffect(() => {
        getPatients();
    }, [getPatients]);

    const { isShowing, toggle } = useModal();
    const [pageSize, setpageSize] = useState(7);
    const [pageCount, setpageCount] = useState(Math.ceil(patients.length / pageSize));
    const [currentPage, setcurrentPage] = useState(0);
    const [patient, setPatient] = useState(null);
    
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
            <tbody className=" text-center " key={patient.id}>
                <tr onClick={() => { setPatient(patient); toggle() }}>
                    <td>{patient.fullname}</td>
                    <td>{patient.amka}</td>
                    <td>{patient.vaccineStatus === -1 ? "Not Scheduled" : patient.vaccineStatus === 0 ?
                        "Pending" : patient.vaccineStatus === 1 ? "Completed" : "Cancelled"}</td>

                    <td>{patient.vaccineBrand}</td>
                    <td>{patient.numberOfDOses}</td>
                </tr>
            </tbody>
        );
    });


    return (
        <Fragment>
            <PatientModal isShowing={isShowing} hide={toggle} patient={patient} title="Edit Patient" />
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card >
                            <CardHeader>
                                <CardTitle  tag="h4">Vacinations</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead className="text-primary text-center">
                                        <tr>
                                            <th>FullName</th>
                                            <th>Amka</th>
                                            <th>Vaccine Status</th>
                                            <th>Vaccine Brand</th>
                                            <th>Number of Doses</th>
                                        </tr>
                                    </thead>
                                    {tableBody}
                                </Table>
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
    patients: state.patientReducer
});

export default connect(mapStateToProps, { getPatients })(
    PatientTable
);