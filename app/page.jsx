import Feed from "@components/Feed";
import Image from "next/image";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Enhancing Cryptanalytic Efficiency -
        <br className="max-md:hidden" />
        <br className="max-md:hidden" />
        <span className="orange_gradient">
          Bernstein-Vazirani Quantum Algorithm
        </span>
      </h1>
      <p className="desc p-10 w-80% text-center">
        We are executing the Berstein Vazirani Algorithm on a quantum circuit
        simulator and then displaying the results with a high probability for
        the correct value of our message. We use 1 shot such that we will guess
        the secret number in just one single try.
      </p>
      <div className="image-container">
        <Image
          src="/assets/images/circuit.jpg"
          alt="Description of your image"
          width={500}
          height={300}
        />
      </div>
      <Feed />
    </section>
  );
};

export default Home;
