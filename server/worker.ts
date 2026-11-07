import vinextWorker from "vinext/server/fetch-handler";
import { processScheduledBlogPosts } from "@/lib/automation/processor";

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    return vinextWorker.fetch(request, env, ctx);
  },
  async scheduled(
    event: { cron: string; scheduledTime: number },
    env: unknown,
    ctx: { waitUntil: (promise: Promise<unknown>) => void }
  ) {
    ctx.waitUntil(
      (async () => {
        try {
          const res = await processScheduledBlogPosts();
          console.log(
            `[Cloudflare Cron Trigger] Scheduled blog processing completed at ${new Date().toISOString()} (${res.publishedCount} published)`
          );
        } catch (err) {
          console.error("[Cloudflare Cron Trigger] Scheduled blog processing error:", err);
        }
      })()
    );
  },
};
