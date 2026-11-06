import { describe, it, expect } from "vitest";
import { GET as healthHandler } from "@/app/api/v1/health/route";
import { POST as inquiryHandler } from "@/app/api/v1/inquiries/route";
import { NextRequest } from "next/server";

interface ApiResponseBody {
  success: boolean;
  data?: {
    status?: string;
    runtime?: string;
    dependencies?: Record<string, unknown>;
    referenceCode?: string;
    inquiryType?: string;
    slaHours?: number;
    [key: string]: unknown;
  };
  error?: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string>;
  };
  meta?: {
    requestId?: string;
    timestamp?: string;
  };
}

describe("Phase 07: API Route Security & Reliability", () => {
  it("GET /api/v1/health should return 200 with runtime and dependency metadata", async () => {
    const res = await healthHandler();
    expect(res.status).toBe(200);

    const body = (await res.json()) as ApiResponseBody;
    expect(body.success).toBe(true);
    expect(body.data?.status).toBe("ok");
    expect(body.data?.runtime).toBe("workerd");
    expect(body.data?.dependencies).toBeDefined();
    expect(body.meta?.requestId).toBeDefined();
  });

  it("POST /api/v1/inquiries should reject non-JSON Content-Type with 415", async () => {
    const req = new NextRequest("http://localhost:3000/api/v1/inquiries", {
      method: "POST",
      headers: {
        "content-type": "text/plain",
      },
      body: "plain text body",
    });

    const res = await inquiryHandler(req);
    expect(res.status).toBe(415);

    const body = (await res.json()) as ApiResponseBody;
    expect(body.success).toBe(false);
    expect(body.error?.code).toBe("UNSUPPORTED_MEDIA_TYPE");
  });

  it("POST /api/v1/inquiries should reject invalid payloads with 400 and field errors", async () => {
    const req = new NextRequest("http://localhost:3000/api/v1/inquiries", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fullName: "A", // too short (min 2)
        email: "not-an-email",
        projectBrief: "short", // too short (min 10)
      }),
    });

    const res = await inquiryHandler(req);
    expect(res.status).toBe(400);

    const body = (await res.json()) as ApiResponseBody;
    expect(body.success).toBe(false);
    expect(body.error?.code).toBe("VALIDATION_ERROR");
    expect(body.error?.fieldErrors).toBeDefined();
  });

  it("POST /api/v1/inquiries should silently trap bot honeypot submissions", async () => {
    const req = new NextRequest("http://localhost:3000/api/v1/inquiries", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fullName: "Spam Bot",
        email: "bot@spam.com",
        projectBrief: "This is automated spam text trying to sell something.",
        website_url: "http://spam-link.com", // honeypot filled
      }),
    });

    const res = await inquiryHandler(req);
    expect(res.status).toBe(200);

    const body = (await res.json()) as ApiResponseBody;
    expect(body.success).toBe(true);
    expect(body.data?.referenceCode).toBeDefined();
  });

  it("POST /api/v1/inquiries should accept valid submission and return 201 with reference code", async () => {
    const uniqueEmail = `test_${Date.now()}@projuktilabs.tech`;
    const req = new NextRequest("http://localhost:3000/api/v1/inquiries", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        inquiryType: "quote",
        fullName: "Parvezul Islam",
        email: uniqueEmail,
        phoneWhatsapp: "+8801700000000",
        serviceId: "complete-ecommerce-website",
        packageId: "growth-storefront",
        budgetRange: "100000-150000",
        currency: "BDT",
        projectBrief: "Need a high performance e-commerce platform with bKash and Pathao API.",
      }),
    });

    const res = await inquiryHandler(req);
    expect(res.status).toBe(201);

    const body = (await res.json()) as ApiResponseBody;
    expect(body.success).toBe(true);
    expect(body.data?.referenceCode).toMatch(/^PL-2026-[A-Z0-9]{4}$/);
    expect(body.data?.inquiryType).toBe("quote");
    expect(body.data?.slaHours).toBe(24);
  });
});
