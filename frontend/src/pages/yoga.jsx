import React, { useRef, useEffect, useState } from "react";
import * as mpPose from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";

const yogaPoses = [
  { name: "Tree Pose", image: "/img/pose.webp" },
  { name: "Warrior Pose", image: "/img/pose2.jpg" },
  { name: "Cobra Pose", image: "/img/pose2.jpg" },
  { name: "Triangle Pose", image: "/img/pose2.jpg" },
  { name: "Downward Dog", image: "/img/pose2.jpg" },
];

const Yoga = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (feedback) speakFeedback(feedback);
  }, [feedback]);

  useEffect(() => {
    const pose = new mpPose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const onResults = (results) => {
    if (!canvasRef.current) return;
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.poseLandmarks) {
      mpPose.drawLandmarks(canvasCtx, results.poseLandmarks, mpPose.POSE_CONNECTIONS);
      setFeedback(analyzePose(results.poseLandmarks));
    }
  };

  const analyzePose = (landmarks) => {
    const leftElbow = landmarks[mpPose.PoseLandmark.LEFT_ELBOW];
    const leftWrist = landmarks[mpPose.PoseLandmark.LEFT_WRIST];
    const leftShoulder = landmarks[mpPose.PoseLandmark.LEFT_SHOULDER];

    const angle = calculateAngle(leftShoulder, leftElbow, leftWrist);
    return angle < 160 ? "Keep your elbow straight." : "Good posture!";
  };

  const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    return angle > 180 ? 360 - angle : angle;
  };

  const speakFeedback = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  const nextPose = () => {
    setCurrentPoseIndex((prev) => (prev + 1) % yogaPoses.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-4">{yogaPoses[currentPoseIndex].name}</h1>
      <img
        src={yogaPoses[currentPoseIndex].image}
        alt="Yoga Pose"
        className="w-96 h-96 object-cover rounded-lg shadow-lg mb-4"
      />
      <div className="relative">
        <Webcam ref={webcamRef} className="rounded-lg border-4 border-gray-500" />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>
      <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-lg">
        <p className="text-lg">{feedback}</p>
      </div>
      <button
        onClick={nextPose}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition"
      >
        Next Pose
      </button>
    </div>
  );
};

export default Yoga;
