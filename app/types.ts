export type EvalState = {
  content?: string;
  model?: string;
  modelOutput?: string;
  errors?: Record<string, string | string[]>;
};
