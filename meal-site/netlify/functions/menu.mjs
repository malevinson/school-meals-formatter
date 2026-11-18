import { getStore } from "@netlify/blobs";

// GET  /api/menu  -> the published menu (JSON) or null
// POST /api/menu  -> replace it (no password)
export default async (req) => {
  const store = getStore("menu");

  if (req.method === "GET") {
    const data = await store.get("current", { type: "json" });
    return Response.json(data ?? null, { headers: { "cache-control": "no-store" } });
  }

  if (req.method === "POST") {
    const text = await req.text();
    if (text.length > 500_000) return new Response("Too large", { status: 413 });
    let body;
    try { body = JSON.parse(text); } catch { return new Response("Bad JSON", { status: 400 }); }
    if (!body || !Array.isArray(body.cells) || !Array.isArray(body.heads)) {
      return new Response("Not a menu", { status: 400 });
    }
    await store.setJSON("current", body);
    return Response.json({ ok: true });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/api/menu" };
