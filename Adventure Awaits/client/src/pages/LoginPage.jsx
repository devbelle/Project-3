import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/auth";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { LOGIN } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
const PageContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url("/images/nature.jpg");
  background-size: cover;
  background-position: center;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  padding: 20px;
  background-color: lightgray;
  border-radius: 8px;
  align-items: center;
  border: 2px solid black;
  margin: 0 auto;
  margin-top: 60px;
  height: auto;

  @media (min-width: 768px) {
    width: 600px;
    height: 400px;
  }
`;

const Section = styled.div`
  text-align: center;
  padding: 10px;
  width: 40%;
  height: auto;
  margin-top: 5px;
  margin-left: 2px;
  margin-right: 2px;
  justify-content: center;
  background-color: orange;
  border-radius: 8px;
  border: 2px solid black;
`;

const Form = styled.form`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 55%;
`;
const Button = styled.button`
  width: 100px;
  display: block;
  border: 1px solid black;
  padding: 2px;
  margin-top: 2px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
`;
const Input = styled.input`
  padding: 5px;
  margin: 5px;
  width: 100%;
  @media (min-width: 768px) {
    width: 70%; // Take up half the width of the parent container on larger screens
  }
`;
const Header = styled.h1`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  background-image: url("/images/sun.jpg");
  background-size: cover;
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  margin-top: 0;
  margin-bottom: 15px;
`;

function LoginPage() {
  // Define state variables for login and signup form inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const navigate = useNavigate();  //defines where to navigate upon logging in or signup
  const authContext = useContext(AuthService);
  const setIsLoggedIn = authContext ? authContext.setIsLoggedIn : () => {};
  const [addUser, { data, loading, error }] = useMutation(ADD_USER);
  const [login] = useMutation(LOGIN);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { name: signupName, email: signupEmail,  password: signupPassword},
      });
      localStorage.setItem("id_token", data.addUser.token);
      setIsLoggedIn(true);
      navigate("/trips"); // If signup is successful, set isLoggedIn to true and navigate to the trips page
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: loginEmail, password: loginPassword },
      });
      localStorage.setItem("id_token", data.login.token);
      setIsLoggedIn(true);
      navigate("/trips"); // If login is successful, set isLoggedIn to true and navigate to the trips page
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <Header>Adventure Awaits</Header>
        <Box>
          <Section>
            <h2
              style={{
                color: "#333",
                textAlign: "center",
                fontSize: "18px",
                marginTop: "10px",
              }}
            >
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
            <h2
              style={{
                color: "#333",
                textAlign: "center",
                fontSize: "18px",
                marginTop: "10px",
              }}
            >
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
      </PageContainer>
    </>
  );
}

export default LoginPage;
