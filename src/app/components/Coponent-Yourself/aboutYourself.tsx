"use client";
import React, { startTransition, useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { RxAvatar } from "react-icons/rx";
import { Checkbox, Link, Select, SelectItem } from "@nextui-org/react";
import { SlLockOpen } from "react-icons/sl";
import { SlLock } from "react-icons/sl";
import { motion } from "framer-motion";
import { ImMail4 } from "react-icons/im";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../components/ui/form";
import { TEST1, TEST2 } from "../../../../server/test";
import SubSignUp from "../auth/sign-up/subBtnSignUp";
import { AboutYourSelfSchema } from "../../lib/schema/aboutYourself/zodSelf";
import { DepartMent, Role } from "../../lib/modal/abYourself";
import FormError from "../stateForm/form-error";
import FormSuccess from "../stateForm/form-success";
import { FaUser, FaUsers } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useRouter } from "next/navigation";

function AboutYourself() {
  const form = useForm<z.infer<typeof AboutYourSelfSchema>>({
    resolver: zodResolver(AboutYourSelfSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      department: "",
      role: "",
    },
  });

  const {
    formState: { isDirty, isValid },
  } = form;

  const [isPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isOpenDepartMent, setIsOpenDepartMent] = useState(false);
  const [isOpenRole, setIsOpenRole] = useState(false);

  const router = useRouter();
  const onSubmit = (value: z.infer<typeof AboutYourSelfSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      TEST2(value).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data.success) {
          router.push("/auth/aboutYourself/Interests");
        }
      });
    });
  };

  return (
    <div className="w-full h-full items-center justify-center mt-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="xsm:max-w-md  xl:max-w-xs 3xl:max-w-md">
          <div className="space-y-4 ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      errorMessage={form.formState.errors.firstName?.message}
                      isInvalid={!!form.formState.errors.firstName}
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      errorMessage={form.formState.errors.lastName?.message}
                      isInvalid={!!form.formState.errors.lastName}
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
            <div className="flex flex-col space-y-6">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        {...field}
                        aria-labelledby="DepartMent Select"
                        items={DepartMent}
                        selectionMode="single"
                        placeholder="Select DepartMent"
                        errorMessage={form.formState.errors.department?.message}
                        isInvalid={!!form.formState.errors.department}
                        classNames={{
                          listboxWrapper:
                            "bg-gradient-to-t from-sky-300/90 to-purple-900/60 ring-2 ",
                          listbox: "bg-red-input/60 ring-2 ",
                          value: "text-black flex items-center justify-center",
                          trigger:
                            "bg-gradient-to-r from-blue-300/90 to-blue-500 ring-2 ",
                        }}
                        disableSelectorIconRotation
                        onOpenChange={(open) =>
                          open !== isOpenDepartMent && setIsOpenDepartMent(open)
                        }
                        selectorIcon={
                          isOpenDepartMent ? (
                            <FaUsers color="white" />
                          ) : (
                            <FaUser color="white" />
                          )
                        }>
                        {DepartMent.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        {...field}
                        aria-labelledby="Role Select"
                        items={Role}
                        selectionMode="single"
                        placeholder="Select Role"
                        errorMessage={form.formState.errors.role?.message}
                        isInvalid={!!form.formState.errors.role}
                        classNames={{
                          listboxWrapper:
                            "bg-gradient-to-t from-sky-300/90 to-purple-900/60 ring-2 ",
                          listbox: "bg-red-input/60 ring-2 ",
                          value: "text-black flex items-center justify-center",
                          trigger:
                            "bg-gradient-to-r from-blue-300/90 to-blue-500 ring-2 ",
                        }}
                        disableSelectorIconRotation
                        onOpenChange={(open) =>
                          open !== isOpenRole && setIsOpenRole(open)
                        }
                        selectorIcon={
                          isOpenRole ? (
                            <MdOutlinePersonSearch color="white" />
                          ) : (
                            <IoSearchSharp color="white" />
                          )
                        }>
                        {Role.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-6 mb-3">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            {isPending ? (
              <Button isLoading></Button>
            ) : (
              <Button
                type="submit"
                className="rounded-2xl w-40 bg-yellow-300/90 text-black">
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AboutYourself;
