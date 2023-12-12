"use client";

import { USUAL_BTN } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IFormInput {
  email: string;
  password: string;
}

export const Form = ({
  name,
  title,
  callback,
}: {
  name: string;
  title: string;
  callback: SubmitHandler<IFormInput>;
}) => {
  const dict = useDict();
  const getCharacterValidationError = (str: string) => {
    return `${dict.passwordWrong} ${str}`;
  };
  const schema = yup.object().shape({
    email: yup
      .string()
      .required(dict.emailRequired)
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, dict.emailWrong),
    password: yup
      .string()
      .required(dict.passwordRequired)
      .matches(/[0-9]/, getCharacterValidationError(dict.digit))
      .matches(
        /[A-Za-z\^\u0000-\u007F]/,
        getCharacterValidationError(dict.letter)
      )
      .matches(/[\W|_/g]/, getCharacterValidationError(dict.specialCharacter))
      .min(8, dict.minLength),
  });
  const {
    register,
    formState,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col gap-5 justify-center px-6 py-12 lg:px-8 w-1/4">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          {title}
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(callback)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                {dict.emailField}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  defaultValue=""
                  {...register("email")}
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md border-0  py-1.5  shadow-sm  sm:text-sm sm:leading-6"
                />
                <div className=" h-5">
                  {errors.email && (
                    <p className=" text-xs text-[#f6009c]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 "
                >
                  {dict.passwordField}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  defaultValue=""
                  {...register("password")}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm  sm:text-sm sm:leading-6"
                />
                <div className=" h-5">
                  {errors.password && (
                    <p className=" text-xs text-[#f6009c]">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={USUAL_BTN}
                disabled={!formState.isValid}
              >
                {name}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
