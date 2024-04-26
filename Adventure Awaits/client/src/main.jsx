import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import LoginPage from './components/pages/LoginPage.jsx'

const router = createBrowserRouter([
  { path: '/', 
  element: <App />, 
  children: [
    { index: true, element: <LoginPage /> },
     { path: '', element: <     /> }, 
     { path: '', element: <     /> },
      { path: '', element: <     /> }
    ]
  }
])  

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
  )
  
