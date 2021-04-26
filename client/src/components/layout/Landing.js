import React from 'react';
import { Link } from 'react-router-dom';
import VaccineLogo from '../../assets/images/Vaccine-Tracker_logo.png'

const Landing = () => {
    return (
        <>

    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'><img src={VaccineLogo} className='landing-logo' /></h1>
          <div className="buttons">
            <Link to='/register' className='btn btn-primary' >Sign Up</Link>
            <Link to='/login' className='btn btn-light' >Login</Link>
          </div>
        </div>
      </div>
    </section>
    </>
    );
}

export default Landing;