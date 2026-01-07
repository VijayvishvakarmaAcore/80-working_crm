// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'

// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )





// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './styles/global.css'
// import './styles/components.css'
// import './styles/charts.css'
// import './styles/tables.css'
// import './styles/responsive.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from "./redux/store";  
import { Provider } from "react-redux";
import './index.css'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
)