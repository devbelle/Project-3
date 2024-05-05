import HeaderPages from "../components/HeaderPages";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../utils/auth";
import { ADD_TRIP, REMOVE_TRIP } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import EditTripPage from "./EditTripPage";
import { QUERY_ME } from "../utils/queries";
import dayjs from "dayjs";

const TripsBox = styled.div`
  justify-content: space-between;
  width: 90%;
  max-width: 430px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  border: 3px solid black;
  margin-bottom: 250px;
  margin-top: 200px;
`;

const Section = styled.div`
  width: 50%;
  height: 100%;
  background-color: #ffad73;
  border: 1px solid black;
`;
const Form = styled.form`
  display: flex;
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

const Edittrip = styled.div`
  margin-right: 200px;
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
  //posibly needed for a trips list
  const trips = data?.me.trips || [];
  console.log(trips);
  console.log(data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //const updatedName = name === 'name' ? 'title' : title;

    setFormState({ ...formState, [name]: value });
  };

  const handleDeleteTrip = async (tripId) => {

      try {
        await removeTrip({variables: {tripId}});
        refetch();
      } catch (err) {
        console.error(err)
      }


  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formState);
    const startDateString = dayjs(startDate).toISOString();
    const endDateString = dayjs(endDate).toISOString();

    try {
      const { data } = await addTrip({
        variables: {
          ...formState,
          startDate: startDateString,
          endDate: endDateString,
        },
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
        // <Edittrip>
          <ul>
            {trips.map((trip) => {
              const startDate = dayjs(Number(trip.startDate)).format('MMMM DD, YYYY');
              const endDate = dayjs(Number(trip.endDate)).format('MMMM DD, YYYY');
              return (
                <div key={trip._id}>
                  <li>
                    <h3>{trip.title}</h3>
                    <p>Destination: {trip.destination}</p>
                    <p>Start Date: {startDate}</p>
                    <p>End Date: {endDate}</p>
                    <p>Notes: {trip.notes}</p>
                  </li>

                  <Link key={trip._id + "link"} to={`/trip/${trip._id}`}>
                    Edit Trip
                  </Link>
                  <button onClick={() => handleDeleteTrip(trip._id)}>Delete Trip</button>
                </div>
              );
            })}
          </ul>
        // </Edittrip>
      )}
    </>
  );
};

export default TripsPage;
