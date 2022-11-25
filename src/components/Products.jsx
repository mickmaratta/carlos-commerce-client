import React, { useMemo } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { publicRequest } from '../requestMethods';
import { ThreeDots } from "react-loader-spinner";


const Container = styled.div`
  padding: 20px;
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

const Products = ({ cat, filters, sort, colors, setColors }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `/products?category=${cat}`
            : "/products"
        );
        setProducts(res.data);
        setIsLoading(false)
      } catch (err) {console.log(err)}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  useMemo(() => {
    const newColors = products.reduce((results, item) => {
      (results[item.color] = results[item.color] || []).push(item)
      return results
    }, {});
    setColors(Object.keys(newColors))
  }, [products, setColors])

  return (
    <Container>
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
      {filteredProducts.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;