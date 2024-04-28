import DatePicker from "react-datepicker";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Auth from '../utils/auth';


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
`

const Section = styled.div`
width: 50%;
height: 100%;
background-color: #ffad73;
border: 1px solid black;
`
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

const Trip = () => {
    const [title, setTitle] = useState('');
    const [destination, setDestination] = useState('');
    const [notes, setNotes] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    };







    return (
        <Box>
            <Section>
                <h2>Add Trips</h2>
            </Section>
            <div>Loading...</div>
            <Form>
            <Section>
                <label htmlFor="name">Trip Name</label>
                {/* Title use state*/}
                <Input
                    type="text"
                    className="form-control"
                    name="location"
                    placeholder="Location"
                    value={/*location state*/}
                    onChange={/*handle change submit*/}        
                />
                {/* Destination use state*/}   
            </Section>
            <Section>
                <label htmlFor="name">Destination</label>
                <Input
                    type="text"
                    className="form-control"
                    name="location"
                    placeholder="Location"
                    value={/* location state */}
                    onChange={/*handle change submit*/}        
                />
                {/* Destination use state*/}   
            </Section>
            <Section>
                <DatePicker
                        selected = {startDate}
                        onChange = {date => setStartDate(date)}
                        selectsStart
                        startDate = {startDate}
                        endDate = {endDate}
                        ranges = {[selectionRange]}
                    />
                <DatePicker
                        selected = {endDate}
                        onChange = {date => setEndDate(date)}
                        selectsStart
                        endDate = {endDate}
                        minDate = {startDate}
                        ranges = {[selectionRange]}
                />
            </Section>
            <Section>
            <label className="" htmlFor="message">Notes...</label>
                <textarea
                    className=""
                    name=""
                    placeholder=""
                    value={/* State */}
                    onChange={/*handlechange*/}
                ></textarea>
                {/* Note use state*/}   
            </Section>
            <div>
                 <Button
                    className=""
                    onClick={/*submit button*/}>Add trip
                </Button>
            </div>
            </Form>
        </Box>


    )


}
