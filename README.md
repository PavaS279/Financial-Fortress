# Financial Fortress

This is a Next.js starter project built in Firebase Studio, designed to be a comprehensive financial safety and analysis tool.

## Project Description

### Summary of Features and Functionality

Financial Fortress is a web application designed to empower users with AI-driven tools to navigate the complexities of personal finance securely. The application provides a suite of analysis tools to help users detect scams, understand complex financial documents, and learn from a community of users.

-   **Dashboard:** A central hub providing a snapshot of the user's financial safety, including an overall risk score, recent activity, and quick access to all analysis tools.
-   **UPI Scam Detector:** An AI-powered tool that analyzes UPI transaction details for signs of fraudulent activity, providing a risk score, a breakdown of red flags, and actionable recommendations.
-   **Loan Analyzer:** An intelligent tool to evaluate loan agreements. It identifies hidden charges, unfavorable clauses, and provides a market comparison to help users negotiate better terms.
-   **Insurance Policy Decoder:** Simplifies complex insurance jargon by summarizing policy documents into plain language, highlighting key coverages, exclusions, and the claims process.
-   **Community Hub:** A collaborative space where users can anonymously share and view scam reports, helping to build a collective defense against financial fraud.
-   **User Settings & History:** Users can manage their preferences and review a comprehensive history of all the financial checks they have performed within the app.

### Technologies Used

The application is built on a modern, robust, and scalable technology stack:

-   **Frontend Framework:** Next.js with the App Router, utilizing React and TypeScript for building a fast and type-safe user interface.
-   **Styling:** Tailwind CSS for utility-first styling, with ShadCN UI for a consistent and professional component library.
-   **AI Orchestration:** Google's Genkit is used to define, run, and manage the AI-powered "flows" that communicate with the language model.
-   **AI Model:** Google's Gemini (`googleai/gemini-2.5-flash`) is the core AI model used for all analysis and summarization tasks.
-   **Schema Definition:** Zod is used for defining and validating the data structures for both the input and the structured JSON output from the AI model, ensuring data integrity.
-   **Backend & Database:** The application is architected to use Firebase for user authentication and Firestore for data storage, as defined in `docs/backend.json`.

### Findings and Learnings

Throughout the development and debugging process, several key learnings emerged:

1.  **Explicit AI Configuration is Crucial:** The most significant challenge was the recurring `INVALID_ARGUMENT: Must supply a 'model' to 'generate()' calls` and `NOT_FOUND: Model ... not found` errors. We learned that relying on implicit model resolution was unreliable. The definitive solution was to explicitly set a default model in the Genkit initialization file (`src/ai/genkit.ts`) using a fully-qualified model name like `'googleai/gemini-2.5-flash'`. This ensures that all AI flows have a valid, unambiguous model to execute against.

2.  **Environment Variables are Key:** Securely managing the `GEMINI_API_KEY` in the `.env` file is a best practice. The Genkit `googleAI()` plugin automatically detects this variable, simplifying authentication. We also learned that additional flags, like `GOOGLE_GENAI_USE_VERTEXAI = FALSE`, can be necessary to direct the plugin to the correct Google AI service endpoint.

3.  **Structured AI with Zod:** Using Zod to define input and output schemas for Genkit flows is incredibly powerful. It forces the AI to return predictable, structured JSON, which eliminates the need for fragile string parsing on the frontend and makes the AI's response easy and safe to work with.

4.  **Iterative Debugging:** Solving the persistent model error required a systematic process of elimination. By trying different model names, API keys, and finally focusing on the Genkit initialization, we were able to pinpoint the root cause in the configuration rather than the individual AI flows.