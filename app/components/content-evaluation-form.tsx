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
      className="h-full relative flex flex-col border-r-8 border-b-8 border-gray-200 rounded-lg dark:border-white/5 dark:bg-neutral-900"
    >
      <div className="order-1 inset-x-px absolute top-0">
        <div className="flex items-center justify-between space-x-3 border-b border-gray-200 px-2 py-2 sm:px-3 dark:border-white/10">
          <ModelSwitcher
            key={state?.model || modelOptions[0].value}
            defaultValue={state?.model || modelOptions[0].value}
            options={modelOptions}
          />
          <div className="shrink-0">
            <button
              type="submit"
              disabled={pending}
              className="rounded-md inline-flex items-center gap-2 bg-neutral-600 px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-500 dark:hover:bg-neutral-400 dark:focus-visible:outline-neutral-500"
            >
              {pending && <ArrowPathIcon className="h-4 w-4 animate-spin" />}
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="order-2 grow bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-neutral-600 dark:bg-neutral-800/50 dark:outline-white/10 dark:focus-within:outline-neutral-500">
        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
        </div>
        <label htmlFor="content" className="sr-only">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={2}
          placeholder="Content to verify..."
          className="block h-full w-full resize-none px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:text-white dark:placeholder:text-gray-500"
          defaultValue={state?.content || ""}
        />
      </div>
      {!!Object.keys(state?.errors || {}).length && (
        <EvalErrors errors={state.errors!} />
      )}
    </form>
  );
}
