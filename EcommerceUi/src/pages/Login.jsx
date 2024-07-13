import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1442328166075-47fe7153c128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")
      top;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  border-radius: 10%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #31428e;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 10px;
  &:disabled {
    color: white;
    background: gray;
    cursor: not-allowed;
  }
    :hover {
      background-color: #2c3e50;
    } 
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
`;
const P = styled.p`
  margin: 2px 0px;
  font-size: 12px;
  color: red;
`;

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state?.user);
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder='username'
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder='password'
            onChange={(e) => setUserPassword(e.target.value)}
            type='password'
          />
          <Button
            onClick={handleLogin}
            disabled={isFetching}
          >
            LOGIN
          </Button>
          {error && <P>your Name or Password is incorrect!</P>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
