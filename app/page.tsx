"use client";

import { useActionState } from "react";

import { createEval } from "@/app/actions";
import ModelOutput from "@/app/components/model-output";
import ContentEvaluationForm from "@/app/components/content-evaluation-form";

const initialState = {
  errors: {},
};

export default function Home() {
  const [state, formAction, pending] = useActionState(createEval, initialState);

  return (
    <div className="flex w-full flex-1 min-h-0 flex-col">
      <div className="flex h-full min-h-0 flex-1 flex-col gap-3 sm:flex-row">
        <div className="mx-auto min-h-0 w-full flex-1">
          <ContentEvaluationForm
            formAction={formAction}
            pending={pending}
            state={state}
          />
        </div>
        <div className="mx-auto min-h-0 w-full flex-1">
          <div className="relative flex h-full min-h-0 flex-col">
            <ModelOutput output={state.modelOutput ?? null} loading={pending} />
          </div>
        </div>
      </div>
    </div>
  );
}
