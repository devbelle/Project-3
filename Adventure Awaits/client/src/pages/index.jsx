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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<App />}>
          <Route path="trips" element={<TripsPage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="restaurants" element={<RestaurantsPage />} />
          <Route path="packing" element={<PackingPage />} />
          <Route path="editTrips" element={<EditTripPage />} /> 
        </Route>
      </Routes>
    </Router>
  </ApolloProvider>
);