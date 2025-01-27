"use client";

// * Third Party
import { Label, Select } from "flowbite-react";

// * Helpers
import { SelectInputType } from "@/types";

function SelectInput({ label, options }: SelectInputType) {
  return (
    <div
      className="max-w-md flex justify-center w-full
      items-center gap-x-2 mx-auto py-4 pb-6
    "
    >
      <div
        className="mb-2 inline
      "
      >
        <Label htmlFor="period" value={`${label}:`} />
      </div>
      <Select id="period" required>
        {options.map((currOption, index) => {
          return <option key={index}>{currOption}</option>;
        })}
      </Select>
    </div>
  );
}

export default SelectInput;
