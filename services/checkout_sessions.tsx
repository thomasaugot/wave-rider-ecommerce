import Stripe from "stripe";
import stripe, { formatAmountForStripe } from "./serverStripe";
import { NextRequest, NextResponse } from "next/server";

export async function createCheckoutSession(req: NextRequest) {
  const { amount } = await req.json();

  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Total Payment",
            },
            unit_amount: formatAmountForStripe(amount, "usd"),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession);
  } catch (err: any) {
    return NextResponse.json({ statusCode: 500, message: err.message });
  }
}
