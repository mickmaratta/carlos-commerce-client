import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { emptyCart } from "../redux/cartSlice";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div``;

const OrderSummary = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderSummaryTitle = styled.h1`
  margin: 30px;
  font-size: 38px;
`;

const OrderSummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const OrderSummaryInfoItem = styled.span`
  font-size: 24px;
  font-weight: 300;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
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
  padding: 10px;
  margin: 20px;
  font-size: 18px;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dcd7d7;
  }
`;
const Success = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const [orderSent, setOrderSent] = useState(false)

  useEffect(() => {
    const createOrder = async () => {
      try {
        setOrderSent(true);
        //dispatch(emptyCart);
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total.toFixed(2),
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    !orderSent && createOrder();
  }, [cart, data, currentUser, orderSent, dispatch]);

  return (
    <Container>
      <OrderSummary>
        <OrderSummaryTitle>Order Summary:</OrderSummaryTitle>
        <OrderSummaryInfo>
          <OrderSummaryInfoItem>
            <strong>Order #:</strong> {orderId}
          </OrderSummaryInfoItem>
          <OrderSummaryInfoItem>
            <strong>Total:</strong> ${cart.total.toFixed(2)}
          </OrderSummaryInfoItem>
        </OrderSummaryInfo>
        {cart.products.map((product) => (
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
            </PriceDetail>
          </Product>
        ))}
        <OrderSummaryInfoItem>
          Your order is being prepared! Thank you {currentUser ? currentUser.name.split(" ")[0] : ""}!
        </OrderSummaryInfoItem>
        <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
      </OrderSummary>
    </Container>
  );
};

export default Success;
