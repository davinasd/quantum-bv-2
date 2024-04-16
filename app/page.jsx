import Encryption from "@components/Encryption";
import Feed from "@components/Feed";
import Hero from "@components/Hero";
import Image from "next/image";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
       <Hero/>
      
     
     
      {/* <Feed /> */}
      <Encryption/>
    </section>
  );
};

export default Home;
