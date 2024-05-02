
import LoginPage from '../pages/LoginPage';
import TripsPage from './pages/Trips';
// import RestaurantsPage from '../pages/RestaurantsPage';
import HotelsPage from '../pages/HotelsPage';
import PackingPage from './pages/PackingPage';
import EditTripPage from './pages/EditTripPage';

import PropTypes from 'prop-types';

function Home({ section }) {
  if (section === 'Login') {
    return <LoginPage />;
  } else if (section === 'Trips') {
    return <TripsPage />;
  // } else if (section === 'Restaurants') {
  //   return <RestaurantsPage/>;
  } else if (section === 'Hotels') {
    return <HotelsPage/>;
  } else if (section === 'Packing') {
    return <PackingPage/>;
  } else if (section === 'EditTrip') {
    return <EditTripPage/>;
  }
}


Home.propTypes = {
  section: PropTypes.string.isRequired,
};


export default Home;









