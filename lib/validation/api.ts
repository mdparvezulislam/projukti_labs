import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
  meta?: {
    requestId: string;
    timestamp: number;
    [key: string]: unknown;
  };
}

export function apiSuccess<T>(
  data: T,
  metaOrStatus?: Record<string, unknown> | number,
  status = 200
) {
  let meta: Record<string, unknown> | undefined;
  let finalStatus = status;

  if (typeof metaOrStatus === "number") {
    finalStatus = metaOrStatus;
    meta = undefined;
  } else if (typeof metaOrStatus === "object" && metaOrStatus !== null) {
    meta = metaOrStatus;
  }

  const requestId = crypto.randomUUID();
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      requestId,
      timestamp: Date.now(),
      ...meta,
    },
  };
  return NextResponse.json(response, {
    status: finalStatus,
    headers: { "x-request-id": requestId },
  });
}

export function apiError(
  code: string,
  message: string,
  status = 400,
  fieldErrors?: Record<string, string[]>
) {
  const requestId = crypto.randomUUID();
  const response: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      ...(fieldErrors ? { fieldErrors } : {}),
    },
    meta: {
      requestId,
      timestamp: Date.now(),
    },
  };
  return NextResponse.json(response, {
    status,
    headers: { "x-request-id": requestId },
  });
}

export function handleZodError(err: ZodError) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of err.issues) {
    const field = issue.path.join(".") || "_root";
    if (!fieldErrors[field]) {
      fieldErrors[field] = [];
    }
    fieldErrors[field].push(issue.message);
  }

  return apiError(
    "VALIDATION_ERROR",
    err.issues[0]?.message || "Invalid payload",
    400,
    fieldErrors
  );
}
