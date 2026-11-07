import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "projukti-labs-web",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-06",
    compatibilityFlags: ["nodejs_compat"],
    workersDev: true,
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    domains: ["projuktilabs.tech", "www.projuktilabs.tech"],
    env: {
      ASSETS: bindings.assets(),
      DB: bindings.d1({
        id: "8b1097c3-c930-477f-b8bc-81a498ac0f41",
        name: "projukti-labs-production",
      }),
      R2_BUCKET: bindings.r2({
        name: "projukti-labs-assets",
      }),
      KV_CACHE: bindings.kv({
        id: "4c3a552b441e491c8d781f198bbb4316",
      }),
      VINEXT_KV_CACHE: bindings.kv({
        id: "4c3a552b441e491c8d781f198bbb4316",
      }),
      ENVIRONMENT: bindings.text("production"),
      APP_URL: bindings.text("https://projuktilabs.tech"),
    },
  }),
});
