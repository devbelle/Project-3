import styled from 'styled-components';
import { useState } from 'react';
// import auth from '../utils/auth';

const Box = styled.div`
display: flex;
justify-content: space-between;
  width: 90%;
  max-width: 430px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  alighn-items: center;
  position: absolute;
border: 3px solid black;
margin-bottom: 250px;
`;

const Section = styled.div`
  width: 50%;
  background-color: #FFAD73;
  border: 1px solid black;
`;

const Container = styled.div`
  background-color: #ADD8E6;  
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
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
const ImageBox = styled.div`
width: 100px;
height: 90px;
display: flex;
justify-content: center;
align-items: center;
margin-top: auto; 
margin-bottom: 90px;
`;

const LoginPage = () => {
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


    const handleSignUp = async (event) => {
      event.preventDefault();
      try {
        // const response = await auth.signup(signupName, signupEmail, signupPassword);
        // const { token } = response.data;
        // localStorage.setItem('jwtToken', token);
      } catch (error) {
        // Handle signup errors
            }
    };



const handleLogin = async (event) => {
  event.preventDefault();
  try {
    // const response = await auth.login(loginName, loginPassword);
    // const { token } = response.data;
    // localStorage.setItem('jwtToken', token);
  } catch (error) {
    // Handle login errors
  }
};

return (
  <Container>
    <Box>
      <Section>
      <h2 style={{ color: '#333', textAlign: 'center', fontSize:' 20px' }}>Create a New Account</h2>       
       <Form onSubmit={handleSignUp}>
       <Input
            type="text"
            id="signupName"
            name="signupName"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            placeholder="Name"
          />
          <Input
            type="email"
            id="signupEmail"
            name="signupEmail"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            id="signupPassword"
            name="signupPassword"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            placeholder="Password"
          />
          <Button type="submit">Sign up</Button>
        </Form>
      </Section>
       {/* Login Section */}
      <Section>
      <h2 style={{ color: '#333', textAlign: 'center' , fontSize: '20px'}}>Already Have an Account? Log In.</h2>       
       <Form onSubmit={handleLogin}>
          <Input
            type="text"
            id="loginName"
            name="loginName"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            placeholder="Name"
          />
          <Input
            type="password"
            id="loginPassword"
            name="loginPassword"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Password"
          />
          <Button type="submit">Log in</Button>
        </Form>
      </Section>
    </Box>
    <ImageBox>
      <img src="/images/travel.jpg" alt="travel quote" style={{ width: '200%', height: '250%' }} />
    </ImageBox>
    </Container>
  );
};



export default LoginPage; 