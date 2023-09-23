import { NextResponse } from "next/server";
import Stripe from "stripe";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

const coreHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: coreHeaders,
    },
  );
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { productIds } = await req.json();
  const frontendUrl = req.headers.get("origin");

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Missing productIds", {
      status: 400,
      headers: coreHeaders,
    });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    products.map(({ name, price }) => ({
      quantity: 1,
      price_data: {
        currency: "pln",
        product_data: {
          name: name,
        },
        unit_amount: price.toNumber() * 100,
      },
    }));

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((id: string) => ({
          product: {
            connect: {
              id,
            },
          },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${frontendUrl}/cart?success=1`,
    cancel_url: `${frontendUrl}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: coreHeaders,
    },
  );
}
