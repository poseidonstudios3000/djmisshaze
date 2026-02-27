import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { app, appReady } = await import("../server/index");
    await appReady;
    app(req, res);
  } catch (err: any) {
    console.error("FUNCTION BOOT ERROR:", err);
    res.status(500).json({
      error: "Function failed to initialize",
      message: err?.message,
      stack: err?.stack?.split("\n").slice(0, 5),
    });
  }
}
