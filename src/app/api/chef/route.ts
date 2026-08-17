import { NextRequest, NextResponse } from "next/server";

// N Kitchen — My Chef backend endpoint.
// SECURITY: the OpenAI key lives ONLY here (server-side env var), never in frontend code.
// COST SAFETY: every request is opt-in (triggered by an explicit user action in the UI)
// and the client enforces the monthly AI budget before calling this route.
// Until OPENAI_API_KEY is configured in the deployment environment, this route
// returns a clear "not configured" response instead of silently failing or mocking data.

const SYSTEM_RULES = `You are "Моят готвач" inside N Kitchen, a personal keto/low-carb cooking assistant.
Hard rules:
- NEVER use or suggest: mushrooms (гъби), eggplant (патладжан), turkey (пуешко), olives (маслини).
- Only use fresh tomatoes, never canned tomatoes/passata/ready sauce.
- Respect the user's blocked/not-preferred ingredients and dietary rules provided in context.
- Keep responses short and action-oriented: propose a recipe or action first, explain only if asked.
- Never fabricate nutrition values — nutrition is computed deterministically by the app, not by you.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "ai_not_configured",
        message:
          "AI Chef все още не е активиран. Липсва OPENAI_API_KEY на бекенда. " +
          "Останалата част от N Kitchen работи напълно без него.",
      },
      { status: 501 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.prompt !== "string") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { prompt, context, model = "gpt-4o-mini" } = body as {
    prompt: string; context?: unknown; model?: string;
  };

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_RULES },
          { role: "system", content: `Context (fridge/pantry/preferences/recipes summary): ${JSON.stringify(context ?? {}).slice(0, 6000)}` },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: "upstream_error", message: text }, { status: 502 });
    }

    const data = await resp.json();
    const usage = data.usage ?? { total_tokens: 0 };
    // Rough cost estimate for gpt-4o-mini pricing tier; used only for budget dashboard display.
    const estCostEUR = (usage.total_tokens ?? 0) * 0.00000055;

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content ?? "",
      usage: { tokens: usage.total_tokens ?? 0, estCostEUR },
    });
  } catch {
    return NextResponse.json({ error: "network_error" }, { status: 500 });
  }
}
