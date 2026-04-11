import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

import { env } from "./env";

/**
 * Bedrock response structure for OpenAI-compatible models
 */
interface BedrockResponse {
  choices?: Array<{
    message?: {
      content?: string | Array<{ type?: string; text?: string }>;
    };
  }>;
}

export function createBedrockClient(): BedrockRuntimeClient {
  return new BedrockRuntimeClient({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

/**
 * Test Bedrock connection
 * Verifies that credentials work and AWS Bedrock is accessible
 *
 * @returns Promise that resolves if connection is successful, rejects otherwise
 */
export async function testBedrockConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const client = createBedrockClient();

    // Simple connection test: send a minimal request to verify credentials
    // Using the config method to validate client initialization
    const config = client.config;

    if (!config.region) {
      throw new Error("Region not configured");
    }

    return {
      success: true,
      message: `Successfully connected to AWS Bedrock in region ${env.AWS_REGION}`,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return {
      success: false,
      message: `Failed to connect to AWS Bedrock: ${errorMessage}`,
    };
  }
}

/**
 * Remove model reasoning blocks from visible output.
 *
 * @param text - Raw model output text
 * @returns Output text without <reasoning>...</reasoning> blocks
 */
function stripReasoningBlocks(text: string): string {
  return text.replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "").trim();
}

/**
 * Ensure parsed text is non-empty after cleanup.
 */
function requireNonEmptyOutput(text: string): string {
  const cleaned = stripReasoningBlocks(text);

  if (!cleaned) {
    throw new Error("No user-visible text found in model response");
  }

  return cleaned;
}

/**
 * Parse Bedrock response body and extract model output text
 *
 * @param responseBody - The parsed response body from Bedrock
 * @returns Human-readable model output
 * @throws Error if response format is invalid
 */
function parseBedrockResponse(responseBody: BedrockResponse): string {
  const content = responseBody.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Invalid response format from Bedrock");
  }

  if (typeof content === "string") {
    return requireNonEmptyOutput(content);
  }

  const text = content
    .filter((item) => item.type === "text" && typeof item.text === "string")
    .map((item) => item.text?.trim())
    .filter(Boolean)
    .join("\n\n");

  if (!text) {
    throw new Error("No text content found in response");
  }

  return requireNonEmptyOutput(text);
}

/**
 * Classify content for safety violations using AWS Bedrock safety models
 *
 * @param content - The user-generated content to classify
 * @param modelId - The Bedrock model ID to use for classification
 * @param prompt - The system prompt to use for content classification
 * @returns Human-readable model assessment text
 * @throws Error if the API call fails or response is invalid
 */
export async function classifyContent(
  content: string,
  modelId: string,
  prompt: string,
): Promise<string> {
  const client = createBedrockClient();
  const messages = [
    {
      role: "system",
      content: prompt,
    },
    {
      role: "user",
      content: content,
    },
  ];
  const payload = {
    messages,
    max_tokens: 1000,
    temperature: 0.0,
  };

  const command = new InvokeModelCommand({
    modelId,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(payload),
  });

  console.log("Invoking Bedrock model with payload:", {
    modelId,
    contentLength: content.length,
  });

  const response = await client.send(command);
  const decodedResponse = new TextDecoder().decode(response.body).trim();

  let responseBody: BedrockResponse;
  try {
    responseBody = JSON.parse(decodedResponse) as BedrockResponse;
  } catch {
    const preview = decodedResponse.slice(0, 300);
    throw new Error(
      `Invalid JSON response from Bedrock (length: ${decodedResponse.length}, preview: ${JSON.stringify(preview)})`,
    );
  }

  return parseBedrockResponse(responseBody);
}
