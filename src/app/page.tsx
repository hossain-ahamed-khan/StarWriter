import { Hero } from "@/components/home/Hero";
import { Platforms } from "@/components/home/Platforms";
import { Navbar } from "@/components/shared/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Platforms />
    </div>
  );
};

export default App;
