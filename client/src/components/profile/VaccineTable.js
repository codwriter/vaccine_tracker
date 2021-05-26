import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner, Table, Button, Row, Col, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { getVaccines } from '../../redux/action/vaccine';
import VaccineModal from '../Modals/vaccineModal';
import useModal from '../Modals/useModal';

const VaccineTable = ({
    vaccines: { vaccines, loading },
    getVaccines
}) => {
    useEffect(() => {
        getVaccines();
    }, [getVaccines, loading])
    const { isShowing, toggle } = useModal();
    const [vaccine, setVaccine] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    return (
        <>
            {!loading ? (

                <Card className="card">
                    <CardHeader>
                        <Row>
                            <Col className="offset-1">
                                <CardTitle className="text-primary text-center h6">Vaccines</CardTitle>
                            </Col>
                            <Col sm="1" md="1" lg="1">
                                <Button
                                    onClick={() => { setModalTitle("Add Vaccine"); toggle(); setVaccine(null); }}
                                    className=" btn-sm btn-icon btn-primary btn-round pull-right">
                                    <i className="fas fa-plus"></i>
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row className="mt-4">
                            <Col>
                                <VaccineModal isShowing={isShowing} hide={toggle} vaccine={vaccine} title={modalTitle} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {vaccines[0] ? (
                                    <Table className="table" hover responsive>

                                        <thead >
                                            <tr className="text-center ">
                                                <th>Vaccine Brand</th>
                                                <th>Available Doses</th>
                                                <th>Appointments</th>
                                            </tr>

                                        </thead>

                                        <tbody>
                                            {(vaccines.map(vaccine => {
                                                return (
                                                    <tr className="text-center" key={vaccine._id} onClick={() => { setModalTitle("Edit Vaccine"); setVaccine(vaccine); toggle(); }}>
                                                        <td>{vaccine.vaccineBrand}</td>
                                                        <td>{vaccine.doses}</td>
                                                        <td>{vaccine.appointments}</td>
                                                        <td><Button className=" btn-simple btn-sm  btn-round btn-icon"><i className="far fa-edit"></i></Button></td>
                                                    </tr>
                                                )
                                            }))}
                                        </tbody>
                                    </Table>
                                 ) : (<p className=" text-center">There no vaccines yet. Please add one to start!</p>)}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>) : <Spinner />
        }
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