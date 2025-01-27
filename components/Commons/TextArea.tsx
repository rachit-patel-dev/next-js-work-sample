"use client";

// * Third Party
import { Label, Textarea } from "flowbite-react";

// * Helpers
import { TextAreaPropsType } from "@/types";

const TextArea: React.FC<TextAreaPropsType> = (props) => {
  const { className, label, placeholder, required, id, inputprops, inputName, register, errors } = props;
  return (
    <>
      {label && (
        <div className={`mb-1 mt-2 block ${className || ""}`}>
          <Label htmlFor={id} value={label} />
        </div>
      )}

      <Textarea required={required} placeholder={placeholder} {...inputprops} {...register(inputName)} />

      {errors[inputName] && <p className="text-red-500 font-medium">{errors[inputName]?.message as string}</p>}
    </>
  );
};

export default TextArea;
