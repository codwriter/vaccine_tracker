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

    return (
        <div>

        </div>
    )
}

PatientForm.PropTypes = {

} 

export default PatientForm