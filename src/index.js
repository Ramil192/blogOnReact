import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.scss';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/App/App';
import rootReducer from './Redux/Reduser/rootReducer';

const store = createStore(
  rootReducer,
  //  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
   compose(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
