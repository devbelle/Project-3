

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import HeaderPages from "../components/HeaderPages";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect,} from 'react';
import Auth from '../utils/auth';
import { ADD_TRIP } from "../utils/mutations";
import EditTripPage from './EditTripPage';
import { QUERY_ME } from '../utils/queries';


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
`

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
margin-right: 200px,
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

  const { data, loading } = useQuery(QUERY_ME);
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

        console.log(formState)

        try {
            const { data } = await addTrip({
              variables: { ...formState, startDate, endDate },
            });

            setFormState({
                title: '',
                destination: '',
                startDate: null,
                endDate: null,
                notes: '',
              });
            setStartDate(null);
            setEndDate(null);
            //possible function needed to match Ids with API

        } catch (err) {
            console.error(err);
        }

    }







    return (
      <>
        <TripsBox>
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
                        selected = {startDate}
                        onChange = {(date) => setStartDate(date)}
                        startDate = {startDate}
                    />
                    </Section>
                    <Section>
                    <label htmlFor="start-date">End Date</label>
                <DatePicker
                        selectsStart
                        selected = {endDate}
                        onChange = {(date) => setEndDate(date)}
                        endDate = {endDate}
                        startDate={startDate}
                        minDate = {startDate}
                />
            </Section>
            <Section>
            <label className="" htmlFor="message">Notes...</label>
                <textarea
                    className=""
                    name="notes"
                    placeholder="notes"
                    value={formState.notes}
                    onChange={handleInputChange}
                ></textarea>
                 
            </Section>
            <div>
               
                 <Button type='submit'>Add trip</Button>
            </div>
            </Form>
        </TripsBox>

        
        <h2>My Trips</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Edittrip>
          <ul>
            {trips.map((trip) => (
            <div key={trip._id}>
              <li>
                <h3>{trip.title}</h3>
                <p>Destination: {trip.destination}</p>
                <p>Start Date: {trip.startDate}</p>
                <p>End Date: {trip.endDate}</p>
                <p>Notes: {trip.notes}</p>
              </li>
              
              <Link
              key={trip._id + 'link'}
              to={`/trip/${trip._id}`}>Edit Trip</Link>
              </div>
            ))}
            
          </ul>
          </Edittrip>
          
          
          
          
        )}
        
      </>
      
    

       


    
)};

export default TripsPage;


