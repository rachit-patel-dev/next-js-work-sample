"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// * Third Party
import { Button } from "flowbite-react";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiHide, BiShowAlt } from "react-icons/bi";
import * as yup from "yup";

// * Custom Components
import Input from "../Commons/Input";

// * API
import { login } from "@/networks/login";

// * Hooks
import { useApiCall } from "@/hooks/useApiCall";

// * Helpers
import { constants } from "@/helpers/constants";

import { LoginRequestType } from "@/types";

// * Form validation schema
const schema = yup.object({
  email: yup.string().email("Email format is not valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const { call } = useApiCall();
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const form = useForm<LoginRequestType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const handleLogin = (data: LoginRequestType) => {
    call(
      () => login({ email: data.email, password: data.password }),
      (data) => {
        localStorage.setItem(constants.LOGIN_TOKEN, data.results.access_token);
        toast.success("Login Successful");
        router.push("/caregiver-dashboard");
      }
    );
  };

  console.log(errors);

  return (
    <>
      {/* Text */}
      <div className="text-xl border-b-2 pb-2 border-[#eaf0f7] font-medium text-[#83b3dc]  mb-5">
        <div className="flex gap-3 ">
          <HiOutlineDesktopComputer color={"#83b3dc"} size={30} />
          Sign In
        </div>
      </div>

      {/* Login Form */}
      <form className="flex w-full sm:max-w-md flex-col gap-4" onSubmit={handleSubmit(handleLogin)} noValidate>
        <div className="form-control">
          <Input id="email" type="email" placeholder="Email" register={register} inputName="email" errors={errors} />
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

        <Button disabled={!isDirty || !isValid} type="submit" className="w-full bg-[#83b3dc]">
          Login
        </Button>
      </form>
      <Link href="forgotpassword" className="text-[14px] flex gap-3 font-medium text-[#83b3dc] dark:text-white mt-1">
        Forgot your password?
      </Link>
    </>
  );
};
