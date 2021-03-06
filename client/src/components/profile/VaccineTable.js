import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner, Table, Button, Row, Col, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { getVaccines } from '../../redux/action/vaccine';
import VaccineModal from '../Modals/vaccineModal';
import useModal from '../Modals/useModal';
import { useHistory } from 'react-router-dom'
import { setAlert } from "../../redux/action/alert";
import Dashboard from "../Dashboard/Dashboard";

const VaccineTable = ({
    vaccines: { vaccines, loading },
    getVaccines,
    intro,
    setAlert,
}) => {
    useEffect(() => {
        getVaccines();
    }, [getVaccines, loading])
    const { isShowing, toggle } = useModal();
    const [vaccine, setVaccine] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const history = useHistory();

    const start = () => {
        if (vaccines[0]) {
            history.push('/dashboard')
        } else
            setAlert("No vaccines...Please add one to start!", 'warning');
    }

    return (
        <>
            {!loading ? (

                <Card className="card">
                    <CardHeader>
                        <Row>
                            <Col className="offset-1">
                                <CardTitle className="text-accent text-center h5">Vaccines</CardTitle>
                            </Col>
                            <Col sm="1" md="1" lg="1">
                                <Button
                                    onClick={() => { setModalTitle("Add Vaccine"); toggle(); setVaccine(null); }}
                                    className=" btn-sm btn-icon  btn-round pull-right btn-info">
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
                                            <tr className="text-center text-accent ">
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
                                                        <td><Button className=" btn-simple btn-sm btn-info  btn-round btn-icon"><i className="far fa-edit"></i></Button></td>
                                                    </tr>
                                                )
                                            }))}
                                        </tbody>
                                    </Table>
                                ) : (<p className=" text-center p-5">There no vaccines yet. Please add one to start!</p>)}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>) : <Spinner />
            }
            {intro ? (<div className="d-flex justify-content-center"><Button className="btn-wd btn-primary" onClick={start}>Let's Start</Button></div>) : ""}
        </>
    )
}
VaccineTable.propTypes = {
    getVaccines: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    vaccines: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    vaccines: state.vaccineReducer
});
export default connect(mapStateToProps, { getVaccines, setAlert })(VaccineTable);