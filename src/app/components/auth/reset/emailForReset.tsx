"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetSchema } from "../../../lib/schema/auth/zodAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { TEST, TEST4 } from "../../../../../server/test";
import { useRouter } from "next/navigation";
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

function EmailForReset() {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    formState: { isDirty, isValid },
  } = form;

  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [buttonState, setButtonState] = useState("Send Email");

  const [isPending, startTransition] = useTransition();

  const onSubmit = (value: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      TEST4(value).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data.success) {
          router.push("/auth/sign-in");
        }
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    classNames={{
                      inputWrapper: "bg-white",
                    }}
                    errorMessage={form.formState.errors.email?.message}
                    isInvalid={!!form.formState.errors.email}
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
                Send Mail
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EmailForReset;
