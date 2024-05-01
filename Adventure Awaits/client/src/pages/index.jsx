import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './config/client';
import ProtectedRoute from './ProtectedRoute';
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
        <ProtectedRoute path="/trips" element={<TripsPage />} />
        <ProtectedRoute path="/hotels" element={<HotelsPage />} />
        <ProtectedRoute path="/restaurants" element={<RestaurantsPage />} />
        <ProtectedRoute path="/packing" element={<PackingPage />} />
        <ProtectedRoute path="/editTrips" element={<EditTripPage />} /> 
      </Routes>
    </Router>
  </ApolloProvider>
);