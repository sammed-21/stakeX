import { BackgroundLinesDemo } from "@/components/BackgroundLinesDemo";
import { TypewriterEffectDemo } from "@/components/TypewriterEffectDemo";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col   items-center justify-center mx-auto">
      {/* <StakingComponent /> */}
      <BackgroundLinesDemo />
      <TypewriterEffectDemo />
    </div>
  );
}
