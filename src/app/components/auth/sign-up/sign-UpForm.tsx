"use client";
import React, { startTransition, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { SignInSchema, SignUpSchema } from "../../../lib/schema/auth/zodAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { TEST, TEST1 } from "../../../../../server/test";
import { RxAvatar } from "react-icons/rx";
import { Checkbox, Link, Spinner } from "@nextui-org/react";
import { SlLockOpen } from "react-icons/sl";
import { SlLock } from "react-icons/sl";
import { motion } from "framer-motion";
import { ImMail4 } from "react-icons/im";
import SubSignUp from "./subBtnSignUp";
import FormError from "../../stateForm/form-error";
import FormSuccess from "../../stateForm/form-success";
import { useRouter } from "next/navigation";
import { elysia } from "../../../../../elysia/client";
import axios from "axios";

function SignUpForm() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isDirty, isValid },
  } = form;

  const [isPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isError, setIserror] = useState(false);

  const toggleShowPassword = () => setShowPassword((v) => !v);
  const route = useRouter();
  const onSubmit = (value: z.infer<typeof SignUpSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await axios.post("/api/auth/sign-up", value);
        if (response.data.success) {
          setSuccess(response.data.success);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.error;
          setError(message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    });
  };

  return (
    <div className="w-full h-full items-center justify-center mt-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="xsm:max-w-md  xl:max-w-xs 3xl:max-w-md lg:max-w-xs">
          <div className="space-y-4 ">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      errorMessage={form.formState.errors.username?.message}
                      isInvalid={!!form.formState.errors.username}
                      color="primary"
                      radius="full"
                      size="lg"
                      classNames={{
                        inputWrapper: "bg-blue-input/60 ring-2 ",
                      }}
                      {...field}
                      startContent={
                        <RxAvatar size={30} className="text-sky-600/60" />
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      errorMessage={form.formState.errors.email?.message}
                      isInvalid={!!form.formState.errors.email}
                      color="primary"
                      radius="full"
                      size="lg"
                      classNames={{
                        inputWrapper: "bg-blue-input/60 ring-2 ",
                      }}
                      {...field}
                      startContent={
                        <ImMail4 size={30} className="text-sky-600/60" />
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex space-x-6 ">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        color="primary"
                        radius="full"
                        size="lg"
                        classNames={{
                          inputWrapper: "bg-blue-input/60 ring-2 ",
                        }}
                        placeholder="******"
                        {...field}
                        errorMessage={form.formState.errors.password?.message}
                        isInvalid={!!form.formState.errors.password}
                        startContent={
                          <motion.div
                            key={showPassword ? "unlock" : "lock"}
                            initial={{ rotate: 0, scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}>
                            {showPassword ? (
                              <motion.div
                                initial={{
                                  scale: 0.8,
                                }}
                                animate={{
                                  y: [-3, 0, -3],
                                }}
                                transition={{
                                  times: [0, 1],
                                  duration: 2,
                                  repeat: Infinity,
                                  type: "keyframes",
                                  ease: "easeInOut",
                                }}>
                                <SlLockOpen
                                  size={25}
                                  className="text-sky-600/60"
                                />
                              </motion.div>
                            ) : (
                              <SlLock size={25} className="text-sky-600/60" />
                            )}
                          </motion.div>
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        color="primary"
                        radius="full"
                        size="lg"
                        classNames={{
                          inputWrapper: "bg-blue-input/60 ring-2 ",
                        }}
                        placeholder="******"
                        {...field}
                        errorMessage={
                          form.formState.errors.confirmPassword?.message
                        } // ตรวจสอบข้อความข้อผิดพลาดที่นี่
                        isInvalid={!!form.formState.errors.confirmPassword} // ตรวจสอบความผิดพลาดที่น
                        startContent={
                          <motion.div
                            key={showPassword ? "unlock" : "lock"}
                            initial={{ rotate: 0, scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}>
                            {showPassword ? (
                              <motion.div
                                initial={{
                                  scale: 0.8,
                                }}
                                animate={{
                                  y: [-3, 0, -3],
                                }}
                                transition={{
                                  times: [0, 1],
                                  duration: 2,
                                  repeat: Infinity,
                                  type: "keyframes",
                                  ease: "easeInOut",
                                }}>
                                <SlLockOpen size={25} />
                              </motion.div>
                            ) : (
                              <SlLock size={25} className="text-sky-600/60" />
                            )}
                          </motion.div>
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div
            className="
                        
                        flex mt-4 mb-4
                        xsm:flex-row 
                        xsm:space-y-6 
                        lg:space-y-0 
                        space-x-14
                        items-center justify-center">
            <Checkbox
              onChange={toggleShowPassword}
              isSelected={showPassword}
              defaultSelected
              size="sm">
              Show Password
            </Checkbox>
            <Link
              href="/auth/reset"
              underline="always"
              className="text-xs flex items-end justify-end ">
              Forgot your password ?
            </Link>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex flex-col items-center justify-center w-full">
            <div>
              {isPending ? (
                <Spinner />
              ) : (
                <Button
                  type="submit"
                  className="rounded-2xl w-40
             bg-yellow-300/90 text-black">
                  Sign Up
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
      <SubSignUp />
    </div>
  );
}

export default SignUpForm;
