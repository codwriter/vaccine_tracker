import react, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addPatient } from '../../redux/action/patient';
import {setAlert} from '../../redux/action/alert';

const PatientForm = ({addPatient, setAlert, isAuthorized}) => {
    const [formData, setformData] = useState({
        fullname : '',
        amka : '',
        age : 1,
        address : '',
        city : '',
        country : '',
        /* vaccineStatus : 1,
        vaccineBrand : '',
        numberOfDoses : 0, */
    });

    const {
        fullname,
        amka,
        age,
        address,
        city,
        country,
        /* vaccineStatus,
        vaccineBrand,
        numberOfDoses */
    }= formData;
    

    const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {   
        e.preventDefault();
        console.log(formData);
        /* PatientForm({ 
            fullname,
            amka,
            age,
            address,
            city,
            country,
            vaccineStatus,
            vaccineBrand,
            numberOfDoses }); */
        addPatient(formData);
    };

    return (
        <div>
            <h1 class="large text-primary">
                Patient Registartion
            </h1>
            <small>* = required field</small>
            <form class="form" onSubmit={onSubmit}>
                <div class="form-group">
                <input type="text" placeholder="Fullname" name="fullname" onChange={onChange}/>
                <small class="form-text"
                    >Patient's name</small
                >
                </div>
                <div class="form-group">
                <input type="text" placeholder="Amka" name="amka" onChange={onChange}/>
                <small class="form-text"
                    >11 digit number</small
                >
                </div>
                <div class="form-group">
                <input type="number" placeholder="Age" name="age" onChange={onChange}/>
                <small class="form-text"
                    >age in years</small
                >
                </div>
                <div class="form-group">
                <input type="text" placeholder="Address" name="address" onChange={onChange}/>
                <small class="form-text"
                    >address of primary living place</small
                >
                </div>
                <div class="form-group">
                <input type="text" placeholder="City" name="city" onChange={onChange}/>
                <small class="form-text"
                    >city of primary living place</small
                >
                </div>
                <div class="form-group">
                <input type="text" placeholder="Country" name="country" onChange={onChange}/>
                <small class="form-text"
                    >country of primary living place</small
                >
                </div>

                <input type="submit" class="btn btn-primary my-1" />
            </form>
        </div>
    )
}

PatientForm.propTypes = {
  addPatient: PropTypes.func.isRequired,
  setAlert: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  addPatient: state.patientReducer,
  isAuthenticated: state.auth
});

export default connect(mapStateToProps, { setAlert, addPatient })(PatientForm);