import HeaderPages from "../components/HeaderPages";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../utils/auth";
import { ADD_TRIP } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import EditTripPage from "./EditTripPage";
import { QUERY_ME } from "../utils/queries";

const TripsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  max-width: 300px;
  max-height: 60px; // limit the height
  padding: 20px 2px 2px 2px; // add small padding to the top
  border-radius: 5px;
  margin: 120px auto; // increase top margin
  @media (max-width: 768px) {
    width: 90%;
    margin: 60px auto;
  }
`;

const PageContainer = styled.div`
  display: flex;
  align-items: column;
  flex-tirection: column;
  justify-content: center;
  min-height: 6vh;
  width: 100%;
  padding: 0 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2x; // reduce padding to decrease inner white space
  margin: 2px auto; // reduce margin to decrease outer white space
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  border: 2px solid black;
  background-color: #fff;
  @media (max-width: 768px) {
    padding: 10px; // reduce padding on small screens
    margin: 10px auto; // reduce margin on small screens
  }

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
  width: 80%;
`;

const Heading = styled.h2`
  font-size: 30px;
  color: blue;
  align-items: center;
  whitespace: "nowrap";
  text-align: center;
  @media (max-width: 768px) {
    font-size: 18px; // decrease font size for mobile
    margin-top: 60px; // increase top margin for mobile
  }
`;
const Label = styled.label`
  font-weight: bold;
  color: black;
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const TripItem = styled.li`
  list-style: none;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px auto; // center the item
  width: 90%; // reduce width to prevent cut off
  max-width: 600px; // limit maximum width
  height: auto; // auto adjust height
  overflow: auto; // add scroll if content is too long
  display: flex; // use flexbox
  flex-direction: column; // stack content vertically
  align-items: center; // center content horizontally
  @media (max-width: 768px) {
    padding: 10px; // reduce padding on small screens
  }
`;

const Edittrip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 200px; // add margin to move up from bottom
`;

const EditButton = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  width: 100%; // full width
  max-width: 200px; // limit maximum width
  text-align: center; // center text
`;

const MyTripsHeading = styled.h2`
  text-align: center; // center the text
  font-size: 18px;
  margin-top: 80px; // increase top margin
  margin-bottom: 30px; // increase bottom margin
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 18px;
    margin-top: 50px; // increase top margin for mobile
    margin-bottom: 20px; // increase bottom margin for mobile
  }
`;
const StyledDatePicker = styled(DatePicker)`
  border: 1px solid blue; 
  border-radius: 5px;
  width: 90%;
  margin-left: 10px;
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
  //posibly needed for a trips list
  const trips = data?.me.trips || [];
  console.log(trips);
  console.log(data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //const updatedName = name === 'name' ? 'title' : title;

    setFormState({ ...formState, [name]: value });
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
        startDate: null,
        endDate: null,
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
        </Form>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">Trip Name</Label>
          <Input
            type="text"
            className="form-control"
            name="title"
            placeholder="Trip Name"
            value={formState.title}
            onChange={handleInputChange}
          />
          <Label htmlFor="name">Destination</Label>
          <Input
            type="text"
            className="form-control"
            name="destination"
            placeholder="Destination"
            value={formState.destination}
            onChange={handleInputChange}
          />
          <Label htmlFor="name">Start Date</Label>
          <StyledDatePicker
            selectsStart
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
          />
          <Label htmlFor="name">End Date</Label>
          <StyledDatePicker
            selectsStart
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            endDate={endDate}
            startDate={startDate}
            minDate={startDate}
          />
          <Label htmlFor="name">Notes...</Label>
          <textarea
            className=""
            name="notes"
            placeholder="notes"
            value={formState.notes}
            onChange={handleInputChange}
            style={{ border: "1px solid blue", borderRadius: "5px", width: "80%"}} 
          ></textarea>
          <div>
            <Button type="submit">Add trip</Button>
          </div>
        </Form>
      </TripsBox>

      <MyTripsHeading style={{ textAlign: 'center', marginTop: '80px', marginBottom: '30px' }}>My Trips</MyTripsHeading>      {loading ? (
        <div>Loading...</div>
      ) : (
        <Edittrip>
          <ul>
            {trips.map((trip) => (
              <TripItem key={trip._id}>
                <h3>{trip.title}</h3>
                <p>Destination: {trip.destination}</p>
                <p>Start Date: {trip.startDate}</p>
                <p>End Date: {trip.endDate}</p>
                <p>Notes: {trip.notes}</p>
                <EditButton key={trip._id + "link"} to={`/trip/${trip._id}`}>
                  Edit Trip
                </EditButton>
              </TripItem>
            ))}
          </ul>
        </Edittrip>
      )}
    </PageContainer>
  );
};

export default TripsPage;
