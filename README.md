
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
