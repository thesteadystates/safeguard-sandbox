"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CONTENT_POLICY_PROMPT } from "@/app/constants";

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-xs border-2 border-zinc-950 bg-zinc-0 p-2 text-zinc-950 hover:bg-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700"
        aria-label="Learn more about this site"
      >
        <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
        aria-labelledby="modal-title"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-zinc-950/40 transition duration-300 ease-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel
              transition
              className="w-full max-w-3xl transform overflow-hidden rounded-xs border-2 border-zinc-950 bg-zinc-0 p-6 text-left align-middle shadow-[-6px_6px_0_0_var(--zinc-950)] transition-all duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              <div className="flex items-start justify-between">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold uppercase"
                  id="modal-title"
                >
                  About Safeguard Sandbox
                </DialogTitle>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xs border-2 border-zinc-950 p-1 text-zinc-950 hover:bg-zinc-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700"
                  aria-label="Close dialog"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <section>
                  <h4 className="mb-2 text-sm font-semibold uppercase">What is this?</h4>
                  <p className="text-sm text-zinc-950/80">
                    Safeguard Sandbox is a playground for experimenting with AI
                    safety classification models. Enter any text content, and
                    the system will analyze it for potential safety violations
                    including harmful content, personal information exposure,
                    and illegal activity.
                  </p>
                </section>

                <section>
                  <h4 className="mb-2 text-sm font-semibold uppercase">How does it work?</h4>
                  <p className="text-sm text-zinc-950/80">
                    When you submit content, it is sent to AWS Bedrock where a
                    safety model analyzes it using the system prompt below. The
                    model returns a human-readable assessment of whether the
                    content violates any safety policies, with supporting
                    reasoning.
                  </p>
                </section>

                <section>
                  <h4 className="mb-2 text-sm font-semibold uppercase">System Prompt</h4>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-xs border-2 border-zinc-950 bg-white p-4 text-xs text-zinc-950">
                      <code>{CONTENT_POLICY_PROMPT}</code>
                    </pre>
                  </div>
                </section>

                <section>
                  <p className="text-xs text-zinc-950/70">
                    Press{" "}
                    <kbd className="rounded-xs border border-zinc-950 bg-zinc-250 px-1 py-0.5 text-zinc-950">
                      Esc
                    </kbd>{" "}
                    to close this dialog, or click outside the modal.
                  </p>
                </section>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
