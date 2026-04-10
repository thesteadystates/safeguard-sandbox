# Safeguard Sandbox

## Prerequisites

- AWS service account with access to AWS Bedrock
- AWS credentials with IAM permissions to invoke Bedrock models

## Supported Models

- `openai.gpt-oss-safeguard-20b` (default, lower latency)
- `openai.gpt-oss-safeguard-120b` (higher-capacity reasoning)

## Environment Setup

### 1. Configure Environment Variables

Create a `.env.local` file in the project root with your AWS credentials:

```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
```

**Important**: Never commit `.env.local` to version control. This file is already in `.gitignore`.

### 2. Test Your Connection

Run the Bedrock connection test to verify your credentials:

```bash
pnpm test:bedrock
```

You should see:

```
✓ Connection test passed!
  Successfully connected to AWS Bedrock in region us-east-1
```

If the test fails, verify:

- Your `.env.local` file exists and contains all three required variables
- Your AWS credentials are valid

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://safeguard-sandbox.localhost:3000](http://safeguard-sandbox.localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Roboto from Google Fonts.

## Available Scripts

```bash
# Start development server
pnpm dev

# Run linter
pnpm lint

# Format code with Prettier
pnpm prettier

# Test AWS Bedrock connection
pnpm test:bedrock
```
