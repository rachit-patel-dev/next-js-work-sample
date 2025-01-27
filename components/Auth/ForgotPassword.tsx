"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// * Third Party
import { toast } from "react-hot-toast";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// * Custom Components
import Input from "../Commons/Input";

// * API
import { forgotPassword } from "@/networks/login";

// * Hooks
import { useApiCall } from "@/hooks/useApiCall";

// * Helpers
import { setLocalstorage } from "@/helpers/utils";

import { ForgotPasswordType } from "@/types";

// * Form validation schema
const schema = yup.object({
  email: yup.string().email("Email format is not valid").required("Email is required"),
});

const ForgotPassword = () => {
  const router = useRouter();
  const { call } = useApiCall();

  const form = useForm<ForgotPasswordType>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const handleForgotPassword = (forgotPasswordMail: ForgotPasswordType) => {
    call(
      () => forgotPassword({ email: forgotPasswordMail.email }),
      (data) => {
        toast.success("Please check your email to reset your password");
        setLocalstorage("changePasswordMail", {
          changePasswordMail: forgotPasswordMail.email,
        });
        router.push("/changepassword");
      },
      (err) => {
        toast.error(err?.message);
      }
    );
  };

  return (
    <>
      <div className="text-xl border-b-2 pb-2 border-[#eaf0f7] font-medium text-[#83b3dc] dark:text-white mb-5">
        <div className="flex gap-3">
          <HiOutlineDesktopComputer color={"#83b3dc"} size={30} />
          Forgot password
        </div>
      </div>
      <form className="flex w-full sm:max-w-md flex-col gap-4" onSubmit={handleSubmit(handleForgotPassword)} noValidate>
        <div className="form-control">
          <Input id="email" type="email" placeholder="Email" register={register} inputName="email" errors={errors} />
        </div>

        <Button type="submit" className="w-full bg-[#83b3dc]" disabled={!isDirty || !isValid}>
          Send Code
        </Button>
      </form>
      <Link href="/login" className="text-[14px] flex gap-3 font-medium text-[#83b3dc] dark:text-white mt-1">
        Back to Login
      </Link>
    </>
  );
};

export default ForgotPassword;
