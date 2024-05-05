import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import HeaderPages from "../components/HeaderPages";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ADD_TRIP, REMOVE_TRIP } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import dayjs from "dayjs";
import { createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TripsBox = styled.div`
  justify-content: space-evenly;
  width: 180%;
  max-width: 430px;
  padding: 10px;
  padding-top: 40%;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 50px;
`;
const GlobalStyle = createGlobalStyle`
body {
  background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('/images/road.jpg');
  background-repeat: no-repeat;
  background-size: cover; // This will cover the entire body
}
@media (max-width: 1024px) {
  body {
    background-size: cover; // This will cover the entire body
    background-position: top center;
  }
}
`;
const Section = styled.div`
  width: 50%;
  height: 100%;
  padding: 2%;
  background-color: #ffad73;
  border: 1px solid black;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-left;
`;

const Button = styled.button`
  display: flex;
  width: 21%;
  border: 2px solid black;
  padding: 10px;
  margin-top: 10px;
  margin-left: 56px;
  color: white;
  background-color: blue;
  border-radius: 5px;
`;

const Input = styled.input`
  margin: 10px 0;
  border: 1px solid blue;
  width: 100%; /* Stretch input from left to right */
`;

const Edittrip = styled.div`
  margin-right: 200px;
  margin-left: 5px;
  padding: 2%;
  background-color: white;
  box-shadow: 10px 5px 5px teal;
`;

const TripsPage = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [formState, setFormState] = useState({
    title: "",
    destination: "",
    notes: "",
  });

  const [addTrip] = useMutation(ADD_TRIP);
  const [removeTrip] = useMutation(REMOVE_TRIP);
  const { data, loading, refetch } = useQuery(QUERY_ME);
  const trips = data?.me.trips || [];
  console.log(trips);
  console.log(data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await removeTrip({ variables: { tripId } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const { data } = await addTrip({
        variables: { ...formState, startDate, endDate },
      });

      setFormState({
        title: "",
        destination: "",
        notes: "",
      });
      setStartDate(null);
      setEndDate(null);
      //possible function needed to match Ids with API
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <GlobalStyle/>
      <TripsBox>
        <HeaderPages
          title="My Trips"
          color="#ADD8E6"
          font="Arial"
          fontSize="22px"
          marginTop="10px"
          imgSrc="/images/globe.jpg"
        />
        <Section>
          <h2>Add Trips</h2>
        </Section>
        <Form onSubmit={handleSubmit}>
          <Section>
            <label htmlFor="name">Trip Name</label>
            <Input
              type="text"
              className="form-control"
              name="title"
              placeholder="Trip Name"
              value={formState.title}
              onChange={handleInputChange}
            />
          </Section>
          <Section>
            <label htmlFor="location">Destination</label>
            <Input
              type="text"
              className="form-control"
              name="destination"
              placeholder="Destination"
              value={formState.destination}
              onChange={handleInputChange}
            />
          </Section>
          <Section>
            <label htmlFor="start-date">Start Date</label>
            <DatePicker
              selectsStart
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
            />
          </Section>
          <Section>
            <label htmlFor="start-date">End Date</label>
            <DatePicker
              selectsStart
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              endDate={endDate}
              startDate={startDate}
              minDate={startDate}
            />
          </Section>
          <Section>
            <label className="" htmlFor="message">
              Notes...
            </label>
            <textarea
              className=""
              name="notes"
              placeholder="notes"
              value={formState.notes}
              onChange={handleInputChange}
            ></textarea>
          </Section>
          <div>
            <Button type="submit">Add trip</Button>
          </div>
        </Form>
      </TripsBox>

      <h2>My Trips</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Edittrip>
          <ul>
            {trips.map((trip) => {
              const startDate = dayjs(Number(trip.startDate)).format(
                "MMMM DD, YYYY"
              );
              const endDate = dayjs(Number(trip.endDate)).format(
                "MMMM DD, YYYY"
              );
              return (
                <li key={trip._id}>
                  <h3>{trip.title}</h3>
                  <p>Destination: {trip.destination}</p>
                  <p>Start Date: {startDate}</p>
                  <p>End Date: {endDate}</p>
                  <p>Notes: {trip.notes}</p>

                  <Link key={trip._id + "link"} to={`/trip/${trip._id}`}>
                    Edit Trip
                  </Link>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="trashcan"
                    onClick={() => handleDeleteTrip(trip._id)}
                    style={{ marginRight: "70%" }}
                  />
                </li>
              );
            })}
          </ul>
        </Edittrip>
      )}
    </>
  );
};

export default TripsPage;
