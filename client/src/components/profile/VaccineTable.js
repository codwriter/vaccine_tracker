import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner, Table, Button } from "reactstrap";
import { getVaccines } from '../../redux/action/vaccine';

const VaccineTable = ({
    vaccines: { vaccines, loading },
    setTitle,
    setVaccine,
    toggle,
    getVaccines
}) => {
    useEffect(() => {
        getVaccines();
    }, [getVaccines, loading])

    return (
        <>
            <Table className="table" hover responsive>

                <thead >
                    <tr className="text-center ">
                        <th>Vaccine Brand</th>
                        <th>Available Doses</th>
                        <th>Appointments</th>
                    </tr>

                </thead>

                <tbody>
                    {!loading ? (
                        vaccines ? (vaccines.map(vaccine => {
                            return (
                                <tr className="text-center" key={vaccine._id} onClick={() => { setTitle("Edit Vaccine"); setVaccine(vaccine); toggle(); }}>
                                    <td>{vaccine.vaccineBrand}</td>
                                    <td>{vaccine.doses}</td>
                                    <td>{vaccine.appointments}</td>
                                    <td><Button className=" btn-simple btn-sm  btn-round btn-icon"><i className="far fa-edit"></i></Button></td>
                                </tr>
                            )
                        })) : ("There no vaccines yet please add one")) : <Spinner />}
                </tbody>
            </Table>
        </>
    )
}
VaccineTable.propTypes = {
    getVaccines: PropTypes.func.isRequired,
    vaccines: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    vaccines: state.vaccineReducer
});
export default connect(mapStateToProps, { getVaccines })(VaccineTable);