import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { createStore , applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import ReduxPromise from 'redux-promise';

const storeMiddleware=applyMiddleware(ReduxPromise)(createStore);
ReactDOM.render(<BrowserRouter><Provider store={storeMiddleware(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}><App /></Provider></BrowserRouter>, document.getElementById('root'));

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
