import React from "react";
import styled from "styled-components";
import Product from "./Product";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

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

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const cat = "featured";
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?category=${cat}`
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  return (
    <Container>
      <FeaturedTitle>Newest Arrivals</FeaturedTitle>
      <ProductContainer>
        {products.map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </ProductContainer>
    </Container>
  );
};

export default FeaturedProducts;
