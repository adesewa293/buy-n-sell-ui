"use client";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import styled from "styled-components";
import WhiteBox from "./WhiteBox";
import ProductImages from "./ProductImages";
import Button from "./Button";
import CartIcon from "@/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;
const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px){
    display: flex;

  }
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
font-size:1.4rem;
`;


export default function ProductInfo({ product }) {
  const {addProduct} = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
              <Price>${product.price}</Price>
              </div>
              <div>
                <Button onClick={() => addProduct(product._id)} $primary >
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}
