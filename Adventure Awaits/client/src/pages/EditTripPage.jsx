import styled from "styled-components";
import DatePicker from "react-datepicker";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Auth from "../utils/auth";
//import axios from 'axios';
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_TRIP } from "../utils/mutations";
import { QUERY_TRIP } from "../utils/queries";
import HeaderPages from "../components/HeaderPages";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 430px;
  height: 220px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  position: absolute;
  border: 3px solid black;
  margin-bottom: 250px;
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

const EditTripPage = () => {
  const { tripId } = useParams();

  if (!tripId) {
    return <div>Loading...</div>; // or any loading indicator
  }

  console.log("Trip Id", tripId);
  // const [formState, setFormState] = useState({
  //   title: "",
  //   destination: "",
  //   message: "",
  // });

  const { data } = useQuery(QUERY_TRIP, {
    variables: { tripId },
    fetchPolicy: "network-only",
  });
  console.log(tripId);
  const [editTrip, { error }] = useMutation(UPDATE_TRIP);

  //query for data

  const trip = data?.trip || {};
  console.log(trip);
  const [formState, setFormState] = useState({
    title: "",
    destination: "",
    notes: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  console.log(formState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Updated formState:", formState);
    setFormState({
      title: trip.title || "",
      destination: trip.destination || "",
      notes: trip.notes || "",
      startDate: trip.startDate ? new Date(Number(trip.startDate)) : new Date(),
      endDate: trip.endDate ? new Date(Number(trip.endDate)) : new Date(),
    });
  }, [trip.title, trip.destination, trip.notes, trip.startDate, trip.endDate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!formState.title || !formState.destination) {
      // Show an error message or prevent form submission
      console.error("Title and destination are required.");
      return;
    }
    try {
      const { data } = await editTrip({
        variables: {
          tripId: tripId,
          tripName: formState.title,
          notes: formState.notes,
          destination: formState.destination,
          startDate: formState.startDate
            ? formState.startDate.toISOString()
            : null,
          endDate: formState.endDate ? formState.endDate.toISOString() : null,
        },
      });
      setFormState({
        title: data.updateTrip.title,
        destination: data.updateTrip.destination,
        notes: data.updateTrip.notes,
        startDate: data.updateTrip.startDate,
        endDate: data.updateTrip.endDate,
      });
      console.log("Submitting form with state:", formState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <HeaderPages
        title="My Trip Edits"
        color="#ADD8E6"
        font="Arial"
        fontSize="22px"
        marginTop="10px"
        imgSrc="/images/globe.jpg"
      />

      <Section>
        <h2>Edit Trips</h2>
      </Section>
      <Form>
        {/* {trip} */}
        <Section>
          <label htmlFor="name"></label>
          {/* Title use state*/}
          <Input
            type="text"
            className="form-control"
            name="title"
            placeholder="Trip Name"
            value={formState.title}
            defaultValue={trip.title}
            onChange={handleInputChange}
          />
          {/* Destination use state*/}
        </Section>
        <Section>
          <label htmlFor="name"></label>
          <Input
            type="text"
            className="form-control"
            name="destination"
            placeholder="Destination"
            value={formState.destination}
            defaultValue={trip.destination}
            onChange={handleInputChange}
          />
          {/* Destination use state*/}
        </Section>
        <Section>
          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            selectsStart
            selected={formState.startDate}
            onChange={(date) => setFormDate({ ...formState, startDate: date })}
            startDate={formState.startDate}
          />
        </Section>
        <Section>
          <label htmlFor="start-date">End Date</label>
          <DatePicker
            selectsStart
            selected={formState.endDate}
            onChange={(date) => setFormState({ ...formState, endDate: date })}
            endDate={formState.endDate}
            startDate={formState.startDate}
            minDate={formState.startDate}
          />
        </Section>
        <Section>
          <label className="" htmlFor="message"></label>
          <textarea
            className=""
            name="notes"
            placeholder="Notes"
            defaultValue={trip.notes}
            onChange={handleInputChange}
          ></textarea>
          {/* Note use state */}
        </Section>
        <Button
          className=""
          //data-id=
          onClick={handleFormSubmit}
        >
          {" "}
          Update trip
        </Button>
      </Form>
    </Box>
  );
};

export default EditTripPage;
