import styled from 'styled-components';
import { useState } from 'react';
// import Auth from '../utils/auth';


const Box = styled.div`
display: flex;
justify-content: space-between;
  width: 600px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  width: 50%;
`;

const LoginPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp =  (event) => {
        event.preventDefault();
        // Auth.signup(name, email, password);
    };
const handleLogin = (event) => {    
    event.preventDefault();
    // Auth.login(name, password);
};

return (
    <Box>
      <Section>
        <h2>Create a New Account</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign up</button>
        </form>
      </Section>
      <Section>
        <h2>Already have an account?</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Log in</button>
        </form>
      </Section>
    </Box>
  );
};



export default LoginPage; 