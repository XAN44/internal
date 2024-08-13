import Image from "next/image";
import CardWrapper from "../../../components/cardWarper";
import CardWarperForInter from "../../../components/cardWarperForInter";
import SelectInterest from "../../../components/interests/selectInterest";

export default function Page() {
  return (
    <CardWarperForInter>
      <SelectInterest />
    </CardWarperForInter>
  );
}
