"use client";

import Link from "next/link"; 
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Enhancing Cryptanalytic Efficiency -
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-5xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
           
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              Bernstein-Vazirani {" "}
            </span>
            Quantum algorithm
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          We are executing the Berstein Vazirani Algorithm on a quantum circuit
        simulator and then displaying the results with a high probability for
        the correct value of our message. We use 1 shot such that we will guess
        the secret number in just one single try.

        </motion.p>
        <div className = "flex md:gap-5 mb-10 ">
        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          <Link href="/message" >
           BV Algorithm
          </Link>
        </motion.a>

        <motion.a
          variants={slideInFromLeft(2)}
          className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          <Link href="/grover" >
           Grovers Algorithm
          </Link>
        </motion.a>
        </div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        
         <div style={{ margin: '20px', borderRadius: '3%', overflow: 'hidden' }}>
        <Image
          src="/assets/images/circuit.jpg"
          alt="Description of your image"
          width={650}
          height={650}
          
        />
      </div>
      </motion.div>



    </motion.div>
  );
};

export default HeroContent;
