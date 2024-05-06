import styled from "styled-components";
import DatePicker from "react-datepicker";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_TRIP } from "../utils/mutations";
import { QUERY_TRIP } from "../utils/queries";
import dayjs from "dayjs";
import { createGlobalStyle } from "styled-components";


const Box = styled.div`
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
  width: 100px;
  display: block;
  border: 1px solid black;
  padding: 5px;
  margin-top: 10px;
  margin-left: 49px;
`;
const Input = styled.input`
  padding: 5px;
  margin: 5px;
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
const EditTripPage = () => {
  const { tripId } = useParams();
  //update back to trip below
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
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
    } else if (!formState.startDate && !formState.endDate) {
      console.error("dates needed");
      return;
    }

    try {
      const { data } = await editTrip({
        variables: {
          tripId: tripId,
          title: formState.title,
          notes: formState.notes,
          destination: formState.destination,
          startDate: dayjs(formState.startDate).toISOString(),

          endDate: dayjs(formState.endDate).toISOString(),
        },
      });
      console.log("Submitting form with state:", formState);

      handleShowModal();

        
    } catch (err) {
      console.log(err);

      window.alert("An error occurred while updating the trip.");
    }
  };

  return (
    <Box>
      <GlobalStyle />
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
          />
        </Section>
        <Section>
          <label htmlFor="start-date">End Date</label>
          <DatePicker
            selectsStart
            selected={formState.endDate}
            onChange={(date) => setFormState({ ...formState, endDate: date })}
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
        <Link to="/trips">Back to Trips</Link>
      </Form>
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Trip Updated</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your trip has been updated successfully!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
          handleCloseModal();
          navigate('/trips');
        }}>
          Go to Trips
        </Button>
      </Modal.Footer>
    </Modal>
    </Box>
  );
};

export default EditTripPage;
