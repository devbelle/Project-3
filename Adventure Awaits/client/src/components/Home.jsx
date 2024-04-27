
import LoginPage from '../pages/LoginPage';
// import Trips from './pages/Trips';
import Restaurants from '../pages/Restaurants';
import Hotels from '../pages/Hotels';
// import PackingPage from './pages/PackingPage';

import PropTypes from 'prop-types';

function Home({ section }) {
  if (section === 'Login') {
    return <LoginPage />;
  // } else if (section === 'Trips') {
  //   return <Trips />;
  } else if (section === 'Restaurants') {
    return <Restaurants/>;
  } else if (section === 'Hotels') {
return <Hotels/>;
}
// else if (section === 'Packing') {
//   return <PackingPage/>;
// }
}

Home.propTypes = {
  section: PropTypes.string.isRequired,
};


export default Home;









