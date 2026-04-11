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
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="h-full sm:grow xs:flex-col sm:flex">
        <div className="h-1/2 sm:h-full mx-auto sm:w-1/2 p-2">
          <ContentEvaluationForm
            formAction={formAction}
            pending={pending}
            state={state}
          />
        </div>
        <div className="mx-auto sm:w-1/2 p-2">
          <div className="h-full relative flex flex-col">
            <ModelOutput output={state.modelOutput ?? null} loading={pending} />
          </div>
        </div>
      </div>
    </div>
  );
}
