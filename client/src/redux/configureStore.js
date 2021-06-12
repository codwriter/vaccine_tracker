import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import  alert  from './reducers/alert';
import  auth  from './reducers/auth';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            alert,
            auth,
         }),
    composeWithDevTools(applyMiddleware(thunk))
    );
return store;
}