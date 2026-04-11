import { XCircleIcon } from "@heroicons/react/20/solid";

export default function EvalErrors({
  errors,
}: {
  errors: Record<string, string | string[]>;
}) {
  const allErrors = Object.values(errors).flatMap((error) =>
    Array.isArray(error) ? error : [error],
  );
  const count = allErrors.length;

  return (
    <div className="absolute bottom-0 w-full border-t-2 border-zinc-950 bg-zinc-150 p-4">
      <div className="flex">
        <div className="shrink-0">
          <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-zinc-950">
            {count === 1 ? "There was 1 error" : `There were ${count} errors`}
          </h3>
          <div className="mt-2 text-sm text-zinc-950/85">
            <ul role="list" className="list-disc space-y-1 pl-5">
              {allErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
