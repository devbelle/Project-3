import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import LoginPage from './pages/LoginPage.jsx'
// import Hotels from './components/pages/Hotels.jsx'
// import Restaurants from './components/pages/Restaurants.jsx'
// import Trip from './components/pages/Trip.jsx'
// import PackingPage from './components/pages/PackingPage.jsx'

const router = createBrowserRouter([
  { path: '/', 
  element: <App />, 
  children: [
    { index: true, element: <LoginPage /> },
    //  { path: 'hotels', element: <Hotels/> }, 
    //  { path: 'restaurants', element: <Restaurants/> },
    //  { path: 'trip', element: <Trip/>},
    //  { path: 'packing', element: <PackingPage/>}

    ]
  }
])  

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
  )
  
