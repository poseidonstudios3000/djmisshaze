import type { VercelRequest, VercelResponse } from "@vercel/node";
import { app, appReady } from "../server/index";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await appReady;
  app(req, res);
}
