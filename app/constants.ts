export type ModelOption = {
  value: string;
  title: string;
  description: string;
  current: boolean;
  disabled?: boolean;
};

export const modelOptions: ModelOption[] = [
  {
    value: "openai.gpt-oss-safeguard-20b",
    title: "gpt-oss-safeguard-20b",
    description:
      "Lower-latency GPT OSS safeguard model for fast safety checks.",
    current: true,
  },
  {
    value: "openai.gpt-oss-safeguard-120b",
    title: "gpt-oss-safeguard-120b",
    description:
      "Highest-capacity GPT OSS safeguard model for nuanced safety classification.",
    current: false,
  },
];

export const CONTENT_POLICY_PROMPT = `INSTRUCTIONS: Classify user-generated comments for safety violations.

DEFINITIONS:
- Harmful Content (H): Promotes violence, hate speech, harassment, or self-harm
- Personal Information (P): Contains PII like phone numbers, addresses, SSNs, credit cards
- Illegal Activity (I): Solicits, promotes, or describes illegal acts

VIOLATES:
H1: Direct threats of violence against individuals or groups
H2: Hate speech targeting protected characteristics (race, religion, gender, etc.)
H3: Instructions for self-harm or suicide
P1: Full phone numbers, email addresses, physical addresses
P2: Government IDs, credit card numbers, credentials
I1: Solicitation of illegal drugs, weapons, or services
I2: Instructions for illegal activities

SAFE:
- News discussion, educational content, or historical references
- Redacted/partial PII (e.g., "call me at 555-...")
- Discussion of legal reform or policy debates

Provide a concise, human-readable assessment that states whether the content violates the policy, references any relevant category codes when applicable, and explains your reasoning in 2-4 sentences.

Formatting requirements:
- Respond in plain text only.
- Do not use Markdown formatting (for example: **bold**, headings, bullet lists, or code blocks).
- Write the response as a single paragraph.`;

export const MAX_CONTENT_LENGTH = 5000;
