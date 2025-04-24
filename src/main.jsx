
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MovieContext } from './context/MovieDetailContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './firebase/config'
createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
