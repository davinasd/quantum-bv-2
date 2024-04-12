"use client";



import Link from "next/link"; 

const Feed = () => {


  return (
    <section className="feed">
      <div className="sm:flex ">
        <div className="flex gap-3 md:gap-5 mb-10">
          <Link href="/message" className="black_btn text-blue_gradient">
           BV Algorithm
          </Link>
          <Link href="/grover" className="black_btn text-blue_gradient">
           Grovers Algorithm
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Feed
