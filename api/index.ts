import type { VercelRequest, VercelResponse } from "@vercel/node";

let appModule: any = null;
let bootError: any = null;

const boot = (async () => {
  try {
    appModule = await import("../server/index.js");
    await appModule.appReady;
  } catch (err) {
    bootError = err;
    console.error("BOOT ERROR:", err);
  }
})();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await boot;
  if (bootError) {
    return res.status(500).json({
      error: "Function boot failed",
      message: bootError?.message,
      stack: bootError?.stack?.split("\n").slice(0, 8),
    });
  }
  appModule.app(req, res);
}
