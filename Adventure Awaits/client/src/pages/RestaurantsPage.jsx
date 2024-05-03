import HeaderPages from "../components/HeaderPages";
import styled from "styled-components";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../utils/queries";

const Section = styled.div`
  width: 50%;
  height: 100%;
  background-color: #ffad73;
  border: 1px solid black;
`;
const Form = styled.form`
    display: flex
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;
const Button = styled.button`
  width: 100px;
  display: block;
  border: 1px solid black;
  padding: 5px;
  margin-top: 10px;
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

  // restaurant stuff
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
      <Section>
        
      </Section>
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
        >
          Search
        </Button>
      </Form>

      {restaurants.length > 0
        ? restaurants.map((restaurant) => <div> {restaurant.name}</div>)
        : null}
    </>
  );
};
export default RestaurantsPage;
