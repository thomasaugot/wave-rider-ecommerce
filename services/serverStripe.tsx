import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export const formatAmountForStripe = (amount: number, currency: string) => {
  return amount * 100;
};

export default stripe;
