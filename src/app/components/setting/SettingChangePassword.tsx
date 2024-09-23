"use client";
import React, { useState, useTransition } from "react";
import CardDashBoard from "../dashboard/CardDashBoard";
import { Input } from "@nextui-org/input";
import { SlLock } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ResetPasswordSchema,
  ResetPasswordSchemaHavePW,
} from "../../lib/schema/auth/zodAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../../components/ui/form";
import { Button } from "../../../../components/ui/button";
import { Checkbox, Spinner } from "@nextui-org/react";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";

function SettingChangePassword() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((v) => !v);

  const form = useForm<z.infer<typeof ResetPasswordSchemaHavePW>>({
    resolver: zodResolver(ResetPasswordSchemaHavePW),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof ResetPasswordSchemaHavePW>) => {
    try {
      const response = await axios.patch("/api/resetpwhavepw", value);
      toast.success(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data.error || "Something went wrong!";

        toast.error(errorMessage);
      } else {
        console.error(error);
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <CardDashBoard>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-blue-500 font-bold">CHANGE PASSWORD</p>
        <div className="w-full gap-3 text-start flex flex-col items-start justify-start p-6">
          <Form {...form}>
            <form
              className="space-y-6 mt-4 w-full"
              onSubmit={form.handleSubmit(onSubmit)}>
              <p className="text-blue-500/50">Current Password</p>

              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        isInvalid={!!form.formState.errors.currentPassword}
                        errorMessage={
                          form.formState.errors.currentPassword?.message
                        }
                        disabled={isSubmitting}
                        className="w-full"
                        startContent={
                          <SlLock size={25} className="text-blue-500/50" />
                        }
                        color="primary"
                        radius="full"
                        size="sm"
                        classNames={{
                          inputWrapper: "bg-blue-input/60 ring-2 ",
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="text-blue-500/50">New Password</p>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        isInvalid={!!form.formState.errors.password}
                        errorMessage={form.formState.errors.password?.message}
                        disabled={isSubmitting}
                        classNames={{
                          inputWrapper: "bg-blue-input/60 ring-2 ",
                        }}
                        placeholder="Enter your first name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="text-blue-500/50">Confirm New Password</p>

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        isInvalid={!!form.formState.errors.confirmPassword}
                        errorMessage={
                          form.formState.errors.confirmPassword?.message
                        }
                        disabled={isSubmitting}
                        classNames={{
                          inputWrapper: "bg-blue-input/60 ring-2 ",
                        }}
                        placeholder="Enter your first name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Checkbox
                onChange={toggleShowPassword}
                isSelected={showPassword}
                defaultSelected
                size="sm">
                Show Password
              </Checkbox>
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
                  {isPending ? <Spinner /> : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </CardDashBoard>
  );
}

export default SettingChangePassword;
