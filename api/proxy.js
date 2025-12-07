import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
    });

    const body = await response.arrayBuffer(); // 支持音频/二进制

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    res.status(200).send(Buffer.from(body));
  } catch (err) {
    res.status(500).send("Proxy error: " + err.toString());
  }
}
