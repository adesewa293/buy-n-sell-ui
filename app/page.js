import { mongooseConnect } from "@/lib/mongoose";
import Featured from "../components/Featured"
import Header from "../components/Header"
import { Product } from "@/models/product";


async function getProduct(){
  const featuredProductId = "65dfe49d894e08e55f0653c8";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return JSON.parse(JSON.stringify(product));
 }


export default async function page() {
  const product = await getProduct();
  console.log('product', product);
  return (
    <div>
      <Header />
      <Featured product={product}/>
    </div>
  )
}
