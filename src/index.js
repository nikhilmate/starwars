import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './Store';
import { Provider } from 'react-redux';
import { GET_PEOPLE } from './Actions';
import { isEmpty } from './utils';

const store = Store();

store.dispatch(GET_PEOPLE());

var tempInterval = setInterval(()=>{
  var state = store.getState();
  if (!isEmpty(state.error.getPeopleState)) {
    store.dispatch(GET_PEOPLE()); 
  }
  else {
    clearInterval(tempInterval);
  }
}, 15000);

// store.dispatch(GET_PERSON(1));
// store.dispatch(SET_PERSON(1));

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

const Main = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Main, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
