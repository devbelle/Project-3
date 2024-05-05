import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function HeaderPages({ title, color, font, fontSize, imgSrc }) {
  const navigate = useNavigate();
  function handleLogout() {
    //clear user data from local storage
    localStorage.clear();
    //redirect to login page
    navigate("/");
  }
  return (
    <header
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: "cover",
        fontFamily: font,
        fontSize: fontSize,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        boxSizing: "border-box",
        paddingTop: "15px",
        border: "2px solid #000",
        borderRadius: "5px",
        height: "20%",
      }}
    >
      <h1 style={{ marginTop: "20px" }}>{title}</h1>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <Link
          style={{
            padding: "0 6px",
            fontWeight: "bold",
            fontSize: "1em",
            color: "#FFF8F0",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
          to="/trips"
        >
          Trips
        </Link>
        <span>|</span>
        <Link
          style={{
            padding: "0 6px",
            fontWeight: "bold",
            fontSize: "1em",
            color: "#FFF8F0",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
          to="/hotels"
        >
          Hotels
        </Link>
        <span>|</span>

        <Link
          style={{
            padding: "0 6px",
            fontWeight: "bold",
            fontSize: "1em",
            color: "#FFF8F0",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
          to="/restaurants"
        >
          Restaurants
        </Link>
        <span>|</span>

        <Link
          style={{
            padding: "0 6px",
            fontWeight: "bold",
            fontSize: "1em",
            color: "#FFF8F0",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
          to="/packing"
        >
          Packing List
        </Link>
        <span>|</span>

        <Link
            style={{
                padding: "0 6px",
                fontWeight: "bold",
                fontSize: "1em",
                color: "#FFF8F0",
                textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
            }}
            to="/"
            onClick={handleLogout}
        >
            Logout
        </Link>
      </nav>
    </header>
  );
}

HeaderPages.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default HeaderPages;
