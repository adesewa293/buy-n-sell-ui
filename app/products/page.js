
import Products from "@/components/Products";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


async function getAllProducts() {
  await mongooseConnect();
  const allProducts = await Product.find({}, null, { sort: { _id: -1 } });
  return JSON.parse(JSON.stringify(allProducts));
}

export default async function ProductsPage() {
  const allProducts = await getAllProducts();
  return <Products products={allProducts} />;
}
