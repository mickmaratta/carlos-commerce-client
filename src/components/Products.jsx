import React, { useMemo } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort, colors, setColors }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `/products?category=${cat}`
            : "/products"
        );
        setProducts(res.data);
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
      {filteredProducts.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;