import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components'
import PropTypes from  'prop-types'

const Link = styled(RouterLink)`
  color: #fff;
  text-decoration: none;
  margin: 0 10px; // Add some space between the links
`;

function Header({ isLoggedIn }) {
    return (
      <header>
        <nav>
          {isLoggedIn ? (
            <>
              <Link to="/">Trips</Link>
              <Link to="/hotels">Hotels</Link>
              <Link to="/restaurants">Restaurants</Link>
              <Link to="/packing">Packing</Link>
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
  };
  
  export default Header;

