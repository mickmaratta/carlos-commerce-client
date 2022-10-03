import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 10px 15px;
  font-size: 36px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({
    margin: "0 20px",
    display: "flex",
    flexDirection: "column",
    width: "50%",
  })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [cat, setCat] = useState(location.pathname.split("/")[2]);
  //

  const handleFilters = (e) => {
    const value = e.target.value.toLowerCase().split(" ")[0];
    if (value === "any") {
      setFilters(delete filters[e.target.name]);
    } else {
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
    }
  };

  const handleCatChange = (e) => {
    const value = e.target.value.toLowerCase().split(" ")[0];
    if (value === "all") {
      setCat(null);
    } else {
      setCat(value);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat ? cat.toUpperCase() : "ALL PRODUCTS"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter:</FilterText>
          <Select name="categories" onChange={handleCatChange}>
            <Option>All Products</Option>
            <Option>Featured</Option>
            <Option>Women</Option>
            <Option>Men</Option>
            <Option>Shirts</Option>
            <Option>Pants</Option>
            <Option>Jackets</Option>
            <Option>Accessories</Option>
          </Select>
          <Select name="color" onChange={handleFilters}>
            <Option>Any Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option>Any Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
