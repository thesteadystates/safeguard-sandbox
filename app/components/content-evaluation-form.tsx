"use client";

import { ArrowPathIcon } from "@heroicons/react/20/solid";

import { modelOptions } from "@/app/constants";
import type { EvalState } from "@/app/types";
import EvalErrors from "@/app/components/eval-errors";
import ModelSwitcher from "@/app/components/model-switcher";

type ContentEvaluationFormProps = {
  formAction: (payload: FormData) => void;
  pending: boolean;
  state: EvalState;
};

export default function ContentEvaluationForm({
  formAction,
  pending,
  state,
}: ContentEvaluationFormProps) {
  return (
    <form
      action={formAction}
      className="relative flex h-full flex-col rounded-xs border-2 border-zinc-950 bg-zinc-0 shadow-[-4px_4px_0_0_var(--zinc-950)]"
    >
      <div className="order-1 inset-x-px absolute top-0">
        <div className="flex items-center justify-between space-x-3 border-b-2 border-zinc-950 bg-zinc-0 px-2 py-2 sm:px-3">
          <ModelSwitcher
            key={state?.model || modelOptions[0].value}
            defaultValue={state?.model || modelOptions[0].value}
            options={modelOptions}
          />
          <div className="shrink-0">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-xs border-2 border-zinc-950 bg-zinc-300 px-3 py-2 text-xs font-mono uppercase tracking-normal text-zinc-950 transition hover:bg-zinc-400 disabled:cursor-not-allowed disabled:border-zinc-500 disabled:bg-zinc-0 disabled:text-zinc-500 sm:text-sm"
            >
              {pending && <ArrowPathIcon className="h-4 w-4 animate-spin" />}
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="order-2 grow bg-zinc-0 outline-0 focus-within:outline focus-within:-outline-offset-1 focus-within:outline-zinc-700">
        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-0.5" />
        </div>
        <label htmlFor="content" className="sr-only">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={2}
          placeholder="Content to verify..."
          className="block h-full w-full resize-none bg-transparent px-4 py-2 text-base text-zinc-950 placeholder:text-zinc-500 focus:outline-none sm:text-sm/6"
          defaultValue={state?.content || ""}
        />
      </div>
      {!!Object.keys(state?.errors || {}).length && (
        <EvalErrors errors={state.errors!} />
      )}
    </form>
  );
}
