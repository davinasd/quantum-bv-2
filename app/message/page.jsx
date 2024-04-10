"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePrompt = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
  });

  const createPrompt = async (e) => {
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
        "https://a258-34-236-202-207.ngrok-free.app/run-bernstein-vazirani",
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
          // Joined without separator
          toast.success(<Alert message={data} />, {
            style: {
              fontWeight: "bold",
              color: "black",
            },
          });
          setPost({ prompt: "" });
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
  const { binary_string, results } = message;

  return (
    <div className="ml-5">
      <p>For Binary String: {binary_string}</p>
      {Object.entries(results).map(([blackBox, probability]) => (
        <div key={blackBox}>
          Black Box: {blackBox}, Probability: {probability}
        </div>
      ))}
    </div>
  );
};



  return (
    <>
      <Form
        type="Enter"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={true}
        style={{ width: "400px" }}
      />
    </>
  );
};

export default CreatePrompt;
