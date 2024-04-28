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

//Suspect to change once we start plugging in the server side. creating a direct copy of trip page to add trips

const Edit = () => {


    
    
    return (
        <Box>
            <Section>
                <h2>Add Trips</h2>
            </Section>
            <div>Loading...</div>
            <Form>
            <Section>
                <label htmlFor="name">{Trip Name Id}</label>
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
                <label htmlFor="name">{Destination Id}</label>
                <Input
                    type="text"
                    className="form-control"
                    name="location"
                    placeholder="Location"
                    value={/* location Id*/}
                    onChange={/*handle change submit*/}        
                />
                {/* Destination use state*/}   
            </Section>
            <Section>
            <label className="" htmlFor="message">{Notes Id}</label>
                <textarea
                    className=""
                    name=""
                    placeholder=""
                    value={/* State Id*/}
                    onChange={/*handlechange*/}
                ></textarea>
                {/* Note use state*/}   
            </Section>
            <div>
                 <Button
                    className=""
                    data-id={ /*id} */}
                    onClick={/*submit button*/}>Edit trip
                </Button>
            </div>
            </Form>
        </Box>
    )
}