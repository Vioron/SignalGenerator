import React from 'react'
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/App/App';
import { store } from './redux/store'
import { Provider } from 'react-redux'



const container = document.getElementById('root');
const root = createRoot(container);
root.render( 
<Provider store={store}>
  <App />
</Provider>
);