import React, { Fragment, useEffect, useState } from 'react';
import {
    Table, Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col, Pagination, PaginationItem, PaginationLink, CardFooter
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatients } from '../redux/action/patient';

function RenderTableRow({ patient, i }) {

    return (
        <tbody>
            <tr /* onClick={editPatient(patient)} */>
                <th scope="row">{i+1}</th>
                <td>{patient.fullname}</td>
                <td>{patient.amka}</td>
                <td>{patient.age}</td>
                <td>{patient.vaccineStatus === -1 ? "Not Scheduled" : patient.vaccineStatus === 0 ?
                    "Pending" : patient.vaccineStatus === 1 ? "Completed" : "Cancelled"}</td>

                <td>{patient.vaccineBrand}</td>
                <td>{patient.numberOfDOses}</td>
            </tr>
        </tbody>

    );
}

function editPatient(patient) {

}

const PatientTable = ({
    getPatients,
    patients: { patients }
}) => {
    useEffect(() => {
        getPatients();
    }, [getPatients]);

    const [pageSize, setpageSize] = useState(15);
    const [pageCount, setpageCount] = useState(Math.ceil(patients.length / pageSize));
    const [currentPage, setcurrentPage] = useState(0);

    useEffect(() => {
        setpageCount(Math.ceil(patients.length / pageSize));
    }, [patients])


    function handleClick(e, index) {
        e.preventDefault();
        setcurrentPage(index);
    }

    const tableBody = patients.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    ).map((patient, i) => {
        return (
            <Fragment key={patient.id}>

                {<RenderTableRow patient={patient} i={i} />}

            </Fragment>
        );
    });
    return (
        <Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card >
                            <CardHeader>
                                <CardTitle tag="h4">Vacinations</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>FullName</th>
                                            <th>Amka</th>
                                            <th>Age</th>
                                            <th>Vaccine Status</th>
                                            <th>Vaccine Brand</th>
                                            <th>Number of Doses</th>
                                        </tr>
                                    </thead>
                                    {tableBody}
                                </Table>


                            </CardBody>
                            <CardFooter>
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

                                </Pagination></CardFooter>
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