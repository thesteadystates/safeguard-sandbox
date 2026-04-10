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
        className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-gray-200 dark:focus-visible:ring-neutral-400"
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel
              transition
              className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-neutral-900"
            >
              <div className="flex items-start justify-between">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  About Safeguard Sandbox
                </DialogTitle>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 focus-visible:ring-offset-2 dark:text-gray-500 dark:hover:bg-neutral-800 dark:hover:text-gray-400 dark:focus-visible:ring-neutral-400"
                  aria-label="Close dialog"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <section>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    What is this?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Safeguard Sandbox is a playground for experimenting with AI
                    safety classification models. Enter any text content, and
                    the system will analyze it for potential safety violations
                    including harmful content, personal information exposure,
                    and illegal activity.
                  </p>
                </section>

                <section>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    How does it work?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    When you submit content, it is sent to AWS Bedrock where a
                    safety model analyzes it using the system prompt below. The
                    model returns a JSON response indicating whether the content
                    violates any safety policies, along with confidence scores
                    and a rationale for the classification.
                  </p>
                </section>

                <section>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    System Prompt
                  </h4>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 text-xs text-gray-800 dark:bg-neutral-800 dark:text-gray-200">
                      <code>{CONTENT_POLICY_PROMPT}</code>
                    </pre>
                  </div>
                </section>

                <section>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Press{" "}
                    <kbd className="rounded bg-gray-200 px-1 py-0.5 text-gray-700 dark:bg-neutral-700 dark:text-gray-300">
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
