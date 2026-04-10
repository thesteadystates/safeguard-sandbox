"use server";

import { z } from "zod";

import {
  CONTENT_POLICY_PROMPT,
  MAX_CONTENT_LENGTH,
  modelOptions,
} from "@/app/constants";
import type { EvalState } from "@/app/types";
import { classifyContent } from "@/lib/bedrock";

const enabledModelValues = modelOptions
  .filter((option) => !option.disabled)
  .map((option) => option.value);

const schema = z.object({
  content: z
    .string()
    .min(1, "Content to verify is required")
    .max(
      MAX_CONTENT_LENGTH,
      `Content must be ${MAX_CONTENT_LENGTH} characters or less`,
    ),
  model: z.enum(enabledModelValues, "Invalid model selected"),
});

export async function createEval(
  initialState: EvalState,
  formData: FormData,
): Promise<EvalState> {
  const validatedFields = schema.safeParse({
    content: formData.get("content"),
    model: formData.get("model"),
  });

  if (!validatedFields.success) {
    return {
      model: formData.get("model") as string,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { content, model } = validatedFields.data;

  try {
    const classification = await classifyContent(
      content,
      model,
      CONTENT_POLICY_PROMPT,
    );

    return {
      content,
      model,
      classification,
    };
  } catch (error) {
    console.error("Error calling Bedrock API:", error);

    return {
      content,
      model,
      errors: {
        general:
          "We couldn't process your request right now. Please try again later.",
      },
    };
  }
}
