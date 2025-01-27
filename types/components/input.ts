// * Third Party
import type { TextInputProps } from "flowbite-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface InputPropsType extends TextInputProps {
  label?: string;
  icon?: any;
  inputprops?: React.InputHTMLAttributes<HTMLInputElement>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  inputName: string;
}

export interface TextAreaPropsType extends TextInputProps {
  label?: string;
  icon?: any;
  inputprops?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  inputName: string;
}

export interface SelectInputType {
  label: string;
  options: string[];
}
