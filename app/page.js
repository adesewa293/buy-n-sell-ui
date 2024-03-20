import { mongooseConnect } from "@/lib/mongoose";
import Featured from "../components/Featured"
import Header from "../components/Header"
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts";


async function getProduct(){
  const featuredProductId = "65dfe49d894e08e55f0653c8";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  return JSON.parse(JSON.stringify(featuredProduct));
 }

 async function getNewProducts(){
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return JSON.parse(JSON.stringify(newProducts));

 }



export default async function page() {
  const featuredProduct = await getProduct();
  const newProducts = await getNewProducts();
  console.log('product', newProducts);
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
    </div>
  )
}
