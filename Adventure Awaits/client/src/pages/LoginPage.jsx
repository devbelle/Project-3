import { useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 80px;
`;
  const Box = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 100%;
  max-width: 430px;
  background-color: white;
  border-radius: 10px;
  border: 3px solid black;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 50px;
`;

const Section = styled.div`
height: 80%;
  width: 80%;
  display: flex;
text-align: center;
  justify-content: center;
  background-color: #ffad73;
  border: 2px solid black;
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
height: 25%;
width: 25%;
margin: auto;
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: center;
`;
const Header = styled.h1`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  background-color: lightblue;
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  margin: 0;
`;

const LoginPage = () => {
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
        }),
      });
      const data = await response.json();
      localStorage.setItem("jwtToken", data.token);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = await response.json();
      localStorage.setItem("jwtToken", data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <PageContainer>
      <Header>Adventure Awaits</Header>
      <Box>
        <Section>
          <h2 style={{ color: "#333", textAlign: "center", fontSize: "18px" }}>
            Create a New Account
          </h2>
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
        <Section>
          <h2 style={{ color: "#333", textAlign: "center", fontSize: "20px"}}>
            Already Have an Account? Log In.
          </h2>
          <Form onSubmit={handleLogin}>
            <Input
              type="email"
              id="loginEmail"
              name="loginEmail"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email"
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
        <img
          src="/images/travel.jpg"
          alt="travel quote"
          style={{ width: "400%", height: "200%" }}
        />
      </ImageBox>
    </PageContainer>
  );
};

export default LoginPage;
