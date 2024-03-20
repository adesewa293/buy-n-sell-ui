import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  await mongooseConnect();
  const body = await req.json();
  const ids = body.ids;
  return NextResponse.json(await Product.find({ _id: ids }));
}
