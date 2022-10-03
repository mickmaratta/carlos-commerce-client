import SendIcon from '@mui/icons-material/Send';
import React from 'react'
import styled from 'styled-components'
import { Title } from '../resources/styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    height: 50vh;
    background-color: #fcf1ed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
`;

const Info = styled.p`
    font-size: 1.5rem;
    ${mobile({ textAlign: "center" })}
`;

const EmailContainer = styled.div`
    border: 0.5px solid lightgrey;
    display: flex;
    align-items: center;
    padding: 5px;
    background-color: white;
`;

const Input = styled.input`
    width: 25vw;
    border: none;
    ${mobile({ width: "70vw" })}
`;

const Newsletter = () => {
  return (
    <Container>
        <Title>NEWSLETTER</Title>
        <Info>Get timely updates on your favourite products.</Info>
        <EmailContainer>
            <Input placeholder='Your email'/>
            <SendIcon style={{cursor: "pointer"}}/>
        </EmailContainer>
    </Container>
  )
}

export default Newsletter