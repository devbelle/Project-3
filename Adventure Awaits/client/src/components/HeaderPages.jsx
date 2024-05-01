import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function HeaderPages({ title, color }) {
    return (
        <header style={{ backgroundColor: color, position: 'fixed', top: 0, width: '100%' }}>
            <h1>{title}</h1>
            <nav>
                <Link to="/trips">Trips</Link>
                <Link to="/hotels">Hotels</Link>
                <Link to="/restaurants">Restaurants</Link>
                <Link to="/packing">Packing</Link>
                <Link to="/editTrip">Edit Trip</Link>
                <Link to="/logout">Logout</Link>
            </nav>
        </header>
    );
}

HeaderPages.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};


export default HeaderPages;