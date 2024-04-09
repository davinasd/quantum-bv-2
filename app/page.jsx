// unique page that renders the homepage
import Feed from "@components/Feed"


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Enhancing Cryptanalytic Efficiency -
        <br className="max-md:hidden" />
        <span className="orange_gradient">
          Bernstein-Vazirani Quantum Algorithm
        </span>
      </h1>
      <p className=" desc p-10 w-80% text-center">
        We are executing the Berstein Vazirani Algorithm on a quantum circuit
        simulator and the results have a probability of 100% for the value of
        our message. We use 1 shot such that we will guess the secret number in
        just one single try.
      </p>
      <Feed />
    </section>
  );
}

export default Home
