"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import clsx from "clsx";
import { MdOutlineDomainVerification } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import CardDashBoard from "./dashboard/CardDashBoard";
import { newVerification } from "../../../server/newNotification";
import { Button } from "@nextui-org/button";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [colorSuccess, setColorSuccess] = useState("");
  const [colorError, setColorError] = useState("");
  const router = useRouter();

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing Token");
      return;
    }
    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
          setColorSuccess("bg-gradient-to-b from-violet-600 to-indigo-600");
          router.push("/auth/sign-in");
          setError(""); // Clear error if success
          setColorError("bg-gradient-to-b from-violet-600 to-indigo-600");
        }
        if (data.error) {
          setError(data.error);
          setColorError("bg-gradient-to-b from-red-700 to-rose-900");
          setSuccess(""); // Clear success if error
        }
      })
      .catch(() => {
        setError("Somthing went wrong");
        setSuccess(""); // Clear success if error
        setColorError("bg-gradient-to-b from-red-700 to-rose-900");
      });
  }, [token, success, error, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="w-full h-full">
      <div className="text-blue-500 font-bold items-center justify-center flex flex-col">
        {!success && !error && (
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="animate-pulse text-blue-600">Pep.. Pep..</h1>
            <Button isLoading></Button>
          </div>
        )}
        {success && (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-xl">VERIFY SUCCESS</p>
            <p>
              <MdOutlineDomainVerification size={40} />
            </p>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-xl text-red-900">VERIFY FAIL</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default NewVerificationForm;
