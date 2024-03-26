"use client"
import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h1`
  font-size: 2.5em;
`;

export default function Products({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}
