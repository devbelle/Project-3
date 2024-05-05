

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ADD_TRIP } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import HeaderPages from "../components/HeaderPages";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const TripsBox = styled.div`
  width: 90%;
  max-width: 800px;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid black;
  background-color: #fff;
  margin: 90px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 100px;
  display: block;
  border: 2px solid black;
  padding: 5px;
  margin: 8px auto 10px;
  color: white;
  background-color: blue;
  border-radius: 5px;
`;

const Input = styled.input`
  margin: 10px 0;
  border: 1px solid blue;
  width: 100%; /* Stretch input from left to right */
`;

const Heading = styled.h2`
  font-size: 24px;
  color: blue;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  color: black;
  font-size: 16px;
  margin-top: 10px;
`;

const TripList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const TripItem = styled.li`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px 0;
`;

const Edittrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
border: 2px solid black;
  border-radius: 5px;

`;

const EditButton = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  text-align: center;
`;

const MyTripsHeading = styled.h2`
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid blue;
  border-radius: 5px;
  width: 100%;
  margin: 10px 0;
`;

const TripsPage = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [formState, setFormState] = useState({
    title: "",
    destination: "",
    notes: "",
    startDate: null,
    endDate: null,
  });

  const [addTrip] = useMutation(ADD_TRIP);

  const { data, loading } = useQuery(QUERY_ME);
  const trips = data?.me.trips || [];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTrip({
        variables: { ...formState, startDate, endDate },
      });

      setFormState({
        title: "",
        destination: "",
        startDate: null,
        endDate: null,
        notes: "",
      });
      setStartDate(null);
      setEndDate(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <PageContainer>
        <HeaderPages
          title="Let's Travel"
          color="#ADD8E6"
          font="Arial"
          fontSize="24px"
          marginTop="15px"
          imgSrc="/images/globe.jpg"
        />

      <TripsBox>
        <Form>
          <Heading>Add Trips</Heading>
          <Label htmlFor="title">Trip Name</Label>
          <Input
            type="text"
            className="form-control"
            name="title"
            placeholder="Trip Name"
            value={formState.title}
            onChange={handleInputChange}
          />
          <Label htmlFor="destination">Destination</Label>
          <Input
            type="text"
            className="form-control"
            name="destination"
            placeholder="Destination"
            value={formState.destination}
            onChange={handleInputChange}
          />
          <Label htmlFor="startDate">Start Date</Label>
          <StyledDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            name="startDate"
          />
          <Label htmlFor="endDate">End Date</Label>
          <StyledDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            endDate={endDate}
            startDate={startDate}
            minDate={startDate}
            name="endDate"
          />
          <Label htmlFor="notes">Notes</Label>
          <Input
            type="text"
            className="form-control"
            name="notes"
            placeholder="Notes"
            value={formState.notes}
            onChange={handleInputChange}
          />
          <Button type="submit" onClick={handleSubmit}>
            Add trip
          </Button>
        </Form>
      </TripsBox>

      <MyTripsHeading>My Trips</MyTripsHeading>
      <Edittrip>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <TripList>
            {trips.map((trip) => (
              <TripItem key={trip._id}>
                <h3>{trip.title}</h3>
                <p>
                  <strong>Destination:</strong> {trip.destination}
                </p>
                <p>
                  <strong>Start Date:</strong> {trip.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {trip.endDate}
                </p>
                <p>
                  <strong>Notes:</strong> {trip.notes}
                </p>
                <EditButton to={`/trip/${trip._id}`}>Edit Trip</EditButton>
              </TripItem>
            ))}
          </TripList>
        )}
      </Edittrip>
    </PageContainer>
  );
};

export default TripsPage;


