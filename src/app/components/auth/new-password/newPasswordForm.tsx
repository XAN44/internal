"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ResetPasswordSchema,
  ResetSchema,
} from "../../../lib/schema/auth/zodAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../../../components/ui/form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";
import FormError from "../../stateForm/form-error";
import FormSuccess from "../../stateForm/form-success";
import { ImMail4 } from "react-icons/im";
import { reset } from "../../../../../server/reset";
import { newPassword } from "../../../../../server/changePassword";
import { MdPassword } from "react-icons/md";
function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [isPending, startTranstion] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (value: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTranstion(() => {
      newPassword(value, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data.success) {
          router.push("/auth/sign-in");
        }
      });
    });
  };

  return (
    <div className="flex flex-col  items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    classNames={{
                      inputWrapper: "bg-white",
                    }}
                    errorMessage={form.formState.errors.password?.message}
                    isInvalid={!!form.formState.errors.password}
                    startContent={<MdPassword size={30} />}
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
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    classNames={{
                      inputWrapper: "bg-white",
                    }}
                    errorMessage={
                      form.formState.errors.confirmPassword?.message
                    }
                    isInvalid={!!form.formState.errors.confirmPassword}
                    startContent={<MdPassword size={30} />}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-3">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <div
            className="
          flex 
          items-center 
          justify-center 
          mt-6 mb-0">
            {isPending ? (
              <Spinner />
            ) : (
              <Button
                type="submit"
                className="
                bg-gradient-to-l
            from-indigo-500/50 
            to-blue-400">
                Reset Password
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default NewPasswordForm;
