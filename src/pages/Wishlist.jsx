import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { removeFavorite } from "../redux/wishlistSlice";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  border-radius: 10px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column", alignItems: "center" })}
`;

const Image = styled.img`
  width: 150px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Button = styled.button`
  width: 30%;
  padding: 10px;
  color: black;
  font-weight: 600;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
`;

const Wishlist = () => {
  const { products, wishlistQuantity } = useSelector((state) => state.wishlist);
  const [wishlistProducts, setWishlistProducts] = useState(products);
  const {quantity} = useSelector(state=>state.cart)
  const dispatch = useDispatch();

  useEffect(() => {
    setWishlistProducts(products);
  }, [products]);

  const handleRemove = (id) => {
    setWishlistProducts(wishlistProducts.filter(product=>product._id !== id));
    dispatch(removeFavorite(id))
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR WISHLIST</Title>
        <Top>
          <Link className="link" to="/products">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <Link className="link" to="/cart">
              <TopText>Shopping Bag({quantity})</TopText>
            </Link>
            <TopText>Your Wishlist({wishlistQuantity})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {wishlistProducts.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                      {product._id}
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice>$ {product.price}</ProductPrice>
                  <Button onClick={()=>handleRemove(product._id)} name={product}>
                    Remove
                  </Button>
                </PriceDetail>
              </Product>
            ))}
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Wishlist;
