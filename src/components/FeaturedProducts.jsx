import React from "react";
import styled from "styled-components";
import Product from "./Product";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { publicRequest } from "../requestMethods";
import { TailSpin, ThreeDots } from "react-loader-spinner";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const FeaturedTitle = styled.h1`
  padding-left: 10px;
  font-size: 36px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoadingMessage = styled.span`
  color: darkgray;
  size: 18px;
  margin: 10px;
`;

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const cat = "featured";
      try {
        const res = await publicRequest.get(`/products?category=${cat}`);
        setProducts(res.data);
        setIsLoading(false);
      } catch (err) {}
    };
    getProducts();
  }, []);

  return (
    <Container>
      <FeaturedTitle>Newest Arrivals</FeaturedTitle>
      <ProductContainer>
        {isLoading && (
          <LoadingContainer>
            <LoadingMessage>Loading products...</LoadingMessage>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#008080"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </LoadingContainer>
        )}
        {products.map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </ProductContainer>
    </Container>
  );
};

export default FeaturedProducts;
