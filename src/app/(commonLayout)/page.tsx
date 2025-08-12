import { Hero } from "@/components/home/Hero";
import { Platforms } from "@/components/home/Platforms";
import { TextCompare } from "@/components/home/TextCompare";
import { Navbar } from "@/components/shared/Navbar";

const App = () => {
  return (
    <div>
      <Hero />
      <Platforms />
      <TextCompare />
    </div>
  );
};

export default App;
