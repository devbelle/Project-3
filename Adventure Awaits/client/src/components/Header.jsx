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
            <Link to="/trips">Trips</Link>
            <Link to="/hotels">Hotels</Link>
            {/* <Link to="/restaurants">Restaurants</Link> */}
            <Link to="/packing">Packing</Link>
            <Link to="/editTrip">Edit Trip</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
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
