import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Logger from 'redux-logger'

// import { createStore,applyMiddleware(thunk) } from "redux";
// import { Provider } from 'react-redux';
// import reducer from './reducers';

// const store = createStore(reducer,applyMiddleware(thunk))
// ReactDOM.render( <Provider store={store}><App /> </Provider>, document.getElementById('root'));
ReactDOM.render( < App / > , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();