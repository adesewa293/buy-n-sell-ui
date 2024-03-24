"use client"


import Center from "@/components/Center";
import Header from "@/components/Header"
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components"


const Title = styled.h1`
font-size: 2.5em;
`;

async function getAllProducts(){
  await mongooseConnect();
  const allProducts = await Product.find({}, null, {sort:{'_id':-1}});
  return JSON.parse(JSON.stringify(allProducts));
}

export default async function ProductsPage() {
  const allProducts = await getAllProducts();
  return (
  <>
  <Header />
  <Center>
  <Title>All Products</Title>
{allProducts.length}
  </Center>
  </>

  )
}



// export async function getServerSideProps(){
//   await mongooseConnect();
//   const products = await Product.find({}, null, {sort:{'_id':-1}});
//   return {
//     props:{
//       products: JSON.parse(JSON.stringify(products)),
//     }
//   }
// }
