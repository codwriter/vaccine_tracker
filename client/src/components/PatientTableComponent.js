import React, { Fragment, useEffect } from 'react';
import {
    Table, Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatients } from '../redux/action/patient';
import TablePagination from './layout/tablePagination';
function RenderTable({ patient, i }) {

    return (
        <tbody>
            <tr>
                <th scope="row">{i + 1}</th>
                <td>{patient.fullname}</td>
                <td>{patient.amka}</td>
                <td>{patient.address}</td>
                <td>{patient.age}</td>
                <td>{patient.city}</td>
                <td>{patient.country}</td>
                <td>{patient.vaccineStatus}</td>
                <td>{patient.vaccineBrand}</td>
                <td>{patient.numberOfDOses}</td>
            </tr>
        </tbody>

    );
}
const PatientTable = ({
    getPatients,
    patients: { patients },
    pagesCount,
    currentPage,
    pageSize,
    handlePageClick,
    handlePreviousClick,
    handleNextClick }) => {
    useEffect(() => {
        getPatients();
    }, [getPatients]);

    const table = patients.map((patient, i) => {
        return (
            <Fragment key={patient.id}>

                {<RenderTable patient={patient} i={i} />}

            </Fragment>
        );
    });
    return (
        <Fragment>
        <Table responsive bordered hover size="sm" >
            <thead>
                <tr>
                    <th>#</th>
                    <th>FullName</th>
                    <th>Amka</th>
                    <th>Address</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Vaccine Status</th>
                    <th>Vaccine Brand</th>
                    <th>Number of Doses</th>
                </tr>
            </thead>
            <tbody {...patients.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map(patient => {
                
            })}></tbody>
            {table}
        </Table>

        <TablePagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
        handlePreviousClick={handlePreviousClick}
        handleNextClick={handleNextClick}
      />
        </Fragment>
    );
}
PatientTable.propTypes = {
    getPatients: PropTypes.func.isRequired,
    patients: PropTypes.object.isRequired,
    pagesCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func.isRequired,
    handlePreviousClick: PropTypes.func.isRequired,
    handleNextClick: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
    patients: state.patientReducer
});

export default connect(mapStateToProps, { getPatients })(
    PatientTable
);