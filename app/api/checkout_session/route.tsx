import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/services/checkout_sessions";

export async function POST(req: NextRequest) {
  return await createCheckoutSession(req);
}
