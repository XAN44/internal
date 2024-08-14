import Image from "next/image";
import CardWrapper from "../../../components/cardWarper";
import CardWarperForInter from "../../../components/cardWarperForInter";
import TitleInterest from "../../../components/interests/TitleInterest";

export default function Page() {
  return (
    <CardWarperForInter>
      <TitleInterest />
    </CardWarperForInter>
  );
}
