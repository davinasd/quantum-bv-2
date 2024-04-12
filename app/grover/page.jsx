"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const grover = () => {
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
        "https://frequently-national-yak.ngrok-free.app/run-grover",
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
        console.log(data);
        if (data) {
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
    const { endedAt } = message;

    return (
      <div className="ml-5">
        <p>Results:</p>
        <ul>
          {Object.entries(message).map(([blackBox, probability]) => (
            <li key={blackBox}>
              Black Box: {blackBox}, Probability: {probability}
            </li>
          ))}
        </ul>
      </div>
    );
  };



  return (
    <>
      <h1 className="head_text text-left">
        <span className="green_gradient">Groover Algorithm</span>
      </h1>
      <Form
        type="Enter"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
      <div className="flex justify-center">
        <div className="flex flex-row items-center space-y-4 h-auto">
          <img
            src="https://raw.githubusercontent.com/amazon-braket/amazon-braket-examples/main/examples/advanced_circuits_algorithms/Grover/circuit.png"
            width={600}
            height={500}
            alt="Histogram"
            className="mr-4"
          />
          <img
            src="https://raw.githubusercontent.com/amazon-braket/amazon-braket-examples/main/examples/advanced_circuits_algorithms/Grover/anatomy.png"
            width={600}
            height={500}
            alt="Histogram"
          />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={true}
        style={{ width: "400px" }}
      />
    </>
  );
};

export default grover;
