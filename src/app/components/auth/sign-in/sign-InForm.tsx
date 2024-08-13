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
import { SignInSchema } from "../../../lib/schema/auth/zodAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { TEST } from "../../../../../server/test";
import { RxAvatar } from "react-icons/rx";
import { Checkbox, Link } from "@nextui-org/react";
import { SlLockOpen } from "react-icons/sl";
import { SlLock } from "react-icons/sl";
import { motion } from "framer-motion";
import SubSignIn from "./subBtnSignIn";
import FormError from "../../stateForm/form-error";
import FormSuccess from "../../stateForm/form-success";
import { useRouter } from "next/navigation";
function SignInForm() {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
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

  const onSubmit = (value: z.infer<typeof SignInSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      TEST(value).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data.success) {
          route.push("/aboutYourself");
        }
      });
    });
  };

  return (
    <div className="w-full h-full items-center justify-center mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                      startContent={<RxAvatar size={30} />}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
                      variant="faded"
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
                              <SlLockOpen size={25} />
                            </motion.div>
                          ) : (
                            <SlLock size={25} />
                          )}
                        </motion.div>
                      }
                    />
                  </FormControl>
                  <div
                    className="
                  flex 
                  xsm:flex-row 
                  xsm:space-y-14 
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
                      href="/"
                      underline="always"
                      className="text-xs flex items-end justify-end ">
                      Forgot your password ?
                    </Link>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <div className="flex flex-col items-center justify-center w-full">
            {isPending ? (
              <Button isLoading> </Button>
            ) : (
              <Button
                type="submit"
                className="rounded-2xl w-40
             bg-yellow-300/90 text-black">
                Sign In
              </Button>
            )}
          </div>
        </form>
      </Form>

      <SubSignIn />
    </div>
  );
}

export default SignInForm;
