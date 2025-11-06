export async function togetherChat(body: any, env: any) {
  const url = (env.TOGETHER_BASE_URL ?? "https://api.together.xyz/v1") + "/chat/completions";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Together API error: ${res.status} ${text}`);
  }

  return res.json(); // Devuelve respuesta OpenAI-compatible
}
