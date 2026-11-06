import { describe, it, expect, beforeAll } from "vitest";
import {
  hashPassword,
  verifyPassword,
  createAdminSession,
  lookupAdminSession,
  revokeAdminSession,
  hasRolePermission,
} from "@/lib/auth/admin";
import { hashPasswordWebCrypto } from "@/lib/auth/crypto";
import { canBootstrapOwner } from "@/lib/auth/bootstrap";
import {
  getSiteSettings,
  getSiteSettingByKey,
  updateSiteSetting,
  getPageSections,
  upsertPageSection,
  getCmsServices,
  getCmsServiceBySlug,
  getCmsBlogPosts,
  getCmsBlogPostBySlug,
  getCmsFaqs,
  upsertCmsFaq,
  getCmsPortfolio,
  upsertCmsPortfolioProject,
} from "@/lib/cms";
import {
  getInquiries,
  updateInquiryStatus,
  getLeads,
  createLead,
  updateLeadStage,
  generateQuoteNumber,
  createQuote,
  getQuotes,
  upsertCustomer,
  getCustomers,
  getCrmDashboardMetrics,
} from "@/lib/crm";
import {
  dispatchAutomationEvent,
  retryAutomationRun,
  getAdminNotifications,
  markNotificationAsRead,
} from "@/lib/automation/processor";
import { getDb } from "@/lib/db";
import { adminUsers, automationRuns } from "@/db/schema";
import { eq } from "drizzle-orm";

describe("Phase 08–12: Complete Admin Operating System & Business Engine", () => {
  beforeAll(async () => {
    // Ensure DB connection is active
    const db = getDb();
    expect(db).toBeDefined();
  });

  describe("1. Admin Authentication & RBAC Security", () => {
    it("should hash and verify passwords securely", async () => {
      const password = "SuperSecretPassword2026!#";
      const hash = await hashPassword(password);
      expect(hash).toContain(":");
      expect(hash.length).toBeGreaterThan(40);

      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);

      const isInvalid = await verifyPassword("WrongPassword!", hash);
      expect(isInvalid).toBe(false);
    });

    it("should prevent duplicate owner bootstrap when owner already exists", async () => {
      const db = getDb();
      const existingOwners = await db.select().from(adminUsers).where(eq(adminUsers.role, "owner"));
      if (existingOwners.length > 0) {
        const canBoot = await canBootstrapOwner();
        expect(canBoot).toBe(false);
      }
    });

    it("should create, lookup, and revoke admin sessions", async () => {
      const db = getDb();
      // Ensure test user exists
      const testUserId = "usr_test_auth_01";
      const { hashHex, saltHex } = await hashPasswordWebCrypto("TestPass123!");
      await db
        .insert(adminUsers)
        .values({
          id: testUserId,
          email: "test_auth@projuktilabs.tech",
          name: "Test Auth User",
          passwordHash: hashHex,
          passwordSalt: saltHex,
          role: "admin",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoNothing();

      const sessionResult = await createAdminSession(testUserId);
      expect(sessionResult.rawToken).toBeDefined();
      expect(sessionResult.rawToken.length).toBeGreaterThan(32);

      const session = await lookupAdminSession(sessionResult.rawToken);
      expect(session).not.toBeNull();
      expect(session?.user.email).toBe("test_auth@projuktilabs.tech");
      expect(session?.user.role).toBe("admin");

      // Revoke session
      await revokeAdminSession(sessionResult.rawToken);
      const revokedSession = await lookupAdminSession(sessionResult.rawToken);
      expect(revokedSession).toBeNull();
    });

    it("should enforce RBAC permission guards correctly", () => {
      expect(hasRolePermission("owner", ["owner"])).toBe(true);
      expect(hasRolePermission("owner", ["admin"])).toBe(true);
      expect(hasRolePermission("admin", ["admin", "owner"])).toBe(true);
      expect(hasRolePermission("editor", ["owner"])).toBe(false);
      expect(hasRolePermission("editor", ["editor", "admin", "owner"])).toBe(true);
      expect(hasRolePermission("support", ["admin", "owner"])).toBe(false);
    });
  });

  describe("2. Database-Driven CMS Layer & Fallbacks", () => {
    it("should read and update site settings in D1", async () => {
      const settings = await getSiteSettings();
      expect(typeof settings).toBe("object");

      await updateSiteSetting("test_suite_key", { runAt: new Date().toISOString(), version: "1.0.0" });
      const settingVal = await getSiteSettingByKey("test_suite_key");
      expect(settingVal).not.toBeNull();
      expect(settingVal?.version).toBe("1.0.0");
    });

    it("should retrieve page sections and allow upsert", async () => {
      const homeSections = await getPageSections("home");
      expect(Array.isArray(homeSections)).toBe(true);

      const testSectionId = "sec_test_suite_01";
      await upsertPageSection({
        id: testSectionId,
        pageSlug: "test-page",
        sectionKey: "intro",
        title: "টেস্ট সেকশন শিরোনাম",
        subtitle: "টেস্ট সেকশন সাবটাইটেল",
        content: { note: "test" },
        sortOrder: 1,
        isActive: true,
        updatedAt: new Date(),
      });

      const pageSectionsRes = await getPageSections("test-page");
      expect(pageSectionsRes.length).toBeGreaterThan(0);
      expect(pageSectionsRes[0].title).toBe("টেস্ট সেকশন শিরোনাম");
    });

    it("should retrieve CMS services and individual service by slug", async () => {
      const services = await getCmsServices();
      expect(services.length).toBeGreaterThanOrEqual(3);

      const flagshipService = await getCmsServiceBySlug("landing-page-meta-pixel");
      expect(flagshipService).not.toBeNull();
      expect(flagshipService?.name).toContain("ল্যান্ডিং পেজ");
      expect(flagshipService?.packages.length).toBeGreaterThan(0);
    });

    it("should retrieve CMS blog posts and single blog post by slug", async () => {
      const posts = await getCmsBlogPosts();
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0].slug).toBeDefined();
      expect(posts[0].author).toBeDefined();

      const post = await getCmsBlogPostBySlug(posts[0].slug);
      expect(post).not.toBeNull();
      expect(post?.title).toBe(posts[0].title);
    });

    it("should manage FAQs in D1", async () => {
      const initialFaqs = await getCmsFaqs();
      expect(Array.isArray(initialFaqs)).toBe(true);

      const testFaqId = `faq_test_${Date.now()}`;
      await upsertCmsFaq({
        id: testFaqId,
        category: "টেস্ট ক্যাটাগরি",
        question: "টেস্ট প্রশ্ন?",
        answer: "টেস্ট উত্তর।",
        sortOrder: 99,
        isActive: true,
        updatedAt: new Date(),
      });

      const updatedFaqs = await getCmsFaqs();
      const created = updatedFaqs.find((f) => f.id === testFaqId);
      expect(created).toBeDefined();
      expect(created?.question).toBe("টেস্ট প্রশ্ন?");
    });

    it("should retrieve and manage portfolio projects in D1", async () => {
      const projects = await getCmsPortfolio();
      expect(Array.isArray(projects)).toBe(true);

      const testProjectId = `prj_test_${Date.now()}`;
      await upsertCmsPortfolioProject({
        id: testProjectId,
        slug: `test-prj-${Date.now()}`,
        title: "টেস্ট পোর্টফোলিও প্রজেক্ট",
        category: "এজ সিস্টেম",
        badge: "টেস্ট ব্লুপ্রিন্ট",
        projectType: "ব্লুপ্রিন্ট",
        overview: "টেস্ট প্রজেক্ট বিস্তারিত বিবরণী।",
        metrics: [{ label: "স্পিড", value: "১.০s" }],
        stack: ["Next.js", "Cloudflare"],
        deliverables: ["ডেলিভারেবল ১"],
        linkUrl: "/",
        linkText: "দেখুন",
        isFeatured: true,
        isPublished: true,
        sortOrder: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const updatedProjects = await getCmsPortfolio();
      const created = updatedProjects.find((p) => p.id === testProjectId);
      expect(created).toBeDefined();
      expect(created?.title).toBe("টেস্ট পোর্টফোলিও প্রজেক্ট");
    });
  });

  describe("3. CRM Engine & Workflow Pipelines", () => {
    it("should retrieve inquiries and update status", async () => {
      const inquiries = await getInquiries({});
      expect(Array.isArray(inquiries)).toBe(true);

      if (inquiries.length > 0) {
        const targetId = inquiries[0].id;
        await updateInquiryStatus(targetId, "contacted", "কাস্টমারের সাথে কথা হয়েছে।");
        const refreshed = (await getInquiries({})).find((i) => i.id === targetId);
        expect(refreshed?.status).toBe("contacted");
      }
    });

    it("should manage leads lifecycle and stage transitions", async () => {
      const lead = await createLead({
        title: "করিম উল্লাহ — টেস্ট ই-কমার্স লিড ২০২৬",
        stage: "new",
        priority: "high",
        estimatedValueBdt: 85000,
      });

      expect(lead.id).toBeDefined();
      expect(lead.stage).toBe("new");
      expect(lead.estimatedValueBdt).toBe(85000);

      // Transition stage
      await updateLeadStage(lead.id, "proposal_sent");
      const leads = await getLeads({ stage: "proposal_sent" });
      const found = leads.find((l) => l.id === lead.id);
      expect(found).toBeDefined();
      expect(found?.stage).toBe("proposal_sent");
    });

    it("should generate quotes with proper sequential number format PL-Q-2026-XXXX", async () => {
      const quoteNumber = await generateQuoteNumber();
      expect(quoteNumber).toMatch(/^PL-Q-\d{4}-[A-Z0-9]{4}$/);

      const quote = await createQuote({
        quoteNumber,
        clientName: "রহিম ট্রেডার্স",
        clientEmail: "rahim@traders.com",
        clientPhone: "+880 1711-111111",
        clientCompany: "রহিম ট্রেডার্স লিমিটেড",
        lineItems: [
          {
            description: "আল্ট্রা-ফাস্ট ল্যান্ডিং পেজ ডিজাইন ও ডেভেলপমেন্ট",
            amountBdt: 35000,
            quantity: 1,
          },
          {
            description: "মেটা Conversions API (CAPI) ডুয়াল ট্র্যাকিং ইন্টিগ্রেশন",
            amountBdt: 15000,
            quantity: 1,
          },
        ],
        totalBdt: 45000,
        status: "draft",
        validUntil: new Date(Date.now() + 14 * 86400000),
      });

      expect(quote.id).toBeDefined();
      expect(quote.quoteNumber).toBe(quoteNumber);
      expect(quote.totalBdt).toBe(45000);

      const fetchedQuotes = await getQuotes();
      const foundQuote = fetchedQuotes.find((q) => q.id === quote.id);
      expect(foundQuote).toBeDefined();
    });

    it("should upsert customers into directory and compute CRM metrics", async () => {
      const customer = await upsertCustomer({
        fullName: "জসিম উদ্দিন",
        email: "jasim@enterprise.com",
        phone: "+880 1900-000000",
        companyName: "জসিম টেক্সটাইল",
      });

      expect(customer.id).toBeDefined();
      expect(customer.fullName).toBe("জসিম উদ্দিন");

      const customers = await getCustomers();
      expect(customers.length).toBeGreaterThan(0);

      const metrics = await getCrmDashboardMetrics();
      expect(metrics.totalInquiries).toBeGreaterThanOrEqual(0);
      expect(metrics.openLeadsCount).toBeGreaterThanOrEqual(0);
      expect(metrics.totalQuotes).toBeGreaterThanOrEqual(0);
    });
  });

  describe("4. Automation Engine & Notification Hub", () => {
    it("should dispatch business events, trigger active rules, and log run records", async () => {
      const testInquiryId = `inq_auto_test_${Date.now()}`;
      const payload = {
        inquiryId: testInquiryId,
        referenceCode: "PL-2026-AUTO",
        fullName: "অটোমেশন পরীক্ষক",
        email: "auto_test@example.com",
        projectBrief: "অটোমেশন ইন্টিগ্রেশন টেস্ট",
        serviceId: "landing-page-meta-pixel",
        budgetRange: "৳২৫,০০০ - ৳৫০,০০০",
      };

      const result = await dispatchAutomationEvent("inquiry.created", payload);
      expect(result.success).toBe(true);
      expect(result.runsCount).toBeGreaterThanOrEqual(0);

      // Verify that notification was created
      const notifications = await getAdminNotifications();
      expect(notifications.length).toBeGreaterThan(0);
      const matchedNotification = notifications.find((n) => n.title.includes("নতুন ইনকোয়ারি"));
      expect(matchedNotification).toBeDefined();

      // Mark notification as read
      if (matchedNotification) {
        await markNotificationAsRead(matchedNotification.id);
        const refreshedNotifications = await getAdminNotifications();
        const readNotif = refreshedNotifications.find((n) => n.id === matchedNotification.id);
        expect(readNotif?.isRead).toBe(true);
      }
    });

    it("should support retry mechanism for failed automation runs", async () => {
      const db = getDb();
      const fakeFailedRunId = `run_fail_test_${Date.now()}`;
      await db.insert(automationRuns).values({
        id: fakeFailedRunId,
        ruleId: "rule_inquiry_notify",
        eventType: "inquiry.created",
        status: "failed",
        errorMessage: "Simulated connection error",
        payload: {
          inquiryId: "inq_simulated_retry",
          referenceCode: "PL-2026-RETRY",
          fullName: "রিট্রাই পরীক্ষক",
          email: "retry_test@example.com",
          projectBrief: "রিট্রাই টেস্ট",
        },
        executedAt: new Date(),
      });

      const retryRes = await retryAutomationRun(fakeFailedRunId);
      expect(retryRes.success).toBe(true);

      const runs = await db.select().from(automationRuns).where(eq(automationRuns.id, fakeFailedRunId));
      expect(runs[0].status).toBe("success");
    });
  });
});
