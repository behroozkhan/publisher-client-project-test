import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import MainRouter from "./Publisher/MainRouter";
import config from './Config/config.json';
import { SnackbarProvider } from 'notistack';
import WeblancerContextProvider from './Publisher/Pages/Contexts/WeblancerContext';

const MainApp = withRouter(props =>
    <SnackbarProvider maxSnack={3}>
      <WeblancerContextProvider>
        <MainRouter {...props}/>
      </WeblancerContextProvider>
    </SnackbarProvider>
);

ReactDOM.render(
  <React.StrictMode>
    <Router basename={config.BaseName}>
        <MainApp/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
