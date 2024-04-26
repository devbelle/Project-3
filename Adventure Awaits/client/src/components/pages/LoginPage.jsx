import styled from 'styled-components';
import { useState } from 'react';
// import Auth from '../utils/auth';


const Box = styled.div`
display: flex;
justify-content: space-between;
  width: 90%;
  max-width: 430px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  aligh-items: center;
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


    const handleSignUp =  (event) => {
        event.preventDefault();
        // Auth.signup(name, email, password);
    };
const handleLogin = (event) => {    
    event.preventDefault();
    // Auth.login(name, password);
};

return (
  <Container>
    <Box>
      <Section>
      <h2 style={{ color: '#333', textAlign: 'center', fontSize:' 20px' }}>Create a New Account</h2>       
       <Form onSubmit={handleSignUp}>
       <Input
            type="text"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            placeholder="Name"
          />
          <Input
            type="email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            placeholder="Password"
          />
          <Button type="submit">Sign up</Button>
        </Form>
      </Section>
      <Section>
      <h2 style={{ color: '#333', textAlign: 'center' , fontSize: '20px'}}>Already Have an Account? Log In.</h2>       
       <Form onSubmit={handleLogin}>
          <Input
            type="text"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            placeholder="Name"
          />
          <Input
            type="password"
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