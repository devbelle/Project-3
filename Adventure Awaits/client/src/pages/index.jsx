import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './config/client';
import App from './App';
import LoginPage from './LoginPage';
import TripsPage from './TripsPage';
import HotelsPage from './HotelsPage';
import RestaurantsPage from './RestaurantsPage';
import PackingPage from './PackingPage';
import EditTripPage from './EditTripPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/app" element={<TripsPage />} />
        <Route path="/app/hotels" element={<HotelsPage />} />
        <Route path="/app/restaurants" element={<RestaurantsPage />} />
        <Route path="/app/packing" element={<PackingPage />} />
        <Route path="/app/editTrips" element={<EditTripPage />} /> 
      </Routes>
    </Router>
  </ApolloProvider>
);