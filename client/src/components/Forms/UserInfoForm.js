import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Row, Col,
    Label,
    Button,
    Card, CardHeader, CardBody, CardFooter, CardTitle
} from 'reactstrap';
import { AvForm, AvGroup, AvFeedback, AvInput } from 'availity-reactstrap-validation';
import { editUser, deleteUser } from '../../redux/action/auth';
import { unlinkHospital } from '../../redux/action/hospital';


const initialState = {
    email: '',
    firstname: '',
    lastname: '',
    amkaUser: '',
    birthdate: ''
}
const UserInfoForm = ({
    user: { user },
    editUser,
    unlinkHospital,
    deleteUser
}) => {
    const [formData, setFormData] = useState({ initialState });
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        if (user) {
            const userData = { ...initialState };
            for (const key in user) {
                if (key === 'birthdate') {
                    let tempDate = user[key].split('T');
                    userData[key] = tempDate[0];
                }
                else {
                    userData[key] = user[key]
                }
            };
            setFormData(userData);
        }
    }, []);


    const { email, firstname, lastname, amkaUser, birthdate } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        editUser(formData);
        setEdit(!edit);
    };
    return (
        <>
            <Row>
                <Col>
                    <Card className="card-user">
                        <CardHeader>
                            <Row>
                                <Col>
                                    <CardTitle className="offset-2 h5 text-accent text-center">User Info</CardTitle>
                                </Col>
                                <Col lg="1" md="1" sm="1">
                                    {!edit ?
                                        <Button className="float-right btn btn-round btn-icon btn-sm btn-info" onClick={() => setEdit(!edit)}><i className="fas fa-user-edit"></i></Button>

                                        : ''
                                    }
                                </Col>

                            </Row>
                        </CardHeader>
                        <CardBody >

                            <AvForm className="form" onValidSubmit={onSubmit} disabled={!edit}>

                                <AvGroup inline className="mb-3">
                                    <Label className="text-muted">Email</Label>

                                    <AvInput
                                        type="email"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        required
                                    />

                                    <AvFeedback>Email  is required!</AvFeedback>
                                </AvGroup>

                                <AvGroup inline>
                                    <Label for="firstname">Firstname:</Label>
                                    <AvInput
                                        type="text"
                                        placeholder="Firstname "
                                        name="firstname"
                                        onChange={onChange}
                                        value={firstname}
                                        required
                                    />
                                    <AvFeedback>The firstname name of the patient is required!</AvFeedback>
                                </AvGroup>

                                <AvGroup>
                                    <Label for="lastname">Lastname:</Label>
                                    <AvInput
                                        type="text"
                                        placeholder="Lastname "
                                        name="lastname"
                                        value={lastname}
                                        onChange={onChange}
                                        required
                                    />
                                    <AvFeedback>The lastname name of the patient is required!</AvFeedback>
                                </AvGroup>

                                <AvGroup inline>
                                    <Label for="amkaUser">AMKA:</Label>
                                    <AvInput
                                        type="text"
                                        id="amkaUser"
                                        placeholder="Amka"
                                        name="amkaUser"
                                        onChange={onChange}
                                        minLength="11"
                                        maxLength="11"
                                        pattern="^[0-9]+$"
                                        value={amkaUser}
                                        required
                                    />
                                    <AvFeedback>The AMKA is required and must be 11 numbers in length!</AvFeedback>
                                </AvGroup>

                                <AvGroup inline>
                                    <Label for="birthdate">Birthdate:</Label>
                                    <AvInput
                                        type="date"
                                        id="birthdate"
                                        name="birthdate"
                                        onChange={onChange}
                                        className="custom-date"
                                        value={birthdate}
                                        required
                                    />
                                    <AvFeedback>The Birthdate is required!</AvFeedback>
                                </AvGroup>
                                {!edit ? "" : <div className="d-flex justify-content-center">
                                    <Button type="submit" className="float-right btn btn-wd  btn-sm btn-success">
                                        <i className="fas fa-check-circle mr-1"></i>Done
                                </Button>
                                </div>
                                }
                            </AvForm>
                        </CardBody>
                        <CardFooter>
                            <hr />
                            
                            {!edit ? <div className="button-container justify-content-center">
                                <Button className="btn-sm btn-round btn-primary" onClick={unlinkHospital}>Unlink from hospital</Button>
                            </div>
                                : (<div className="button-container justify-content-center">
                                <Button className="btn btn-danger btn-sm btn-wd btn-round" onClick={deleteUser}>Delete User Account</Button>
                            </div>)
                            }
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </>
    )









}
UserInfoForm.propTypes = {
    editUser: PropTypes.func.isRequired,
    unlinkHospital: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    user: state.auth
});
export default connect(mapStateToProps, { editUser, unlinkHospital, deleteUser })(UserInfoForm);