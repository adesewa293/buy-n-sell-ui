"use client";

import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
  
  }
  gap: 20px;
`;

const Title = styled.h2`
font-size: 2rem;
margin: 30px 0 20px;
`;

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>Summer sale 2024</Title>
      <ProductsGrid>
        {products?.length > 0 &&
          products.map(product => (<ProductBox {...product} />))}
      </ProductsGrid>
    </Center>
  );
}
