import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { NextResponse } from "next/server";

const endpointSecret = process.env.ENDPOINT_SK;

export async function POST(request) {
  await mongooseConnect();
  const sig = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      sig,
      endpointSecret
    );
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(
      {
        message: `Webhook Error: ${err.message}`,
      },
      {
        status: 400,
      }
    );
  }

  try {
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const data = event.data.object;
        const orderId = data.metadata.orderId;
        const paid = data.payment_status === "paid";
        if (orderId && paid) {
          await Order.findByIdAndUpdate(orderId, {
            paid: true,
          });
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return NextResponse.json(
      {
        message: "ok",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "An error occured",
      },
      {
        staus: 500,
      }
    );
  }
}
