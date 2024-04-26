import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import LoginPage from './components/pages/LoginPage.jsx'
// import Hotels from './components/pages/Hotels.jsx'
// import Restaurants from './components/pages/Restaurants.jsx'

const router = createBrowserRouter([
  { path: '/', 
  element: <App />, 
  children: [
    { index: true, element: <LoginPage /> },
    //  { path: 'hotels', element: <Hotels/> }, 
    //  { path: 'restaurants', element: <Restaurants/> }
    ]
  }
])  

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
  )
  
