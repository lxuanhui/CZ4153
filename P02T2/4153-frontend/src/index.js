import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MetamaskStateProvider } from "use-metamask";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <MetamaskStateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MetamaskStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
