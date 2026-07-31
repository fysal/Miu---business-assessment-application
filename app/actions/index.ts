"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { ratelimit, simpleRateLimit } from "@/app/lib/rate-liimt";

//Function to be moved in own file
const formSchema = z.object({
  brandName: z
    .string({
      message: "Please enter your Brand name",
    })
    .min(2, "Brand name is too short"),
  category: z
    .string({ message: "Product category is required" })
    .min(2, "category  is too short"),
  phone: z
    .string({ message: "Please enter phone number" })
    .min(8, "Please enter a valid phone number"),
  email: z
    .string({ message: "Please enter your email address" })
    .email("Please enter a valid email address"),
  challenge: z
    .string({ message: "Please enter challenge faced" })
    .min(2, "Challenge text is too short"),
  consistency: z
    .string({ message: "Consistency information is required" })
    .min(2, "Consistency information is too short"),
  contactName: z
    .string({ message: "Please enter valid information" })
    .min(2, "Contact name is too short"),
  investment: z.string({ message: "Please enter valid information" }),
  market: z.string({ message: "Market field is required" }),
  packaging: z.string({ message: "Packaging information is required" }),
  productionCapacity: z
    .string({ message: "Please enter product capacity information" })
    .min(2, "Please enter valid information"),
  scaling: z.string({ message: "Please enter valid information" }),
  sellingStage: z.string({
    message: "Please enter where you sell information",
  }),
  targetMarket: z.string({ message: "Please select your target market" }),
});

export async function registerForEvent(
  previousState: unknown,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries());

  //Validation
  const validated = formSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, message: validated.error.issues[0].message };
  }

  // Rate limiting
  // const headerList = await headers();
  // const ip =
  //   headerList.get("x-forwarded-for")?.split(",")[0] ||
  //   headerList.get("x-real-ip") ||
  //   "127.0.0.1";

  // let rateLimitResult;

  // if (process.env.UPSTASH_REDIS_REST_URL) {
  //   rateLimitResult = await ratelimit.limit(ip);
  // } else {
  //   rateLimitResult = await simpleRateLimit(ip);
  // }

  // if (!rateLimitResult.success) {
  //   return {
  //     success: false,
  //     message:
  //       "Too many registration attempts. Please try again later (max 5 per hour).",
  //   };
  // }

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
