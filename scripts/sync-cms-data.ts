import { syncCmsContentToDatabase } from "@/lib/cms/seed";

async function main() {
  console.log("Starting CMS database synchronization...");
  const result = await syncCmsContentToDatabase();
  console.log("Result:", result);
}

main().catch((err) => {
  console.error("Failed to sync CMS database:", err);
  process.exit(1);
});

