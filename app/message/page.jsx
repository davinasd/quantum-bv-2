"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";



const CreatePrompt = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
  });
  const [histogramImage, setHistogramImage] = useState(null);
  const [cacheBuster, setCacheBuster] = useState(0); 

  const createPrompt = async (e) => {
    setHistogramImage("");
    e.preventDefault();
    setSubmitting(true);

    let binaryPrompt = post.prompt;

    if (!/^[01]+$/.test(post.prompt)) {
      binaryPrompt = post.prompt
        .split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("");
    }

    try {
      const res = await fetch(
        "https://frequently-national-yak.ngrok-free.app/run-bernstein-vazirani",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            binary_string: binaryPrompt,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.results) {
          toast.success(<Alert message={data} />, {
            style: {
              fontWeight: "bold",
              color: "black",
            },
          });
          setPost({ prompt: "" });
          setHistogramImage(
            `https://frequently-national-yak.ngrok-free.app/get-histogram?cache=${cacheBuster}`
          );
          // Update cacheBuster to trigger cache busting
          setCacheBuster(cacheBuster + 1);
        } else {
          toast.error("No results found.");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while processing the request.");
    } finally {
      setSubmitting(false);
    }
  };

  const Alert = ({ message }) => {
    const { binary_string, results, endedAt, id, quantum_tasks } = message;
    const { taskMetadata } = quantum_tasks;

    return (
      <div className="ml-5">
        <p>For Binary String: {binary_string}</p>
        {taskMetadata && (
          <div>
            <p>Task Created At: {taskMetadata.createdAt}</p>
            <p>Device ID: {taskMetadata.deviceId}</p>
            <p>Status: {taskMetadata.status}</p>
          </div>
        )}
        <p>Results:</p>
        <ul>
          {Object.entries(results).map(([blackBox, probability]) => (
            <li key={blackBox}>
              Black Box: {blackBox}, Probability: {probability}
            </li>
          ))}
        </ul>
        <p>Ended At {endedAt}</p>
      </div>
    );
  };

  return (
    <>
      <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center px-10 mt-20 w-full z-[20]"
    >
      <motion.div variants={slideInFromTop}>
      <h1 className="head_text text-left">
        <span className="blue_gradient">BV Algorithm </span>
      </h1>
      </motion.div>
      
    <motion.div variants={slideInFromLeft(0.5)}>
      <Form
        type="Enter"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
      </motion.div>
      {histogramImage && (
        <Image src={histogramImage} width={800} height={500} alt="Histogram" />
      )}
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={true}
        style={{ width: "400px" }}
      />
      </motion.div>
    </>
  );
};

export default CreatePrompt;
