import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetPasswordSchema } from "../../lib/schema/auth/zodAuth";
import NewPassword from "../../components/auth/new-password/newPassword";

function Page() {
  return <NewPassword />;
}

export default Page;
