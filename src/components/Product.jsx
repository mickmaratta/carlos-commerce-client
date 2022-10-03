import { ShoppingCartOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../redux/wishlistSlice";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  z-index: 3;
`;

const InfoTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoBottom = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const InfoDesc = styled.span`
  color: white;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  margin-bottom: 5px;
`;
const Container = styled.div`
  flex: 1;
  margin: 20px;
  min-width: 300px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf3f6;
  position: relative;
  border-radius: 10px;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 45%;
  z-index: 2;
  object-fit: contain;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.2s ease;

  cursor: pointer;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector((state) => state.wishlist.products);

  const handleClick = () => {
    if (wishlistProducts.find((product) => product._id === item._id)) {
      return;
    } else {
      dispatch(addFavorite(item));
    }
  };
  
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <InfoTop>
          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchIcon sx={{ color: "black" }} />
            </Link>
          </Icon>
          <Icon>
            <FavoriteBorderIcon sx={{ color: "black" }} onClick={handleClick} />
          </Icon>
        </InfoTop>
        <InfoBottom>
          <InfoDesc>{item.title}</InfoDesc>
          <InfoDesc>${item.price}</InfoDesc>
        </InfoBottom>
      </Info>
    </Container>
  );
};

export default Product;
