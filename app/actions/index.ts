"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { ratelimit, simpleRateLimit } from "@/app/lib/rate-liimt";

const formSchema = z.object({
  brandName: z.string().min(2, "Brand name is too short"),
  category: z.string().min(2, "category  is too short"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  challenge: z.string().min(2, "Please enter valid information"),
  consistency: z.string().min(2, "Please enter valid informtion"),
  contactName: z.string().min(2, "Please enter valid information"),
  investment: z.string().min(2, "Please enter valid information"),
  market: z.string().min(2, "Please enter valid information"),
  packaging: z.string().min(2, "Please enter valid information"),
  productionCapacity: z.string().min(2, "Please enter valid information"),
  scaling: z.string().min(2, "Please enter valid information"),
  sellingStage: z.string().min(2, "Please enter valid information"),
  targetMarket: z.string().min(2, "Please enter valid information"),
});

export async function registerForEvent(
  previousState: unknown,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries());

  //Validation
  const validated = formSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: validated.error.issues[0].message };
  }

  // Rate limiting
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0] ||
    headerList.get("x-real-ip") ||
    "127.0.0.1";

  let rateLimitResult;

  if (process.env.UPSTASH_REDIS_REST_URL) {
    rateLimitResult = await ratelimit.limit(ip);
  } else {
    rateLimitResult = await simpleRateLimit(ip);
  }

  if (!rateLimitResult.success) {
    return {
      success: false,
      error:
        "Too many registration attempts. Please try again later (max 5 per hour).",
    };
  }

  //Submit to Google Apps Script
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated.data),
      },
    );

    const result = await response.json();

    if (result.statusCode === 200) {
      if (result.status === "success") {
        return {
          success: true,
          message: result.message,
        };
      } else {
        return { success: false, message: result.message };
      }
    } else {
      return { success: false, message: result.error };
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Failed to connect to registration server. Please try again.",
    };
  }
}
