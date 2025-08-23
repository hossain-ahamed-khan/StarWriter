import { Hero } from "@/components/home/Hero";
import { Platforms } from "@/components/home/Platforms";
import { TextCompare } from "@/components/home/TextCompare";
import { WhyChoose } from "@/components/home/WhyChoose";

const App = () => {
  return (
    <div className="bg-[#020107]">
      <Hero />
      <Platforms />
      <TextCompare />
      <WhyChoose />
    </div>
  );
};

export default App;
