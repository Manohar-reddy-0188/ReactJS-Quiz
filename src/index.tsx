import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import './index.scss';
import rootReducer from './redux/reducers/rootReducer';
import { authWatcher } from './redux/sagas/authSagas';
import { createQuizWatcher } from './redux/sagas/createQuizSagas';
import { quizWatcher } from './redux/sagas/quizSagas';
import * as serviceWorker from './serviceWorker';


const saga = createSagaMiddleware();
const store = createStore( rootReducer, composeWithDevTools( applyMiddleware( saga ) ) );

saga.run( quizWatcher );
saga.run( createQuizWatcher );
saga.run( authWatcher );


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById( 'root' ),
);

serviceWorker.unregister();
