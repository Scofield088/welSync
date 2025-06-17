import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ title, content, imgUrl }) => {
  const navigate = useNavigate();

  const handleDescription = () => {
    navigate("/description", { state: { title, content, imgUrl } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{content}</p>
        <button
          onClick={handleDescription}
          className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300"
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default BlogCard;

