"use client";
import {
  Avatar,
  Badge,
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { Edit, X } from "lucide-react";
import React, { useMemo, useState, useTransition } from "react";
import { CiEdit } from "react-icons/ci";
import { FiMail } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { FileUpload } from "../fileUpload";
import { isValid, z } from "zod";
import { useForm } from "react-hook-form";
import {
  AvatarForm,
  DepartmentForm,
  NameLastForm,
  RoleForm,
  UsernameForm,
} from "../../lib/schema/auth/zodUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEditOff, MdModeEdit, MdOutlinePersonSearch } from "react-icons/md";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../components/ui/form";
import { Department } from "@prisma/client";
import { IoSearchSharp } from "react-icons/io5";
import { Role } from "../../lib/modal/abYourself";
import { FaUser, FaUsers } from "react-icons/fa";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  departnames: { id: number; departname: string }[];
  userInfo: {
    id: string;
    username: string | null;
    name: string | null;
    last: string | null;
    email: string | null;
    image: string | null;
    role: string | null;
    Department: {
      id: number;
      departname: string | null;
    } | null;
  } | null;
}

function SettingUser({ userInfo, departnames }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingNameLast, setIsEditingNameLast] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [isEditingDepartMent, setIsEditingDepartMent] = useState(false);
  const [isEditingUsername, setIsisEditingUsername] = useState(false);
  const [isOpenDepartMent, setIsOpenDepartMent] = useState(false);
  const [isOpenRole, setIsOpenRole] = useState(false);

  const defaultUserInfo = {
    Department: { departname: null },
    email: null,
    id: null,
    image: null,
    last: null,
    name: null,
    role: null,
    username: null,
  };

  const user = userInfo || defaultUserInfo;

  const { Department, email, id, image, last, name, role, username } = user;

  const formAvatar = useForm<z.infer<typeof AvatarForm>>({
    resolver: zodResolver(AvatarForm),
    defaultValues: {
      image: image || "",
    },
  });

  const formNameLast = useForm<z.infer<typeof NameLastForm>>({
    resolver: zodResolver(NameLastForm),
    defaultValues: {
      name: name || "",
      last: last || "",
    },
  });

  const formRole = useForm<z.infer<typeof RoleForm>>({
    resolver: zodResolver(RoleForm),
    defaultValues: {
      role: role || "",
    },
  });

  const formDepartment = useForm<z.infer<typeof DepartmentForm>>({
    resolver: zodResolver(DepartmentForm),
    defaultValues: {
      departmentId: Department?.departname || "",
    },
  });

  const formUsername = useForm<z.infer<typeof UsernameForm>>({
    resolver: zodResolver(UsernameForm),
    defaultValues: {
      username: username || "",
    },
  });

  const { isSubmitting, isValid } = formAvatar.formState;

  const toggleEditingDepartment = () => {
    setIsEditingDepartMent((current) => !current);
  };
  const toggleEditingAvatar = () => {
    setIsEditingAvatar((current) => !current);
  };
  const toggleEditingRole = () => {
    setIsEditingRole((current) => !current);
  };
  const toggleEditingNameLast = () => {
    setIsEditingNameLast((current) => !current);
  };
  const toggleEditingUsername = () => {
    setIsisEditingUsername((current) => !current);
  };

  const onSubmitAvatarForm = (value: z.infer<typeof AvatarForm>) => {
    startTransition(async () => {
      try {
        const response = await axios.patch(`/api/edituser`, value);
        toggleEditingAvatar();
        router.refresh();
        if (response.data.success) {
          toast.success(response.data.success);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          const message = error.response?.data.error;
          toast.error(message);
        }
      }
    });
  };

  const onSubmitNameLastForm = (value: z.infer<typeof NameLastForm>) => {
    startTransition(async () => {
      try {
        const response = await axios.patch(`/api/edituser`, value);
        toggleEditingNameLast();
        router.refresh();
        if (response.data.success) {
          toast.success(response.data.success);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          const message = error.response?.data.error;
          toast.error(message);
        }
      }
    });
  };

  const onSubmitformRole = (value: z.infer<typeof RoleForm>) => {
    startTransition(async () => {
      try {
        const response = await axios.patch(`/api/edituser`, value);
        toggleEditingRole();
        router.refresh();
        if (response.data.success) {
          toast.success(response.data.success);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          const message = error.response?.data.error;
          toast.error(message);
        }
      }
    });
  };
  const onSubmitformDepartment = (value: z.infer<typeof DepartmentForm>) => {
    startTransition(async () => {
      try {
        const response = await axios.patch(`/api/updatedepart`, value);
        toggleEditingDepartment();
        router.refresh();
        if (response.data.success) {
          toast.success(response.data.success);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          const message = error.response?.data.error;
          toast.error(message);
        }
      }
    });
  };
  const onSubmitformUsername = (value: z.infer<typeof UsernameForm>) => {
    startTransition(async () => {
      try {
        const response = await axios.patch(`/api/edituser`, value);
        toggleEditingUsername();
        router.refresh();
        if (response.data.success) {
          toast.success(response.data.success);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          const message = error.response?.data.error;
          toast.error(message);
        }
      }
    });
  };
  // const isVannessplusUser = userInfo?.email?.endsWith("@vannessplus.com");

  // const Role = [
  //   { value: "Trainee", label: "Trainee" },
  //   { value: "Employe", label: "Employe" },
  //   ...(isVannessplusUser ? [{ value: "Admin", label: "Admin" }] : []),
  // ];

  return (
    <div className="grid grid-cols-1 place-items-center gap-5 items-center justify-center ">
      <p className="text-blue-500 font-bold">ACCOUNT SETTING</p>
      {!isEditingAvatar && (
        <Badge
          content={
            <MdModeEdit
              className="w-4 h-4 hover:cursor-pointer"
              onClick={toggleEditingAvatar}
            />
          }>
          <Avatar
            src={image || ""}
            alt=""
            className="w-24 h-24 bg-blue-500 rounded-full object-cover"
          />
        </Badge>
      )}
      {isEditingAvatar && (
        <>
          <FileUpload
            endpoint="avatarImage"
            onChange={(url) => {
              if (url) {
                onSubmitAvatarForm({ image: url });
              }
            }}
          />
          <Button
            variant="shadow"
            color="danger"
            onClick={toggleEditingAvatar}
            isIconOnly>
            <X className="w-4 h-4" />
          </Button>
        </>
      )}
      <div className="flex items-center justify-center ">
        {!isEditingNameLast && (
          <>
            <p className="font-bold truncate">
              {name} {last}
            </p>
            <MdModeEdit
              className="w-4 h-4 ml-3 hover:cursor-pointer"
              onClick={toggleEditingNameLast}
            />
          </>
        )}
        {isEditingNameLast && (
          <div className="w-full">
            <Form {...formNameLast}>
              <form
                className="space-y-6 mt-4"
                onSubmit={formNameLast.handleSubmit(onSubmitNameLastForm)}>
                <FormField
                  control={formNameLast.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          isInvalid={!!formNameLast.formState.errors.name}
                          errorMessage={
                            formNameLast.formState.errors.name?.message
                          }
                          classNames={{
                            inputWrapper: "bg-blue-input/60 ring-2 ",
                          }}
                          disabled={isSubmitting}
                          placeholder="Enter your first name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formNameLast.control}
                  name="last"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          isInvalid={!!formNameLast.formState.errors.last}
                          errorMessage={
                            formNameLast.formState.errors.last?.message
                          }
                          classNames={{
                            inputWrapper: "bg-blue-input/60 ring-2 ",
                          }}
                          disabled={isSubmitting}
                          placeholder="Enter your last name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-2">
                  <Button disabled={!isValid || isSubmitting} type="submit">
                    {isPending ? <Spinner /> : "Save"}
                  </Button>
                  <Button
                    onClick={toggleEditingNameLast}
                    color="danger"
                    isIconOnly
                    type="button">
                    <X className="w-4 h-4 hover:cursor-pointer" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-3  ">
        <div className="relative p-2 border-2 rounded-xl border-blue-500/50 flex  items-center justify-between">
          {!isEditingRole && (
            <>
              <p className="text-sm text-blue-500/60 w-full text-center">
                {role}
              </p>
              <CiEdit
                className="text-blue-600 right-3  static hover:cursor-pointer"
                size={25}
                onClick={toggleEditingRole}
              />
            </>
          )}
          {isEditingRole && (
            <div className="w-full">
              <Form {...formRole}>
                <form
                  className="space-y-6 mt-4"
                  onSubmit={formRole.handleSubmit(onSubmitformRole)}>
                  <FormField
                    control={formRole.control}
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
                            errorMessage={
                              formRole.formState.errors.role?.message
                            }
                            isInvalid={!!formRole.formState.errors.role}
                            classNames={{
                              listboxWrapper:
                                "bg-gradient-to-t from-sky-300/90 to-purple-900/60 ring-2 ",
                              listbox: "bg-red-input/60 ring-2 ",
                              value:
                                "text-black flex items-center justify-center",
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
                  <div className="flex items-center justify-center gap-x-2">
                    <Button disabled={!isValid || isSubmitting} type="submit">
                      {isPending ? <Spinner /> : "Save"}
                    </Button>
                    <Button
                      onClick={toggleEditingRole}
                      color="danger"
                      isIconOnly
                      type="button">
                      <X className="w-4 h-4 hover:cursor-pointer" />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
        <div className="relative p-2 border-2 rounded-xl border-blue-500/50 flex  items-center justify-between">
          {!isEditingDepartMent && (
            <>
              <p className="text-sm text-blue-500/60 w-full text-center truncate">
                {Department?.departname}
              </p>
              <CiEdit
                onClick={toggleEditingDepartment}
                className="hover:cursor-pointer text-blue-600 right-3  static"
                size={25}
              />
            </>
          )}
          {isEditingDepartMent && (
            <div className="w-full">
              <Form {...formDepartment}>
                <form
                  className="space-y-6 mt-4"
                  onSubmit={formDepartment.handleSubmit(
                    onSubmitformDepartment
                  )}>
                  <FormField
                    control={formDepartment.control}
                    name="departmentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            {...field}
                            aria-labelledby="DepartMent Select"
                            items={departnames}
                            selectionMode="single"
                            placeholder="Select DepartMent"
                            errorMessage={
                              formDepartment.formState.errors.departmentId
                                ?.message
                            }
                            isInvalid={
                              !!formDepartment.formState.errors.departmentId
                            }
                            classNames={{
                              listboxWrapper:
                                "bg-gradient-to-t from-sky-300/90 to-purple-900/60 ring-2 ",
                              listbox: "bg-red-input/60 ring-2 ",
                              value:
                                "text-black flex items-center justify-center",
                              trigger:
                                "bg-gradient-to-r from-blue-300/90 to-blue-500 ring-2 ",
                            }}
                            disableSelectorIconRotation
                            onOpenChange={(open) =>
                              open !== isOpenDepartMent &&
                              setIsOpenDepartMent(open)
                            }
                            selectorIcon={
                              isOpenDepartMent ? (
                                <FaUsers color="white" />
                              ) : (
                                <FaUser color="white" />
                              )
                            }>
                            {departnames.map((item, index) => (
                              <SelectItem key={item.id} value={item.departname}>
                                {item.departname}
                              </SelectItem>
                            ))}
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-center gap-x-2">
                    <Button disabled={!isValid || isSubmitting} type="submit">
                      {isPending ? <Spinner /> : "Save"}
                    </Button>
                    <Button
                      onClick={toggleEditingDepartment}
                      color="danger"
                      isIconOnly
                      type="button">
                      <X className="w-4 h-4 hover:cursor-pointer" />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
        <div
          className="relative p-2 bg-gradient-to-r from-green-400/40 via-blue-400/50 to-blue-500/40 top-0 rounded-xl   
        flex  items-center justify-between">
          {!isEditingUsername && (
            <>
              <RxAvatar className="text-blue-600 right-3  static" size={25} />
              <p className="text-sm text-blue-500/60 w-full text-center truncate">
                {username}
              </p>
              <CiEdit
                onClick={toggleEditingUsername}
                className="hover:cursor-pointer text-blue-600 right-3  static"
                size={25}
              />
            </>
          )}
          {isEditingUsername && (
            <div className="w-full">
              <Form {...formUsername}>
                <form
                  className="space-y-6 mt-4"
                  onSubmit={formUsername.handleSubmit(onSubmitformUsername)}>
                  <FormField
                    control={formUsername.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            errorMessage={
                              formUsername.formState.errors.username?.message
                            }
                            isInvalid={!!formUsername.formState.errors.username}
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
                  <div className="flex items-center justify-center gap-x-2">
                    <Button disabled={!isValid || isSubmitting} type="submit">
                      {isPending ? <Spinner /> : "Save"}
                    </Button>
                    <Button
                      onClick={toggleEditingUsername}
                      color="danger"
                      isIconOnly
                      type="button">
                      <X className="w-4 h-4 hover:cursor-pointer" />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
        <div className="relative p-2 bg-gradient-to-r from-green-400/40 via-blue-400/50 to-blue-500/40 top-0 rounded-xl flex  items-center justify-between">
          <FiMail className="text-blue-600 right-3  static" size={25} />
          <p className="text-sm text-blue-500/60 w-full text-center truncate">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingUser;
