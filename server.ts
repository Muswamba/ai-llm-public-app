// Loads variables from .env into process.env before the server reads them.
// This is where LLM_API_KEY, LLM_BASE_URL, LLM_MODEL, and PORT come from locally.
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOCK_RESPONSES } from './src/data';
import { PlayMode } from './src/types';

type ChatRole = 'user' | 'assistant' | 'system';

interface ChatHistoryItem {
  role: Exclude<ChatRole, 'system'>;
  content: string;
}

interface ChatRequestBody {
  message?: string;
  mode?: PlayMode;
  history?: ChatHistoryItem[];
}

const app = express();
const port = Number(process.env.PORT || 8787);

// ES modules do not provide __dirname automatically.
// These two lines recreate it so Express can serve files from /dist in production.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Accept JSON request bodies from the React app.
// The size limit is a basic safety guard against very large prompt payloads.
app.use(express.json({ limit: '1mb' }));

// Rough token estimate for demos.
// Real providers usually return usage metadata, but mock mode needs a simple approximation.
const estimateTokens = (text: string) => Math.max(1, Math.ceil(text.length / 4));

// Converts the selected UI mode into a system-level behavior instruction.
// This lets one endpoint support Beginner, Developer, and Product explanations.
const getModeInstruction = (mode: PlayMode = 'Beginner') => {
  if (mode === 'Developer') {
    return 'Answer for a developer. Include implementation details, API boundaries, and safe backend patterns.';
  }

  if (mode === 'Product') {
    return 'Answer for a product builder. Focus on UX, user trust, cost, safety, and launch tradeoffs.';
  }

  return 'Answer for a beginner. Use plain language, short examples, and explain jargon before using it.';
};

// Server-side mock mode keeps the frontend/backend architecture real,
// even before a paid or local model provider is configured.
const buildMockResponse = (message: string, mode: PlayMode = 'Beginner') => {
  const baseResponse = MOCK_RESPONSES[message] || MOCK_RESPONSES.default;

  if (MOCK_RESPONSES[message]) {
    return baseResponse;
  }

  return `### Response Preview

You asked: "${message}"

${getModeInstruction(mode)}

Because no external LLM provider is configured yet, this is the backend mock response. The important part is that the frontend is already sending your prompt to \`/api/chat\`, and the backend is returning clean assistant text to render in the chat area.

${baseResponse}`;
};

// Calls any provider that follows the OpenAI chat completions API shape.
// If no provider env vars are set, return null so /api/chat can use mock mode.
const callOpenAICompatibleProvider = async (body: ChatRequestBody) => {
  const apiKey = process.env.LLM_API_KEY;
  const baseUrl = process.env.LLM_BASE_URL?.replace(/\/$/, '');
  const model = process.env.LLM_MODEL || 'gpt-4o-mini';

  if (!apiKey || !baseUrl) {
    return null;
  }

  // Provider-neutral convention:
  // - OpenAI: https://api.openai.com/v1
  // - Ollama: http://localhost:11434/v1
  // - OpenRouter: https://openrouter.ai/api/v1
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: Number(process.env.LLM_TEMPERATURE || 0.3),
      // Most chat providers expect an array of messages:
      // system = rules/persona, history = previous turns, user = latest prompt.
      messages: [
        {
          role: 'system',
          content: `You are the SMSOFTWARE AI UI/UX Lab assistant. ${getModeInstruction(body.mode)}`
        },
        ...(body.history || []),
        {
          role: 'user',
          content: body.message
        }
      ]
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`LLM provider failed: ${response.status} ${details}`);
  }

  // We only extract the fields the frontend needs.
  // Keeping this shape small makes it easy to swap providers later.
  const data = await response.json() as {
    choices?: Array<{ message?: { content?: string } }>;
    usage?: { total_tokens?: number };
    model?: string;
  };

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error('LLM provider returned an empty response.');
  }

  return {
    text,
    modelName: data.model || model,
    tokens: data.usage?.total_tokens || estimateTokens(text),
    source: 'provider'
  };
};

// Health endpoint for debugging.
// Visit /api/health to confirm whether the backend sees provider configuration.
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    providerConfigured: Boolean(process.env.LLM_API_KEY && process.env.LLM_BASE_URL),
    model: process.env.LLM_MODEL || 'mock-backend'
  });
});

// Main chat endpoint used by the React UI.
// The browser sends { message, mode, history }; this endpoint returns assistant text.
app.post('/api/chat', async (req, res) => {
  const body = req.body as ChatRequestBody;
  const message = body.message?.trim();

  // Validate the minimum payload early so provider calls are never made with empty prompts.
  if (!message) {
    res.status(400).json({ error: 'message is required' });
    return;
  }

  try {
    // First try the real provider path.
    // If env vars are missing, this returns null and we intentionally fall back to mock mode.
    const providerResponse = await callOpenAICompatibleProvider({ ...body, message });

    if (providerResponse) {
      res.json(providerResponse);
      return;
    }

    // No provider configured: return a server-side mock so the frontend/backend flow still works.
    const text = buildMockResponse(message, body.mode);
    res.json({
      text,
      modelName: 'mock-backend',
      tokens: estimateTokens(text),
      source: 'mock'
    });
  } catch (error) {
    // Do not leak provider error details to the browser.
    // Log them on the server, then send a generic message to the UI.
    console.error(error);
    res.status(500).json({
      error: 'The chat backend could not process this prompt.'
    });
  }
});

// Production mode: serve the built React app from /dist.
// In development, Vite serves React and proxies /api to this Express server.
app.use(express.static(path.join(__dirname, 'dist')));

// Browser-router fallback.
// This makes /chat and /course work after a production refresh.
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`AI UI/UX Lab backend listening on http://localhost:${port}`);
});
