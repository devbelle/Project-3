import HeaderPages from "../components/HeaderPages";
import styled from "styled-components";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_HOTELS } from "../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, Row, CardGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
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
  color: black;
  margin-top: -50px;
  padding-bottom: 2px;
`;

const HotelsPage = () => {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
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
    <ParentDiv>
      <HeaderPages
        title="Hotels Page"
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
              name="hotel"
              placeholder="Search for a City..."
              value={hotelCitySearch}
              onChange={(e) => setHotelCitySearch(e.target.value)}
            />
            <label htmlFor="check-in">Check-In</label>
            <DatePicker
            selectsStart
            selected = {checkIn}
            onChange = {(date) => setCheckIn(date)}
            checkIn = {checkIn}
            />
             <label htmlFor="check-out">Check-Out</label>
            <DatePicker
            selectsStart
            selected = {checkOut}
            onChange = {(date) => setCheckOut(date)}
            checkOut = {checkOut}
            minDate = {checkIn}
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
      {hotels.length > 0
        ? hotels.slice(0, 10).map((hotel) => (
          <CardGroup key={hotel.id}> 
          <Card
            style={{ width: "18rem" }}
            border="dark"
            bg='info-subtle'
          >
            <Card.Header as="h4" className="text-center">
              {hotel.title}
            </Card.Header>
            <Card.Body>
              {/* <Card.Img src={hotel.squareImgUrl} /> */}
              <ListGroup>
                <ListGroup.Item>
                  Price: {hotel.priceForDisplay}
                </ListGroup.Item>
                <ListGroup.Item>
                  Brought to you by: {hotel.provider}
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
export default HotelsPage;