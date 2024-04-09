"use client";



import Link from "next/link"; //automatically use links




const Feed = () => {


  return (
    <section className="feed">
      <div className="sm:flex ">
        <div className="flex gap-3 md:gap-5">
          <Link href="/message" className="black_btn">
           Click Here to Test the Power of BV Algorithm.
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Feed
