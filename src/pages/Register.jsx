import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/apiCalls';

const Container = styled.div`
`;

const InnerContainer = styled.div`
    width: 100vw;
    height: 93vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;  
`;

const Wrapper = styled.div`
    width: 40%;
    padding : 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 200;
    text-align: center;
`

const Form = styled.form`
    display : flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`;

const Error = styled.span`
    color: red;
`
const Button = styled.button`
    border: none;
    width: 40%;
    background-color: teal;
    padding: 15px 20px;
    color: white;
    cursor: pointer;
`;

const Register = () => {
    const [inputs, setInputs] = useState();
    const {error} = useSelector(state=>state.user)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        addUser(inputs, dispatch)
    }

  return (
    <Container>
        <Navbar />
        <InnerContainer>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="Full Name" name="name" onChange={handleChange}/>
                    <Input placeholder="Username" name="username" onChange={handleChange}/>
                    <Input placeholder="Email" name="email" onChange={handleChange}/>
                    <Input placeholder="Password" name="password" onChange={handleChange}/>
                    <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>
                    {error && <Error>Something went wrong...</Error>}
                    <Button onClick={handleClick}>CREATE ACCOUNT</Button>
                </Form>
            </Wrapper>
        </InnerContainer>
    </Container>
  )
}

export default Register