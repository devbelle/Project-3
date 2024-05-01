import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Auth from '../utils/auth';
import HeaderPages from '../components/HeaderPages';


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
    const [formState, setFormState] = useState({message: ""});
    
    const handleInputChange = (event) => {
        const { message, value } = event.target;

        //const updatedName = name === 'name' ? 'title' : title;

        setFormState({ ...formState, [message]: value });

        };

        const handleSubmit = async (e) => {
            e.preventDefault();
    
            console.log(formState)
    
            try {
                const { data } = await addTrip({
                  variables: { ...formState, message },
                });
    
                setFormState({
                    message: '',
                  });
                
                //possible function needed to match Ids with API
    
            } catch (err) {
                console.error(err);
            }

        }






    return (
        <Box>
         <HeaderPages title="My Packing Page" color="#ADD8E6" font="Arial" fontSize="22px" marginTop= '10px' imgSrc="/images/globe.jpg" />
            <Section>
                <h2>What should you bring?</h2>
            </Section>
            <Form id="contact-form" onSubmit={handleSubmit} >
        
                <Section className="field">
                    <label className="label" htmlFor="message">Packing...</label>
                    <textarea className="textarea" name="message" id="text" rows="5" onChange={handleInputChange}   />
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