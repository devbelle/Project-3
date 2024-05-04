import HeaderPages from "../components/HeaderPages";
import styled from "styled-components";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css";
import {Card, ListGroup} from "react-bootstrap";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  width: 100%;
  margin-top: -120px;
  @media (max-width: 768px) {
    width: 70%; // Decrease width on smaller screens
  }
`;

const ParentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  width: 100vw;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 260px;
  border: 2px solid black;
  margin-top: 10px;
  border-radius: 10px;
  background-image: url("images/burger.png");
  background-repeat: no-repeat;
  background-size: cover%;
  filter: brightness(90%);
`;

const Button = styled.button`
  width: 100px;
  display: block;
  border: 2px solid black;
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 5px;
  width: 45%;
  text-align: center;
  transition: all 0.3s ease; // Add transition
  &:hover {
    transform: scale(1.02); // Increase size on hover
  }
  background-color: #add8e6;
  @media (max-width: 768px) {
    width: 50%; // Increase width on smaller screens
    height: 60px; // Increase height on smaller screens
  }

  @media (max-width: 735px) {
    width: 40%; // Increase width on even smaller screens
    height: 40px; // Increase height on even smaller screens
  }
`;
const Input = styled.input`
  padding: 5px;
  margin: 5px;
`;



const RestaurantsPage = () => {
  const [restaurantCitySearch, setRestaurantCitySearch] = useState("");
  const [getRestaurants, { loading, error, data, called }] = useLazyQuery(
    GET_RESTAURANTS,
    {
      variables: { city: restaurantCitySearch },
    }
  );
  console.log(restaurantCitySearch);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await getRestaurants();
  };
  if (loading && called) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const restaurants = data?.getRestaurants || [];

  return (
    <>
      <HeaderPages
        title="Restaurants Page"
        color="#ADD8E6"
        font="Arial"
        fontSize="18"
        marginTop="15px"
        imgSrc="/images/globe.jpg"
      />
      <ParentDiv>
        <Section></Section>
      </ParentDiv>
      <Form onSubmit={handleFormSubmit}>
        <Section className="field">
          <label className="label" htmlFor="city">
            Search for a City
          </label>
          <Input
            type="text"
            className="form-control"
            name="restaurant"
            placeholder="Search for a City..."
            value={restaurantCitySearch}
            onChange={(e) => setRestaurantCitySearch(e.target.value)}
          />
        </Section>
        <Button
          className="button is-medium is-primary is-fullwidth"
          data-testid="button"
          type="submit"
        />
        Search
      </Form>

      {restaurants.length > 0
        ? restaurants.map((restaurant) => (
            <Card key={restaurant.locationId} style={{ width: '18rem' }} >
              <Card.Header as="h4" className="text-center">{restaurant.name}</Card.Header>
              <Card.Body>
              <Card.Img src={restaurant.squareImgUrl} />
                <ListGroup>
                  <ListGroup.Item>Average Rating: {restaurant.averageRating}</ListGroup.Item>
                  <ListGroup.Item>Price: {restaurant.priceTag}</ListGroup.Item>
                  <ListGroup.Item>{restaurant.currentOpenStatusText}</ListGroup.Item>
                  
                </ListGroup>
              </Card.Body>
            </Card>
          ))
        : null}
    </>
  );
};
export default RestaurantsPage;
