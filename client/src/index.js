import React, { Component } from "react";
import { render } from 'react-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import "./index.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";

// Alert Template cofiguration
const options = {
    position: 'bottom center',
    timeout: 3000,
    offset: '40px',
    transition: 'fade',
    type: 'success',
    zIndex: 10000
  }

  class Root extends Component  {
    render () {
      return (
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      )
    }
  }

  render(<Root />, document.getElementById('root'));
// registerServiceWorker();
