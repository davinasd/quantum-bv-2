import React, { useEffect } from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit(event);
      }
    };

    const textarea = document.getElementById("prompts");
    if (textarea) {
      textarea.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleSubmit]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Check if the input is a binary string and its length is not more than 10
    if (/^[01]{0,10}$/.test(inputValue)) {
      setPost({ ...post, prompt: inputValue });
    }
  };

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <p className="text-lg text-gray-400 my-3 max-w-[600px]">
        Enter Message you want to add into the Black Box.
      </p>

      <form
        onSubmit={handleSubmit}
        className="relative z-20 mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="cursive text-[20px] font-medium text-center text-gray-300">
            Enter the Message here.
          </span>
          <textarea
            value={post.prompt}
            onChange={handleChange}
            name="prompts"
            id="prompts"
            cols="30"
            rows="10"
            className="form_textarea"
            placeholder="Enter Binary String here. Eg: 1000001"
            required
          />
        </label>
        <div className="flex-end mx-3 mb-4 gap-4">
          <Link
            href="/"
            className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] "
          >
            Cancel
          </Link>
          <button
            className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `Awaiting Response From Server` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
