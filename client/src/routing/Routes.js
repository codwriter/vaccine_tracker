import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap'
import NotFound from '../components/layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Dashboard from '../components/Dashboard/Dashboard';
import Hospital from '../components/profile/Hospital';
import Navbar from '../components/layout/Navbar';
import Intro from '../components/Views/Intro';
import Statistics from '../components/Views/Statistics';
import VaccineTable from '../components/profile/VaccineTable';

const Routes = props => {
    return (
        <>
            <Navbar />
            <Container>
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/intro" component={Intro} />
                    <PrivateRoute exact path="/profile" component={Hospital} />
                    <PrivateRoute exact path="/statistics" component={Statistics} />
                    <PrivateRoute exact path="/vaccines" component={() => {return <VaccineTable intro={true} /> }} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </>
    );
};

export default Routes;
