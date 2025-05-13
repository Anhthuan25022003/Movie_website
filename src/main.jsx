
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './firebase/config'
import Modal from 'react-modal';

// Xác định phần tử gốc của app (ví dụ: id="root")
Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
