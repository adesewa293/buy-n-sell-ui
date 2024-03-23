import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { redirect } from "next/navigation";
const stripe = require("stripe")(process.env.STRIPE_SK);

  export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const city = formData.get("city");
  const postalCode = formData.get("postalCode");
  const streetAddress = formData.get("streetAddress");
  const country = formData.get("country");
  const products = formData.get("products");

  console.log('formData', formData, products);
  await mongooseConnect();
  const productIds = products.split(",");
  const uniqueIds = [...new Set(productIds)];
  const productInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString()}
  })

  return redirect(session.url);
}
