import HeaderPages from '../components/HeaderPages';
import styled from "styled-components";
import {useState} from 'react';
import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../utils/queries";

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
  background-image: url('images/burger.png');
  background-repeat: no-repeat;
  background-size: cover%;
  filter: brightness(90%); 
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
  background-color: #ADD8E6;
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
  width: 100%; 
  margin-top: 2px;
  text-align: center;
  transition: all 0.3s ease; // Add transition
  &:hover {
    transform: scale(1.02); // Increase size on hover
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
    const [restaurantCitySearch, setRestaurantCitySearch] = useState('');
    const { loading, error, data } = useQuery(GET_RESTAURANTS);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (error) {
      console.error(error);
      return;
    }
    console.log(data.getRestaurants);
  };

  return (
    <>
      <HeaderPages
        title="Restaurants Page"
        color="#ADD8E6"
        font="Arial"
        fontSize='18'
        marginTop="15px"
        imgSrc="/images/globe.jpg"
      />
      <ParentDiv>
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
              onChange={e => setRestaurantCitySearch(e.target.value)}
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
      </ParentDiv>
    </>
  );
};

export default RestaurantsPage;