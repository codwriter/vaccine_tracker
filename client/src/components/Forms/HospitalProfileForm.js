import React, { Fragment, useEffect ,useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
//import { getHospitalById } from '../../action/hospital';
import { createHospital } from '../../redux/action/hospital';
import { setAlert } from '../../redux/action/alert';

const Hospitalregister = ({ setAlert, createHospital , isAuthenticated  }) => {
    const [formData, setFormData] = useState({
      HospitalName: '',
      HospitalAddress: '',
      AFM: '',
      NumberofDoses: ''
    });


const { HospitalName, HospitalAddress, AFM, NumberofDoses } = formData;

const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  
  const onSubmit = async (e) => {   
      e.preventDefault();
<<<<<<< HEAD
=======
      Hospitalregister({ HospitalName, HospitalAddress, AFM, NumberofDoses });
>>>>>>> 949b8c58b1bf42c0d1f8ffc5fb48b56953d2b299
      createHospital(formData);
  };


/*const Hospital = ({ createHospital, hospital: { hospital }, auth, match }) => {
    useEffect(() => {
      createHospital(match.params.id);
    }, [createHospital, match.params.id]);*/

    return(
        <Fragment>
            <h1 className="large text-primary">Hospital Info</h1>
            {Hospitalregister === null?(
                <Spinner />
            ):
            /*:(
                <Fragment>
                    {auth.isAuthenticated &&                ///Για την περιπτωση που θέλω να κάνω edit hospital 
                        auth.loading === false &&
                        auth.user._id === hospital.user._id && (
                        <Link to="/edit-hospital" className="btn btn-dark">
                            Edit hospital
                        </Link>
                        )}  
                </Fragment>
              )*/ 
            <form className="form" onSubmit={onSubmit}>
              
                 <div className="form-group">
                 <input
                     type="Hospital Name"
                     placeholder="Hospital Name"
                     name="Hospital Name"
                     value={HospitalName}
                     onChange={onChange}
                     required
                    />
                 </div>

                 <div className="form-group">
                 <input
                     type="Hospital Address"
                     placeholder="Hospital Address"
                     name="Hospital Address"
                     value={HospitalAddress}
                     onChange={onChange}
                     required
                    />
                 </div>

                  <div className="form-group">
                    <input
                     type="Tax Identification Number(AFM)"
                      placeholder="Tax Identification Number(AFM)"
                      name="Tax Identification Number(AFM)"
                      value={AFM}
                      onChange={onChange}
                      minLength="9"
                      maxLength="9"
                    />
                  </div>

                  <div className="form-group">
                    <input
                     type="NumberofDoses"
                      placeholder="NumberofDoses"
                      name="NumberofDoses"
                      value={NumberofDoses}
                      onChange={onChange}
                      minLength="0"
                    />
                  </div>

                  <input type="submit" className="btn btn-primary" value="Hospital register" />

                </form>
            }
          </Fragment>
                        
    );
};

Hospitalregister.propTypes = {
  createHospital: PropTypes.func.isRequired,
  setAlert: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  createHospital: state.hospitalReducer,
  isAuthenticated: state.auth
});

export default connect(mapStateToProps, { setAlert, createHospital })(Hospitalregister);