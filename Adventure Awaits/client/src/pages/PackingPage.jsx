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


//from Devin's React Portfolio
const PackingPage = () => {
    const [message, setMessage] = useState('');
    










    return (
        <Box>
            <Section>
                <h2>What should you bring?</h2>
            </Section>
            <Form id="contact-form" onSubmit >
        
                <Section className="field">
                    <label className="label" htmlFor="message">Packing...</label>
                    <textarea className="textarea" name="message" id="text" rows="5"   />
                </Section>
                    {/* error message function*/  (
                <Section>
                    <p className="is-danger"></p>
                </Section>
                )}
                    <Button className="button is-medium is-primary is-fullwidth" data-testid="button" type="submit">Submit</Button>
            </Form>
        </Box>

    )


}

export default PackingPage;