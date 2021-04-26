import React, { Fragment, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getHospitalById } from '../../action/hospital';

const hospital = ({ getHospitalById, hospital: { hospital }, auth, match }) => {
    useEffect(() => {
      getHospitalById(match.params.id);
    }, [getHospitalById, match.params.id]);

    return(
        <Fragment>
            <h1 className="large text-primary">Hospital Info</h1>
            {hospital === null?(
                <Spinner />
            ) :(
                <Fragment>
                    {auth.isAuthenticated &&                ///Για την περιπτωση που θέλω να κάνω edit hospital 
                        auth.loading === false &&
                        auth.user._id === hospital.user._id && (
                        <Link to="/edit-hospital" className="btn btn-dark">
                            Edit hospital
                        </Link>
                        )}  
                </Fragment>
            )}
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
                </form>
    </Fragment>
    )
} 

hospital.propTypes = {
  getHospitalById: PropTypes.func.isRequired,
  hospital: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  hospital: state.hospital,
  auth: state.auth
});

export default connect(mapStateToProps, { getHospitalById })(hospital);