import { NextRequest } from "next/server";
import { z } from "zod";
import { apiSuccess, handleZodError } from "@/lib/validation/api";

const TestValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  count: z.number().int().min(1, "Count must be >= 1"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = TestValidationSchema.parse(body);
    return apiSuccess({
      received: parsed,
      verified: true,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return handleZodError(err);
    }
    return handleZodError(
      new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: "Malformed request body",
          path: [],
        },
      ])
    );
  }
}

