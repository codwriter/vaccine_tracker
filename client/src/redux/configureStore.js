import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
//import { } from './forms';
import  alert  from './reducers/alert';
import  auth  from './reducers/auth';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            alert,
            auth,
           // ...createForms({
       // })
         }),
    composeWithDevTools(applyMiddleware(thunk))
    );
return store;
}