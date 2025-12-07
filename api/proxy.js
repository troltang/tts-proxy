export default async function handler(req, res) {
  const target = req.query.url;
  if (!target) return res.status(400).json({ error: "Missing url parameter" });

  try {
    const parsedUrl = new URL(target); // WHATWG URL API
    // 你可以安全获取 hostname / pathname / searchParams 等
    const response = await fetch(parsedUrl.href, {
      method: req.method,
      headers: { ...req.headers, host: undefined },
      body: req.method !== "GET" ? req.body : undefined
    });

    const data = await response.arrayBuffer();
    response.headers.forEach((v, k) => res.setHeader(k, v));
    res.status(response.status).send(Buffer.from(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
