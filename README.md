<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# ai-llm-public-app

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/110c37bc-1f7f-4050-bee9-dab5ea82b151

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy [.env.example](.env.example) to `.env` and optionally configure an OpenAI-compatible LLM provider.
   Leave the provider values blank to use the built-in mock backend.
3. Run the backend API:
   `npm run dev:api`
4. Run the frontend app in a second terminal:
   `npm run dev`

Open the chat workspace:
`http://localhost:3000/chat`

Backend architecture notes:
[docs/how-it-works.md](docs/how-it-works.md)
