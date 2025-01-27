import React from "react";

// * Third Party
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";

// * Custom Components
import Input from "@/components/Commons/Input";
import TextArea from "@/components/Commons/TextArea";

// * Helpers
import { phoneRegex } from "@/helpers/constants";

import { PatientInformationType } from "@/types";

// * CSS
import "react-phone-input-2/lib/style.css";

const schema = yup.object({
  name: yup.string(),
  allergies: yup.string(),
  dnr: yup.string(),
  emergencyContact: yup.string(),
  caseManager: yup.string(),
  address: yup.string(),
  instructions: yup.string(),
  admissionComments: yup.string(),
  homeNumber: yup.string(),
  mobileNumber: yup.string(),
  otherNumber: yup.string(),
});

interface PatientInformationPropType {
  handleClose: () => void;
}

const PatientInformation = ({ handleClose }: PatientInformationPropType) => {
  const form = useForm<PatientInformationType>({
    defaultValues: {
      name: "",
      allergies: "",
      dnr: "",
      emergencyContact: "",
      caseManager: "",
      address: "",
      instructions: "",
      admissionComments: "",
      homeNumber: "",
      mobileNumber: "",
      otherNumber: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, control, clearErrors, setError, setValue } = form;
  const { errors, isDirty } = formState;

  const handlePatientInformation = (data: PatientInformationType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handlePatientInformation)} noValidate>
      <Input label="Name" type="text" register={register} inputName="name" errors={errors} />
      <TextArea label="Allergies" register={register} inputName="allergies" errors={errors} />
      <Input label="DNR" type="text" register={register} inputName="dnr" errors={errors} />
      <Input label="Emergency Contact" type="text" register={register} inputName="emergencyContact" errors={errors} />
      <Input label="Case Manager" type="text" register={register} inputName="caseManager" errors={errors} />
      <TextArea label="Address" register={register} inputName="address" errors={errors} />
      <TextArea label="Instructions" register={register} inputName="instructions" errors={errors} />
      <div className="mb-10">
        <Controller
          name="homeNumber"
          control={control}
          render={({ field: { onBlur, value } }) => (
            <PhoneInput
              country={"us"}
              value={value}
              specialLabel={"Home Phone"}
              inputClass={`form-control block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg`}
              buttonClass={"custom-phone-button"}
              dropdownClass={"custom-dropdown"}
              searchClass={"search-field"}
              placeholder={""}
              onChange={(value) => {
                if (value?.trim().match(phoneRegex) || value?.trim() === "") {
                  clearErrors("homeNumber");
                  setValue("homeNumber", value, { shouldValidate: true });
                } else {
                  setError("homeNumber", {
                    type: "custom",
                    message: "Phone number is not valid",
                  });
                }
              }}
              onBlur={onBlur}
            />
          )}
        />
        {errors.homeNumber && <p className="text-red-500 font-medium phone-input-error ">{errors.homeNumber.message}</p>}
      </div>
      <div className="my-10">
        <Controller
          name="mobileNumber"
          control={control}
          render={({ field: { onBlur, value } }) => (
            <PhoneInput
              country={"us"}
              value={value}
              specialLabel={"Mobile Phone"}
              inputClass={`form-control block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg`}
              buttonClass={"custom-phone-button"}
              dropdownClass={"custom-dropdown"}
              searchClass={"search-field"}
              placeholder={""}
              onChange={(value) => {
                if (value?.trim().match(phoneRegex) || value?.trim() === "") {
                  clearErrors("mobileNumber");
                  setValue("mobileNumber", value, { shouldValidate: true });
                } else {
                  setError("mobileNumber", {
                    type: "custom",
                    message: "Phone number is not valid",
                  });
                }
              }}
              onBlur={onBlur}
            />
          )}
        />
        {errors.mobileNumber && <p className="text-red-500 font-medium phone-input-error">{errors.mobileNumber.message}</p>}
      </div>

      <div className="my-10">
        <Controller
          name="otherNumber"
          control={control}
          render={({ field: { onBlur, value } }) => (
            <PhoneInput
              country={"us"}
              value={value}
              specialLabel={"Other Phone"}
              inputClass={`form-control block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg`}
              buttonClass={"custom-phone-button"}
              dropdownClass={"custom-dropdown"}
              searchClass={"search-field"}
              placeholder={""}
              onChange={(value) => {
                if (value?.trim().match(phoneRegex) || value?.trim() === "") {
                  clearErrors("otherNumber");
                  setValue("otherNumber", value, { shouldValidate: true });
                } else {
                  setError("otherNumber", {
                    type: "custom",
                    message: "Phone number is not valid",
                  });
                }
              }}
              onBlur={onBlur}
            />
          )}
        />
        {errors.otherNumber && <p className="text-red-500 font-medium phone-input-error">{errors.otherNumber.message}</p>}
      </div>

      <TextArea label="Admission Comments" register={register} inputName="admissionComments" errors={errors} />
      <div className="flex gap-2 justify-end mt-5">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded " disabled={Object.keys(errors).length > 0 || !isDirty}>
          Submit
        </button>
        <button type="button" onClick={() => handleClose()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </form>
  );
};

export default PatientInformation;
