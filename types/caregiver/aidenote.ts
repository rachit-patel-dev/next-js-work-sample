import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface AideNoteFormDataType {
  "nutrition-hydration--1": string;
  "nutrition-hydration--2": string;
  "house-keeping--1": string;
  "house-keeping--2": string;
  "custom-tasks--1": string;
}

export type classNameType =
  | "nutrition-hydration--1"
  | "nutrition-hydration--2"
  | "house-keeping--1"
  | "house-keeping--2"
  | "custom-tasks--1";

export interface AideNotePropType {
  register: UseFormRegister<AideNoteFormDataType>;
  errors: FieldErrors<AideNoteFormDataType>;
  title?: string;
  taskTitleMain: string;
  taskTitleSub?: string;
  taskTitleFrequency: string;
  class: classNameType;
  specialNotes: {
    note: string | null;
  };
}

export interface AideNoteSectionPropType {
  childCloseHandler: () => void;
}
