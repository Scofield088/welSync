import React, { useState } from "react";
import BlogCard from "../component/Blogs/BlogCard";
import Dictaphone from "../Dictaphone";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const imgUrls = [
    "https://img.freepik.com/free-vector/businessman-workplace-top-view_98292-5450.jpg",
    "https://img.freepik.com/free-vector/thesis-concept-illustration_114360-30032.jpg",
    "https://img.freepik.com/free-vector/blogging-illustration-concept_114360-851.jpg",
    "https://img.freepik.com/free-vector/letter-concept-illustration_114360-27243.jpg",
  ];

  const handlePost = () => {
    if (title && content) {
      const imgUrl = imgUrls[posts.length % imgUrls.length];
      setPosts([...posts, { title, content, imgUrl }]);
      setTitle("");
      setContent("");
    }
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
  };

  return (
    <section className="py-24">
      <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">
        Journals
      </h2>
      <div className="relative flex flex-col rounded-xl items-center p-10">
        <div className="border border-gray-400 p-4 w-[50%] rounded-lg">
          <h4 className="block text-xl font-medium text-slate-800">
            Write Journal
          </h4>
          <form className="mt-8 mb-2 w-full">
            <div className="mb-1 flex flex-col gap-6">
              <div className="w-full ">
                <label className="block mb-2 text-sm text-slate-600">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:border-2 focus:border-gray-900 focus:outline-0  hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Title here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full">
                <label className="">Your Thoughts</label>
                <textarea
                  rows={8}
                  className="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-gray-400  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex w-full justify-end py-1.5">
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-md select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                  <button
                    className="select-none rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={handlePost}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start gap-y-8 lg:gap-y-4 flex-wrap lg:flex-row lg:gap-x-8">
          <BlogCard
            title="My First Journal"
            content="Today was a great day! I learned a lot about React and had a lot of fun coding."
            imgUrl="https://img.freepik.com/free-vector/businessman-workplace-top-view_98292-5450.jpg"
          />
          <BlogCard
            title="A Day in the Life"
            content="Woke up early, went for a run, and then spent the rest of the day working on my project."
            imgUrl="https://img.freepik.com/free-vector/thesis-concept-illustration_114360-30032.jpg"
          />
          <BlogCard
            title="Learning New Things"
            content="Started learning about new JavaScript frameworks today. It's challenging but exciting!"
            imgUrl="https://img.freepik.com/free-vector/blogging-illustration-concept_114360-851.jpg"
          />
          <BlogCard
            title="Reflections"
            content="Spent some time reflecting on my progress and setting new goals for the future."
            imgUrl="https://img.freepik.com/free-vector/letter-concept-illustration_114360-27243.jpg"
          />
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              content={post.content}
              imgUrl={post.imgUrl}
            />
          ))}
        </div>
      </div>
      <Dictaphone/> 
    </section>
  );
};

export default Blogs;
