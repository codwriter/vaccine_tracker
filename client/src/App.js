import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LOGOUT } from './redux/action/types';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './routing/Routes';

import { loadUser } from './redux/action/auth';
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
         <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
