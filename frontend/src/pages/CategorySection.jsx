import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Women",
    items: [
      { title: "Pregnancy and Maternal Health", icon: "👩‍🍼" },
      { title: "Menstrual Health and Periods", icon: "🩸" },
      { title: "Marriage and Relationship Issues", icon: "💍" },
      { title: "Career and Workplace Challenges", icon: "💼" },
      { title: "Postpartum Depression and Parenting", icon: "🍼" },
    ],
  },
  {
    title: "Men",
    items: [
      { title: "Mental Health and Emotional Well-being", icon: "🧠" },
      { title: "Career Stress and Financial Pressure", icon: "💵" },
      { title: "Relationship and Marital Issues", icon: "❤️" },
      { title: "Coping with Societal Expectations", icon: "⚖️" },
      { title: "Health and Fitness", icon: "🏋️" },
    ],
  },
  {
    title: "Senior",
    items: [
      { title: "Coping with Loneliness and Isolation", icon: "🤝" },
      { title: "Health and Chronic Illness Management", icon: "🩺" },
      { title: "Financial and Retirement Planning", icon: "💰" },
      { title: "Grief Counseling", icon: "😢" },
      { title: "Staying Connected with Family", icon: "📞" },
    ],
  },
  {
    title: "Girls",
    items: [
      { title: "Body Image and Self-esteem", icon: "🪞" },
      { title: "Period Health and Hygiene", icon: "🩹" },
      { title: "Peer Pressure and Bullying", icon: "😡" },
      { title: "Academic Stress and Career Choices", icon: "📚" },
      { title: "Safe Social Media Practices", icon: "📱" },
    ],
  },
  {
    title: "Students",
    items: [
      { title: "Academic Anxiety and Exam Stress", icon: "📝" },
      { title: "Time Management and Productivity", icon: "⏳" },
      { title: "Peer Relationships and Bullying", icon: "👫" },
      { title: "Balancing Studies with Extracurriculars", icon: "⚽" },
      { title: "Mental Health Resources for Students", icon: "💡" },
    ],
  },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 ">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Articles by Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="bg-gray-800 text-white p-4 text-center">
              <h2 className="text-xl font-semibold">{category.title}</h2>
            </div>
            <div className="p-4">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 cursor-pointer transition"
                >
                  <span className="flex items-center">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span className="text-md font-medium">{item.title}</span>
                  </span>
                  <button
                    className="text-md  font-semibold hover:underline"
                    onClick={() =>
                      navigate(
                        `/articles/${category.title.toLowerCase()}/${item.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      )
                    }
                  >
                    View Articles
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
