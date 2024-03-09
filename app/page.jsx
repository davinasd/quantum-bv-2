// unigue page that renders the homepage
import Feed from "@components/Feed"


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover and share 
      <br className="max-md:hidden"/>
      <span className="orange_gradient">Ai-Powered Prompts</span>
      </h1>
      <p className=" desc p-10 w-25 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed atque soluta nesciunt, maxime quibusdam ab ea laboriosam architecto eum nihil. Error accusamus adipisci vel cumque non velit quo quaerat consequuntur!</p>
      <Feed/>
    </section>
  )
}

export default Home
