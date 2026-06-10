import { CourseModule, CourseRoadmapStep, FeatureItem, PromptExample } from './types';

export const FEATURES: FeatureItem[] = [
  {
    id: 'llm-basics',
    title: 'LLM Basics',
    tagline: 'Understand Neural Architectures',
    details: 'Learn how weights, bias, context windows, and embeddings form the foundation of modern language models.',
    iconName: 'Cpu',
    learningOutcome: 'Translate theoretical deep learning into practical API parameters.'
  },
  {
    id: 'prompt-eng',
    title: 'Prompt Engineering',
    tagline: 'Speak the Language of Latent Space',
    details: 'Master Zero-Shot, Few-Shot, Chain-of-Thought, and System Directives to control model behaviors precisely.',
    iconName: 'Terminal',
    learningOutcome: 'Write deterministic system instructions for custom tasks.'
  },
  {
    id: 'local-models',
    title: 'Local Models',
    tagline: 'Private, Unrestricted Compute',
    details: 'Run Llama, Gemma, or Mistral locally on your workstation using Ollama, LM Studio, or llama.cpp.',
    iconName: 'Server',
    learningOutcome: 'Deploy fully private open-source models with zero token cost.'
  },
  {
    id: 'rag-kb',
    title: 'RAG Knowledge Base',
    tagline: 'Connect Dynamic Enterprise Data',
    details: 'Build Retrieval-Augmented Generation flows using text splitters, vector databases, and cosine similarity.',
    iconName: 'Database',
    learningOutcome: 'Give AI real-time context from PDFs, databases, and website scrapers.'
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    tagline: 'Autonomous Goal-Directed Loops',
    details: 'Program agents equipped with tool use, recursive loops, memory logs, and self-correction patterns.',
    iconName: 'Workflow',
    learningOutcome: 'Build systems that browse the web or edit files autonomously.'
  },
  {
    id: 'fine-tuning-basics',
    title: 'Fine-Tuning Basics',
    tagline: 'Tailor Model Knowledge',
    details: 'Understand how LoRA, QLoRA, and supervised fine-tuning adjust transformer weights for custom domain styles.',
    iconName: 'Sliders',
    learningOutcome: 'Format high-quality instruction datasets for custom fine-tunes.'
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    title: '1. Core LLM Concepts',
    duration: '20 mins',
    difficulty: 'Beginner',
    description: 'Learn parameters, tokens, and temperature.',
    completed: true
  },
  {
    id: 'mod-2',
    title: '2. Local Setup Guide',
    duration: '35 mins',
    difficulty: 'Beginner',
    description: 'Download Gemma and talk to it in Terminal.',
    completed: true
  },
  {
    id: 'mod-3',
    title: '3. Prompt Engineering Matrix',
    duration: '45 mins',
    difficulty: 'Intermediate',
    description: 'Master Few-Shot learning and XML structural output tags.',
    completed: false
  },
  {
    id: 'mod-4',
    title: '4. Vector Databases & RAG',
    duration: '60 mins',
    difficulty: 'Intermediate',
    description: 'Index documents, query database embeddings, and synthesize outputs.',
    completed: false
  },
  {
    id: 'mod-5',
    title: '5. Agent Loops & Tools',
    duration: '90 mins',
    difficulty: 'Advanced',
    description: 'Give AI tools to make math calculations and run bash commands.',
    completed: false
  },
  {
    id: 'mod-6',
    title: '6. LoRA Fine-Tuning Intro',
    duration: '75 mins',
    difficulty: 'Advanced',
    description: 'Prepare JSONL datasets to train models to mimic a specific tone.',
    completed: false
  }
];

export const ROADMAP_STEPS: CourseRoadmapStep[] = [
  {
    id: 1,
    title: 'Lesson 1: AI/LLM Basics',
    duration: '30 mins session',
    objective: 'Anatomy of a Transformer Model',
    description: 'Understand terms like pre-training, fine-tuning, tokens, and context window lengths. Discover why temperature regulates high-creative answers vs deterministic structured outputs.',
    status: 'completed',
    tags: ['Architecture', 'Tokens', 'Weights']
  },
  {
    id: 2,
    title: 'Lesson 2: Run Your First Local Model',
    duration: '45 mins session',
    objective: 'Private Offline Intelligence',
    description: 'Install Ollama on your machine. Learn to pull a 3-Billion parameter Gemma-2 or Mistral model, query it completely client-side in seconds, and control system prompt scripts.',
    status: 'completed',
    tags: ['Ollama', 'Llama.cpp', 'Terminal']
  },
  {
    id: 3,
    title: 'Lesson 3: Build a Prompt Assistant',
    duration: '45 mins session',
    objective: 'Few-Shot & Structural Prompt Design',
    description: 'Explore techniques to program models using pure English. Create reusable prompt frames, enforce strict output formats (such as compliant JSON), and design structural markdown constraints.',
    status: 'active',
    tags: ['Few-Shot', 'JSON Schema', 'Directives']
  },
  {
    id: 4,
    title: 'Lesson 4: Add Project Knowledge with RAG',
    duration: '60 mins session',
    objective: 'Retrieval Augmented Generation Architecture',
    description: 'Discover the limits of context windows. Build a pipeline that chunks documents, embeds them, queries a Vector database, and inserts custom documents into prompt contexts for accurate real-time queries.',
    status: 'locked',
    tags: ['Embeddings', 'ChromaDB', 'Chunking']
  },
  {
    id: 5,
    title: 'Lesson 5: Create AI Agent Workflows',
    duration: '90 mins session',
    objective: 'Autonomy & Tool Integration',
    description: 'Program models to run inside recursive execution loops (thought, action, observation, feedback). Empower your agent to execute custom API requests, search the web, and correct its own mistakes.',
    status: 'locked',
    tags: ['Agentic Loops', 'Tool Calling', 'Function Binding']
  },
  {
    id: 6,
    title: 'Lesson 6: Prepare Fine-Tuning Data',
    duration: '75 mins session',
    objective: 'Supervised Fine-Tuning (SFT)',
    description: 'Move past prompt restrictions. Set up formatted JSONL instructions to adjust model weights using QLoRA. Train the AI on custom business logic and stylized corporate responses.',
    status: 'locked',
    tags: ['JSONL Dataset', 'LoRA Weights', 'SFT']
  }
];

export const PROMPT_EXAMPLES: PromptExample[] = [
  {
    id: 'px-1',
    label: 'Explain tokens',
    promptText: 'Explain tokens like I am a beginner. What are they, and why do they matter in LLMs?',
    category: 'Architecture'
  },
  {
    id: 'px-2',
    label: 'Audit feature plan',
    promptText: 'Audit this Lienskill feature plan. Highlight safety edge cases, architecture complexity, and suggest modular steps.',
    category: 'SaaS Design'
  },
  {
    id: 'px-3',
    label: 'Safe deployment plan',
    promptText: 'Create a safe implementation plan for building cloud databases. How do I balance Firestore vs relational Postgres database security rules?',
    category: 'SaaS Design'
  },
  {
    id: 'px-4',
    label: 'Summarize report',
    promptText: 'Summarize this project report briefly and list the key metrics and execution roadmap items in JetBrains Mono formatting.',
    category: 'Productivity'
  },
  {
    id: 'px-5',
    label: 'RAG architecture',
    promptText: 'Build a RAG architecture for SMSOFTWARE. What database triggers and indexing frameworks should we utilize?',
    category: 'Architecture'
  }
];

// High fidelity responses mapped to the specific buttons or query patterns
export const MOCK_RESPONSES: Record<string, string> = {
  default: `I am smsoftware-ai-v0.1, your crash course co-pilot! Let's explore AI & prompt architecture together. 

To help you learn, here is a quick modular code snippet depicting a simple Node.js custom prompt completion frame:

\`\`\`typescript
// The browser sends the prompt to your own backend.
// The backend owns the provider key and can call OpenAI, Ollama, OpenRouter, etc.
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Teach me the basics of prompt embeddings',
    mode: 'Beginner'
  })
});

const data = await response.json();
console.log(data.text);
\`\`\`

Feel free to click any of the **Prompt Examples** keynotes below or type your questions! I support Beginner, Developer, and Product mode contexts depending on your background.`,

  'Explain tokens like I am a beginner. What are they, and why do they matter in LLMs?': `### 🪙 Understanding Tokens in LLMs (A Beginner's Guide)

Think of a Large Language Model as a super-powered autocomplete system. However, instead of reading whole words or individual characters, models read language in chunks called **Tokens**.

#### 🎯 Key Concepts:
- **What is a Token?** On average, a token is about **4 characters** or **0.75 words** in English.
  - The word \`"learning"\` might be split into two tokens: \`["learn", "ing"]\`.
  - Common short words (e.g., \`"the"\`, \`"and"\`) are usually single tokens.
- **Why do they matter?**
  1. **Context Window Constraint:** A model has a hard limit on the total input + output tokens it can hold in memory (e.g., 8k, 32k, 128k, or more depending on provider).
  2. **Billing Scale:** APIs bill you strictly based on the count of tokens consumed.
  3. **Representation Accuracy:** Bad tokenization (like in non-English vocabulary) makes processing slower and more expensive!

*💡 Pro-Tip: To write highly efficient prompts, keep your inputs concise, avoiding repetitive words to conserve token limits!*`,

  'Audit this Lienskill feature plan. Highlight safety edge cases, architecture complexity, and suggest modular steps.': `### 🛠️ Structural Audit: Lienskill Feature Plan

I have analyzed the **Lienskill feature implementation model** from an architecture perspective. Here are the core insights:

#### 1. 🔍 High Priority Safety Edge-Cases
- **Permission Leaks:** Cross-tenant leaks during retrieval. Each document chunk in your vector store must possess a strict meta ID metadata tag mapping: \`tenant_owner_id\`.
- **Hallucinations on Manuals:** Ensure that during document retrieval (RAG), a low-cosine-similarity filter threshold (e.g. \`< 0.65\`) suppresses responses instead of fabricating false instructional guidelines.

#### 2. ⚡ Architectural Complexity Analysis
- The workflow blends transient memory layers checkups alongside long-term durable database entries.
- We recommend using **Firebase Firestore** or **Cloud SQL** (relational Postgres) with a robust ORM, keeping code highly structured.

#### 3. 🗺️ Minimalist Modular Action Plan:
- **Milestone A:** Build a sandboxed state component in React to prototype the visual pipeline.
- **Milestone B:** Introduce semantic search query filters using embedded query parameters.
- **Milestone C:** Connect safe servers to validate JWT auth before feeding data payloads directly to the LLM backend.`,

  'Create a safe implementation plan for building cloud databases. How do I balance Firestore vs relational Postgres database security rules?': `### 🔒 Security Balancing Guide: Cloud Firestore vs Postgres SQL

When deciding database architectures for SaaS projects, security, access speed, and schema rigidity drive the decision:

| Feature Dimension | Firebase Firestore (NoSQL) | Cloud SQL (PostgreSQL Relational) |
| :--- | :--- | :--- |
| **Authentication Binding** | Native connection to Firebase Auth rules. | Handled via custom backend API and SQL schemas. |
| **Write Integrity** | Checked via client-configurable declarations within \`firestore.rules\`. | Guaranteed by SQL constraints, foreign keys, and transactions. |
| **Primary Use-case** | Fast real-time reactive collaborative tools. | Complex join queries, financial ledgers, transactional consistency. |

#### 🔑 Recommended Steps for Firestore:
Avoid open rules that allow wildcard permissions (\`allow write: if true;\`). Always restrict queries relative to logged-in users:
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
\`\`\`

#### 🛡️ Recommended Steps for Cloud SQL (PostgreSQL):
- Run your DB strictly behind a server framework (such as Express or Next.js API).
- Implement database pool parameter sanitization or use a Type-Safe ORM to eliminate SQL Injection risks completely.`,

  'Summarize this project report briefly and list the key metrics and execution roadmap items in JetBrains Mono formatting.': `### 📈 Project Executive Summary

The project is tracking extremely well for the initial Q3 design milestone launch, showing major improvements in customer engagement and reduction in load latency.

#### 📊 Core Operational Metrics:
\`\`\`text
[METRIC_01] API response reduction ...... -142ms (34% Improvement)
[METRIC_02] UI Render framerate ......... stable at 60fps
[METRIC_03] User conversion rate ....... +4.2% increase week-over-week
[METRIC_04] Token overhead ratio ........ reduced by 18% via system compression
\`\`\`

#### 🚀 Immediate Execution Plan:
1. **Module Registry Checkin:** Optimize lazy loaded modules for active dashboard frames.
2. **Context Window Compression:** Roll out summary chunking middle-layer to mitigate high API usage spikes.
3. **Responsive Flow Polish:** Polish screen bounds for mid-sized tablets and tall mobile views.`,

  'Build a RAG architecture for SMSOFTWARE. What database triggers and indexing frameworks should we utilize?': `### 🔗 RAG (Retrieval-Augmented Generation) Architecture for SMSOFTWARE

Here is a blueprint for implementing high-performance semantic retrieval of knowledge documents for SMSOFTWARE:

#### 📐 Architectural Pipeline Sequence:
1. **Ingestion & Shredding:** Parse dynamic text structures (PDFs, Markdown documentation). Segment documents into chunks of a fixed duration/size (e.g. 500 characters) with a 50-character overlap.
2. **Vector Space Processing:** Convert text into numeric coordinates (embeddings) using your chosen embedding provider or local model.
3. **Storage Index (Vector DB):** Store coordinates inside Pinecone, pgvector on PostgreSQL, or ChromaDB.
4. **Retrieval Trigger:** On incoming chat text, generate a search vector. Pull the **top 4 most relevant chunks** dynamically using Cosine Similarity calculation.
5. **AI Synthesis:** Inject retrieval context into the user query, and request response from the chat assistant.

\`\`\`text
[Incoming Query] ──► [Embed Query] ──► [Cosine Similarity Query in Vector DB] ──┐
                                                                              ▼
[Client Response] ◄── [Summarized Response] ◄── [Model Synthesis] ◄── [Append Top 4 Chunks]
\`\`\`

#### ⚙️ Key Indexing Parameters:
- **Frameworks:** Use langchain or simple custom vector similarity functions.
- **Triggers:** Automatically trigger DB re-embedding routines whenever manuals are edited. This keeps documentation continuously accurate!`
};
