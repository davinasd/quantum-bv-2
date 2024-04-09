// "use client";

// import { useState } from "react"
// // import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import Form from "@components/Form";

// const CreatePrompt = () => {
//    const router = useRouter();
//   //  const {data: session} = useSession();

//    const [submitting, setSubmitting] = useState(false);
//    const [post, setPost] = useState({
//     prompt:'',
//     tag : '',
//    })
//    const createPrompt = async(e) =>{
//         e.preventDefault();
//         setSubmitting(true);
//         try {
//           const res = await fetch("/api/prompt/new", {
//             method:'POST',
//             body:JSON.stringify({
//               prompt:post.prompt,
//               userId:"123456",
//               tag:post.tag,
//             })
//           })

//           if(res.ok){
//             router.push("/");
//           }
//         }
//         catch (error) {
//           console.log(error);
//         }
//         finally{
//           setSubmitting(false);
//         }
//    }
//   return (
//    <Form
//     type = "Create"
//     post = {post}
//     setPost = {setPost}
//     submitting = {submitting}
//     handleSubmit = {createPrompt}
//    />
//   )
// }

// export default CreatePrompt;

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
          const firstResult = Object.entries(data.results)[0];
          const [binaryString, probability] = firstResult;
        const alertMessage = `Black Box: ${binaryString},\nProbability: ${probability}`;
         toast.success(
           <CustomToastMessage
             binaryString={binaryString}
             probability={probability}
           />
         );

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
  const CustomToastMessage = ({ binaryString, probability }) => (
    <div className="text-lg font-bold ml-5">
      <p className="text-xl font-bold text-black">Black Box: {binaryString}</p>
      <p className="text-xl font-bold text-black">Probability: {probability}</p>
    </div>
  );


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
      />
    </>
  );
};

export default CreatePrompt;

