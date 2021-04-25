import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentHospital } from '../redux/action/hospital';

const Dashboard = ({
    getCurrentHospital,
    auth: { user },
    hospital:{ hospital }
}) => {
    useEffect(() => {
        getCurrentHospital();
    }, [getCurrentHospital]);

    return (
         <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {user && user.email}
            </p>
            {hospital !== null ? (
                <Fragment>Let's do some work today!</Fragment>
            ) : (
                <Fragment>
                    <p>You are not linked to a hospital yet, please add some info</p>
                    <Link to="/create-hostpital-profile" className="btn btn-primary my-1">
                        Create Profile
          </Link>
                </Fragment>
            )
            }
        </Fragment >
    );
};

Dashboard.propTypes = {
    getCurrentHospital: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    hospital: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    hospital: state.hospitalReducer
});

export default connect(mapStateToProps, { getCurrentHospital })(
    Dashboard
);
