import type { ReactNode } from "react";

import Container from "@/app/ui/container";
import Header from "@/app/ui/header";

type ModelOutputProps = {
  output: string | null;
  loading?: boolean;
};

type ModelOutputState = "empty" | "loading" | "ready";

function getModelOutputState(
  output: ModelOutputProps["output"],
  loading: boolean,
): ModelOutputState {
  if (output === null && !loading) {
    return "empty";
  }

  if (loading) {
    return "loading";
  }

  return "ready";
}

export default function ModelOutput({
  output,
  loading = false,
}: ModelOutputProps) {
  const state = getModelOutputState(output, loading);
  let body: ReactNode;

  if (state === "empty") {
    body = (
      <div className="p-2 sm:px-3 text-sm text-gray-500 dark:text-gray-400">
        Submit content to see the model&apos;s assessment
      </div>
    );
  } else if (state === "loading") {
    body = (
      <div className="p-2 sm:px-3">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
        </div>
      </div>
    );
  } else {
    body = (
      <pre className="p-2 sm:px-3 text-sm overflow-auto whitespace-pre-wrap wrap-break-words text-gray-900 dark:text-gray-100">
        {output}
      </pre>
    );
  }

  return (
    <Container className="grow order-1">
      <Header>Model Output</Header>
      {body}
    </Container>
  );
}
