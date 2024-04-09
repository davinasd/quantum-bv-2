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

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Add Message </span>
      </h1>
      <p className="desc text-left max-w-md">
        Enter Message you want to add into the Black Box.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Enter the Message here.
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            name="prompts"
            id="prompts"
            cols="30"
            rows="10"
            className="form_textarea"
            placeholder="Enter a Text (will be converted to Binary String) or a Binary String here."
            required
          />
        </label>
        <div className="flex-end mx-3 mb-4 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 rounded-full text-sm text-white bg-primary-orange"
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
