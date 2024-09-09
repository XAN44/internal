import CardWrapper from "../../components/cardWarper";

import SignInForm from "../../components/auth/sign-in/sign-InForm";

export default function Page() {
  return (
    <CardWrapper headerImg="/headImg.svg">
      <SignInForm />
    </CardWrapper>
  );
}
