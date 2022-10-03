import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { mobile } from '../responsive';

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
`

const Left = styled.div`
    padding: 20px;
    flex: 1;
`

const Logo = styled.h1`
margin-bottom: 20px;
`;

const Desc = styled.p``;
const Socials = styled.div`
    display: flex;
    margin-top: 20px;
`

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props)=>props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
`

const Title = styled.h3`
    margin-bottom: 20px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    padding-bottom: 10px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#f9f5f5" })}
`

const Contact = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
`
const ContactItem = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

const Payment = styled.img``

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>CARLOS.</Logo>
            <Desc>
                There are many variations of passages of Lorem Ipsum available, but
                the majority have suffered alteration in some form, by injected
                humour, or randomised words which don’t look even slightly believable.
            </Desc>
            <Socials>
                <SocialIcon color='3B5999'>
                    <FacebookIcon />
                </SocialIcon>
                <SocialIcon color='E4405F'>
                    <InstagramIcon />
                </SocialIcon>
                <SocialIcon color='55ACEE'>
                    <TwitterIcon />
                </SocialIcon>
            </Socials>
        </Left>
        <Center>
            <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Men Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <Contact>
                <ContactItem>
                    <PlaceIcon />
                    <Desc>622 Carlos Lane, Toronto, ON</Desc>
                </ContactItem>
                <ContactItem>
                    <LocalPhoneIcon />
                    <Desc>+1 888 123 4567</Desc>
                </ContactItem>
                <ContactItem>
                    <EmailIcon />
                    <Desc>carlosstore@carlos.com</Desc>
                </ContactItem>
            </Contact>
            <Payment src={require(`../resources/images/payment.png`)} />
        </Right>
    </Container>
  )
}

export default Footer