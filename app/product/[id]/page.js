import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import ProductInfo from "@/components/ProductInfo";

async function getProductInfo(id) {
  await mongooseConnect();
  const productInfo = await Product.findById(id);
  return JSON.parse(JSON.stringify(productInfo));
}

export default async function ProductPage({ params }) {
  const productInfo = await getProductInfo(params.id);

  return <ProductInfo product={productInfo}/>;
}
