import Container from "@/app/ui/container";
import Header from "@/app/ui/header";

type ModelOutputProps = {
  output: string | null;
  loading?: boolean;
};

export default function ModelOutput({
  output,
  loading = false,
}: ModelOutputProps) {
  // Empty state - no evaluation run yet
  if (!output && !loading) {
    return (
      <Container className="grow order-1">
        <Header>Model Output</Header>
        <div className="p-2 sm:px-3 text-sm text-gray-500 dark:text-gray-400">
          Submit content to see the model&apos;s assessment
        </div>
      </Container>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Container className="grow order-1">
        <Header>Model Output</Header>
        <div className="p-2 sm:px-3">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="grow order-1">
      <Header>Model Output</Header>
      <pre className="p-2 sm:px-3 text-sm overflow-auto whitespace-pre-wrap break-words text-gray-900 dark:text-gray-100">
        {output}
      </pre>
    </Container>
  );
}
