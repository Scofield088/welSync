import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import DietaryRecommendations from "../../pages/DietaryRecommendations";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const Physical = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">Welcome to FitCare</p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Explore features designed to improve your physical health, ensuring an
          active and nutritious lifestyle.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
      <a href="/yoga">
        <video
          src="videos/yogacorrect.mp4"
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
        <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
          <h1 className="bento-title special-font">AI-Powered Yoga Posture Correction</h1>
          <p className="mt-3 max-w-64 text-xs md:text-base">
            Provides instant feedback to help users maintain proper posture during yoga sessions.
          </p>
        </div>
        </a>
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
        <a href="/dietary-recommendations">
          <video
            src="videos/physical-2.mp4"
            loop
            muted
            autoPlay
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
          <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
            <h1 className="bento-title special-font">Dietary Recommendations for Health Conditions</h1>
            <p>
              Suggests foods based on health conditions (e.g., diabetes-friendly meal plans).
            </p>
          </div>
          </a>
        </BentoTilt> 
    

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <video
            src="videos/physical-3.mp4"
            loop
            muted
            autoPlay
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
          <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
            <h1 className="bento-title special-font">Personalized Workout Plans</h1>
            <p>
              Get AI-curated workout routines tailored to your fitness level and goals.
            </p>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <video
            src="videos/physical-4.mp4"
            loop
            muted
            autoPlay
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
          <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
            <h1 className="bento-title special-font">Hydration & Nutrition Tracker</h1>
            <p>
              Keep track of your daily water intake and nutrition for a balanced diet.
            </p>
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Physical;
