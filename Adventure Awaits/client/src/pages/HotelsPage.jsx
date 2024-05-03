import HeaderPages from "../components/HeaderPages";
import styled from "styled-components";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_HOTELS } from "../utils/queries";

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

const HotelsPage = () => {
  const [hotelCitySearch, setHotelCitySearch] = useState("");
  const [getHotels, { loading, error, data, called }] = useLazyQuery(
    GET_HOTELS,
    {
      variables: { city: hotelCitySearch, startDate: "2025-06-12", endDate: "2025-06-18" },
    }
  );
  console.log(hotelCitySearch);

  // hotel stuff
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await getHotels();
  };
  if (loading && called) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const hotels = data?.getHotels || [];

  return (
    <>
      <HeaderPages
        title="Hotels Page"
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
            name="hotel"
            placeholder="Search for a City..."
            value={hotelCitySearch}
            onChange={(e) => setHotelCitySearch(e.target.value)}
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

      {hotels.length > 0
        ? hotels.map((hotel) => <div> {hotel.title}</div>)
        : null}
    </>
  );
};
export default HotelsPage;