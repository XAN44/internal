import Image from "next/image";
import { Fa500Px, FaRegLightbulb } from "react-icons/fa";
import CardWrapper from "../../components/cardWarper";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { startTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "../../lib/schema/tsae";
import { z } from "zod";
import { TEST } from "../../../../server/test";
import SignInForm from "../../components/auth/sign-in/sign-InForm";
import SignUpForm from "../../components/auth/sign-up/sign-UpForm";

export default function Page() {
  return (
    <CardWrapper headerImg="/Webinar.svg">
      <SignUpForm />
    </CardWrapper>
  );
}
