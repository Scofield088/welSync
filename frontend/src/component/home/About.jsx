import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen bg-black text-white">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase text-gray-400 md:text-[10px]">
          Welcome to MindCare
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the path to <br /> better mental <b>h</b>ealth"
          containerClass="mt-5 !text-white text-center"
        />

        <div className="about-subtext text-center">
          <p className="text-lg font-semibold">Your AI-Powered Companion for Emotional Well-Being</p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            MindCare helps you identify stress, anxiety, and depression patterns
            while providing personalized wellness activities and crisis support.
            Together, let’s redefine mental health care.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen relative" id="clip">
        <div className="mask-clip-path about-image relative">
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <video
            src="videos/about1.mp4"
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;