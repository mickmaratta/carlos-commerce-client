import { FavoriteBorder, Logout, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {mobile} from "../responsive";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';


const Container = styled.div`
    height: 7vh;
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: "10px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgrey;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({ marginLeft: "10px" })}
`;

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-size: 36px;
    font-weight: bold;
    text-decoration: none;
    color: black;
    ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    ${mobile({ justifyContent: "center", flex: "2" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    color: black;
    text-decoration: none;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const StyledLink = styled(Link)`
    text-decoration: none;

    &:visited {
        color: black;
    }
`

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const wishlistQuantity = useSelector(state=>state.wishlist.wishlistQuantity);
  const user = useSelector(state=>state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <MenuItem>{`Hello ${user ? user.name.split(" ")[0] : "guest"}`}</MenuItem>
            </Left>
            <Center>
                <StyledLink to="/">
                    <Logo>CARLOS.</Logo>
                </StyledLink>
            </Center>
            <Right>
                {!user && <StyledLink to="/register">
                    <MenuItem>REGISTER</MenuItem>
                </StyledLink>}
                {!user && <StyledLink to="/login">
                    <MenuItem>SIGN IN</MenuItem>
                </StyledLink>}
                {user && <MenuItem>
                    <Logout onClick={handleLogout}/>
                </MenuItem>}
                <StyledLink to="/wishlist">
                    <MenuItem>
                        <Badge badgeContent={wishlistQuantity} color="error">
                            <FavoriteBorder color="black" />
                        </Badge>
                    </MenuItem>
                </StyledLink>
                <StyledLink to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="secondary">
                            <ShoppingCartOutlined color="black" />
                        </Badge>
                    </MenuItem>
                </StyledLink>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar