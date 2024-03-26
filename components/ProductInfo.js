"use client";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";

export default function ProductInfo({ product }) {
  return (
    <>
      <Header />
      <Center>
        <Title>{product.title}</Title>
      </Center>
    </>
  );
}
