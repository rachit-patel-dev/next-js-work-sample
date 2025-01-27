import React from "react";

// * Third party
import { Label, TextInput } from "flowbite-react";

// * Types
import { InputPropsType } from "@/types";

const Input: React.FC<InputPropsType> = (props) => {
  const { className, label, placeholder, type, required, id, inputprops, register, inputName, errors } = props;
  return (
    <>
      <div className="relative">
        {label && (
          <div className={`mb-1 mt-2 block ${className || ""}`}>
            <Label htmlFor={id} value={label} />
          </div>
        )}
        <TextInput id={id} type={type || "text"} required={required} placeholder={placeholder} {...inputprops} {...register(inputName)} />
      </div>
      {errors[inputName] && <p className="text-red-500 font-medium">{errors[inputName]?.message as string}</p>}
    </>
  );
};

export default Input;
