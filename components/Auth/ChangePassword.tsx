"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// * Third Party
import { Button } from "flowbite-react";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// * API
import { changePassword } from "@/networks/login";

// * Hooks
import { useApiCall } from "@/hooks/useApiCall";

// * Helpers
import { ChangePasswordType } from "@/types";
import { getLocalstorage } from "@/helpers/utils";
import { passwordRegex } from "@/helpers/constants";
import { BiHide, BiShowAlt } from "react-icons/bi";

// * Form validation schema
const schema = yup.object({
  email: yup.string().email("Email format is not valid").required("Email is required"),
  code: yup
    .string()
    .required("Code is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits"),
  password: yup.string().required("Password is required").matches(passwordRegex, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
});

const ChangePassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const router = useRouter();
  const { call } = useApiCall();

  const form = useForm<ChangePasswordType>({
    defaultValues: {
      email: email,
      password: "",
      code: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors, isDirty, isValid } = formState;

  const handlePasswordChange = (data: ChangePasswordType) => {
    call(
      () =>
        changePassword({
          email: email,
          password: data.password,
          code: data.code,
        }),
      (data) => {
        toast.success("Password Changed successfully");
        router.push("/login");
      },
      (err) => {
        toast.error(err.message);
      }
    );
  };

  useEffect(() => {
    const emailValue = getLocalstorage("changePasswordMail").changePasswordMail;
    setValue("email", emailValue);
    setEmail(emailValue);
  }, []);

  return (
    <>
      <div className="text-xl border-b-2 pb-2 border-[#eaf0f7] font-medium text-[#83b3dc] dark:text-white mb-5">
        <div className="flex gap-3">
          <HiOutlineDesktopComputer color={"#83b3dc"} size={30} />
          Change Password
        </div>
      </div>
      <form className="flex w-full sm:max-w-md flex-col gap-4" onSubmit={handleSubmit(handlePasswordChange)} noValidate>
        <div className="form-control">
          <input className={`bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} id="email" type="email" placeholder="Email" value={email} disabled {...register("email")} />
        </div>
        <div className="form-control">
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " type="text" maxLength={6} minLength={6} id="code" placeholder="Enter 6-digit code" {...register("code")} />
          {errors["code"] && <p className="text-red-500 font-medium">{errors["code"]?.message as string}</p>}
        </div>
        <div className="form-control w-full">
          <div className="relative">
            <input id="password" className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg" type={isPasswordVisible ? "text" : "password"} placeholder="Password" {...register("password")} />
            <button type="button" className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <BiShowAlt /> : <BiHide />}
            </button>
          </div>

          {errors["password"] && <p className="text-red-500 font-medium">{errors["password"]?.message as string}</p>}
        </div>

        <Button type="submit" className="w-full bg-[#83b3dc]" disabled={!isDirty || !isValid}>
          Change Password
        </Button>
      </form>
    </>
  );
};

export default ChangePassword;
