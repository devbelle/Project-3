import HeaderPages from "../components/HeaderPages";
import styled from "styled-components";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, Row, CardGroup } from "react-bootstrap";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  min-height: 40vh;
  width: 100%;
  @media (max-width: 768px) {
    height: 80vh; // Increase height on smaller screens
    min-height: 90vh; // Increase minimum height on smaller screens
    width: 100%; // Increase width on smaller screens
  }
`;

const ParentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  width: 100vw;
  @media (max-width: 768px) {
    min-height: 60vh; // Increase minimum height on smaller screens
  }
`;

const Form = styled.form`
  margin-top: -80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50%;
  width: 25%;
  border: 2px solid black;
  border-radius: 10px;
  background-image: url("/images/burger.png");
  background-size: cover;
  @media (max-width: 768px) {
    width: 60%; // Increase width on smaller screens
    min-height: 40%; // Increase height on smaller screens
  }
`;
const Button = styled.button`
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
    width: 40%; // Increase width on smaller screens
  }

  @media (max-width: 480px) {
    width: 80%; // Further increase width on very small screens
  }
`;

const Input = styled.input`
  padding: 5px;
  width: 90%;
  margin-top: 2px;
  text-align: center;
  transition: all 0.3s ease; // Add transition
  &:hover {
    transform: scale(1.02); // Increase size on hover
  }
  @media (max-width: 480px) {
    width: 60; // Further increase width on very small screens
  }
`;

const Label = styled.label`
  display: block;
  width: 100%;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 28px;
  color: white;
  margin-top: -50px;
  padding-bottom: 2px;
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
    <ParentDiv>
      <HeaderPages
        title="Restaurants Page"
        color="#ADD8E6"
        font="Arial"
        fontSize="18"
        marginTop="15px"
        imgSrc="/images/globe.jpg"
      />
      <Section>
        <Form id="contact-form" onSubmit={handleFormSubmit}>
          <div className="field">
            <Label className="label" htmlFor="city">
              Search for a City
            </Label>
            <Input
              id="city"
              type="text"
              className="form-control"
              name="restaurant"
              placeholder="Search for a City..."
              value={restaurantCitySearch}
              onChange={(e) => setRestaurantCitySearch(e.target.value)}
            />
          </div>

          <Button
            className="button is-medium is-primary is-fullwidth"
            data-testid="button"
            type="submit"
          >
            Search
          </Button>
        </Form>
      </Section>
      <Section>
        <Row xs={1} md={5} className="g-4">
          {restaurants.length > 0
            ? restaurants.slice(0, 10).map((restaurant) => (
                <CardGroup  key={restaurant.locationId}>
                  <Card
                   
                    style={{ width: "18rem" }}
                    border="dark"
                  >
                    <Card.Header as="h4" className="text-center">
                      {restaurant.name}
                    </Card.Header>
                    <Card.Body>
                      <Card.Img src={restaurant.squareImgUrl} />
                      <ListGroup>
                        <ListGroup.Item>
                          Average Rating: {restaurant.averageRating}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Price: {restaurant.priceTag}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          {restaurant.currentOpenStatusText}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </CardGroup>
              ))
            : null}
        </Row>
      </Section>
    </ParentDiv>
  );
};
export default RestaurantsPage;
