import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from './store/Provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <div className="sm:bg-gray-100 h-[100vh]">
        <App />
      </div>
    </Provider>
  </React.StrictMode>
);
