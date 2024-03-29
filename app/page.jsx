// unique page that renders the homepage
import Feed from "@components/Feed"


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover the power of 
      <br className="max-md:hidden"/>
      <span className="orange_gradient">Bernstein Vazirani Algorithm</span>
      </h1>
      <p className=" desc p-10 w-80% text-center">The Bernstein-Vazirani algorithm accelerates cryptanalysis by swiftly revealing hidden secrets encoded within cryptographic systems. It efficiently decrypts encrypted data by treating cryptographic problems as function evaluation tasks which promises to revolutionize decryption speed in the digital age.</p>
      <Feed/>
    </section>
  )
}

export default Home
