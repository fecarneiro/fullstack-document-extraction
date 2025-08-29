# Next.js OpenAI Document Extraction

A Next.js-based web application for extracting structured data from documents using OpenAI's GPT models. This project allows users to upload documents (e.g., PDFs, images) and retrieve specific information in JSON format, such as dates, names, values, and locations.

## Features

- **File Upload**: Securely upload documents via a REST API endpoint.
- **AI-Powered Extraction**: Leverages OpenAI's GPT-4o-mini model for accurate data parsing.
- **Customizable Prompts**: Easily modify the extraction instructions to target any desired fields or information.
- **JSON Output**: Returns structured data in a predefined JSON schema.
- **Next.js Framework**: Built with Next.js for fast, scalable fullstack development.
- **TypeScript Support**: Fully typed for better development experience.

## Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun
- OpenAI API key (set in environment variables)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd nextjs-openai-doc-extraction
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. Upload a document via the frontend or API.
2. The system extracts data based on the configured prompt.
3. Receive JSON output with fields like emission date, beneficiary details, goods info, origin, and destination.

### Customizing Extraction Prompts

To extract different information, modify the `instructions` variable in [`src/app/api/upload/route.ts`](src/app/api/upload/route.ts). For example, change the fields in the prompt to target new data points, and update the expected JSON schema accordingly.

Example customization:

```typescript
const instructions = `
Extract from this document:
- Custom field 1
- Custom field 2

Response must be JSON in this format:
{
  "custom_field_1": "",
  "custom_field_2": ""
}
`;
```

## API Endpoints

### POST /api/upload

Uploads a file and extracts data.

- **Request**: Multipart form data with a `file` field.
- **Response**: JSON object with extracted data or error.

Example using curl:

```bash
curl -X POST -F "file=@document.pdf" http://localhost:3000/api/upload
```

## Build and Deployment

To build for production:

```bash
npm run build
```

Deploy on Vercel:

1. Push to GitHub.
2. Connect to Vercel and deploy.

For more details, see [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
