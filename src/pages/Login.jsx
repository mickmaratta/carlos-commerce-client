import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { login } from '../redux/apiCalls';
import { mobile } from '../responsive';

const Container = styled.div`
`;

const InnerContainer = styled.div`
    width: 100vw;
    height: 93vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
    display: flex;
    background-size: cover;
    align-items: center;
    justify-content: center;  
`;

const Wrapper = styled.div`
    width: 25%;
    padding : 20px;
    background-color: white;
    ${mobile({ width: "75%" })}

`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 200;
`

const Form = styled.form`
    display : flex;
    justify-content: center;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 80%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Button = styled.button`
    border: none;
    width: 60%;
    background-color: teal;
    padding: 15px 20px;
    color: white;
    margin: 20px 0;
    cursor: pointer;
    &:disabled{
      color: green;
      cursor: not-allowed;
    }
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword]  = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isFetching, error, currentUser} = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault()
    login(dispatch, { username, password });
  }

  currentUser && navigate("/", {replace: true});
  
  return (
    <Container>
      <Navbar />
      <InnerContainer>
          <Wrapper>
              <Title>LOG IN</Title>
              <Form>
                  <Input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                  <Input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                  <Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
                  {error && <Error>Something went wrong...</Error> }
                  <Link>Forgot Password?</Link>
                  <Link>Create a New Account</Link>
              </Form>
          </Wrapper>
      </InnerContainer>
    </Container>
  )
}

export default Login