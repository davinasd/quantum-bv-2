"use client";



import Link from "next/link"; //automatically use links




const Feed = () => {


  return (
    <section className="feed">
       

        <div className="sm:flex ">
        
         
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn" >
              encrypt 
            </Link>

             <Link href="/decrypt-prompt" className="black_btn" >
              decrypt
            </Link>
            
           
          </div>
         
         
      </div>

    </section>
  )
}

export default Feed
