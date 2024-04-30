import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const Link = styled(RouterLink)`
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
`;

function Header({ isLoggedIn, title, color }) {
  return (
    <header style={{ backgroundColor: color }}>
      <h1>{title}</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/TripsPage">Trips</Link>
            <Link to="/HotelsPage">Hotels</Link>
            <Link to="/RestaurantsPage">Restaurants</Link>
            <Link to="/PackingPage">Packing</Link>
            <Link to="/EditTripPage">Edit Trip</Link>
          </>
        ) : (
          <Link to="/LoginPage">Login</Link>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Header;
