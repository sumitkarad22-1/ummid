import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios';

// Set base URL for production
if (import.meta.env.PROD) {
    axios.defaults.baseURL = 'https://ummid-backend-jtrg.onrender.com';
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
