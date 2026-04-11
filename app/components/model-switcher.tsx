"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import type { ModelOption } from "@/app/constants";

interface Props {
  defaultValue: string;
  options: ModelOption[];
}

export default function ModelSwitcher({ defaultValue, options }: Props) {
  return (
    <Listbox name="model" defaultValue={defaultValue}>
      {({ value }) => (
        <>
          <Label className="sr-only">Change model</Label>
          <div className="relative">
            <div className="inline-flex divide-x-2 divide-zinc-950 rounded-xs border-2 border-zinc-950">
              <div className="inline-flex items-center gap-x-1.5 rounded-l-[1px] bg-zinc-250 px-3 py-2 text-zinc-950">
                <CheckIcon aria-hidden="true" className="-ml-0.5 size-5" />
                <p className="text-xs sm:text-sm font-mono uppercase">
                  {options.find((option) => option.value === value)?.title}
                </p>
              </div>
              <ListboxButton className="inline-flex items-center rounded-l-none rounded-r-[1px] bg-zinc-300 p-2 hover:bg-zinc-400 focus-visible:outline-2 focus-visible:outline-zinc-700">
                <span className="sr-only">Change model</span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 text-zinc-950 forced-colors:text-[Highlight]"
                />
              </ListboxButton>
            </div>

            <ListboxOptions
              transition
              className="absolute left-0 z-10 mt-2 w-80 origin-top-right divide-y-2 divide-zinc-950 overflow-hidden rounded-xs border-2 border-zinc-950 bg-zinc-0 shadow-[-4px_4px_0_0_var(--zinc-950)] data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0"
            >
              {options.map((option) => (
                <ListboxOption
                  key={option.title}
                  value={option.value}
                  disabled={option.disabled}
                  className="group cursor-default p-4 text-sm text-zinc-950 select-none data-focus:bg-zinc-300"
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <p className="font-normal group-data-selected:font-semibold group-data-selected:font-mono group-data-selected:uppercase">
                        {option.title}
                      </p>
                      <span className="text-zinc-950 group-not-data-selected:hidden">
                        <CheckIcon aria-hidden="true" className="size-5" />
                      </span>
                    </div>
                    <p className="mt-2 text-zinc-950/70">
                      {option.description}
                    </p>
                  </div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </>
      )}
    </Listbox>
  );
}
