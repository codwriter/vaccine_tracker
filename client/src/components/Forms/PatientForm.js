import react, {useState} from 'react'
import PropTypes from 'prop-types'

const PatientForm = props => {
    const [formData, setformData] = useState({
        fullname : '',
        amka : '',
        age : 1,
        address : '',
        city : '',
        country : '',
        vaccineStatus : 1,
        vaccineBrand : '',
        numberOfDoses : 0,
    });

    const {
        fullname,
        amka,
        age,
        address,
        city,
        country,
        vaccineStatus,
        vaccineBrand,
        numberOfDoses
    }= formData;

    return (
        <div>
            <h1 class="large text-primary">
                Patient Registartion
            </h1>
            <small>* = required field</small>
            <form class="form">
                <div class="form-group">
                <input type="text" placeholder="Fullname" name="fullname" />
                <small class="form-text"
                    >Patient's name</small
                >
                </div>
                <div class="form-group">
                <input type="text" placeholder="Amka" name="amka" />
                <small class="form-text"
                    >11 digit number</small
                >
                </div>
                <div class="form-group">
                <input type="number" placeholder="Age" name="age" />
                <small class="form-text"
                    >age in years</small
                >
                </div>
                <div class="form-group">
                <input type="text" placeholder="Address" name="address" />
                <small class="form-text"
                    >address of primary living place</small
                >
                </div>
                <div class="form-group">
                <input type="text" placeholder="City" name="city" />
                <small class="form-text"
                    >city of primary living place</small
                >
                </div>
                <div class="form-group">
                <input type="text" placeholder="Country" name="country" />
                <small class="form-text"
                    >country of primary living place</small
                >
                </div>

                <input type="submit" class="btn btn-primary my-1" />
                <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </div>
    )
}

PatientForm.PropTypes = {

} 

export default PatientForm