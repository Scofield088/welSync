import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceDetection = ({ setSuggestions}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const videoStreamRef = useRef(null);
  const moodIntervalRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    };

    loadModels();

    return () => {
      stopVideoStream();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoPlay = async () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      canvasRef.current = canvas;
      const { left, top, width, height } = video.getBoundingClientRect();
      canvas.style.position = "absolute";
      canvas.style.left = `${left}px`;
      canvas.style.top = `${top}px`;
      canvas.width = width;
      canvas.height = height;
      canvas.style.zIndex = 9999; 
      const displaySize = { width: width, height: height };
      faceapi.matchDimensions(canvas, displaySize);

      let moodData = [];
      let detectionCount = 0;

      const fallbackTimeout = setTimeout(() => {
        console.warn("No face detected. Falling back to default mood.");
        clearInterval(moodIntervalRef.current);
        stopVideoStream();
        const averageMood = "happy";
        const age = 25;
        sendMoodToAPI(averageMood, age);
        if (canvasRef.current) canvasRef.current.remove();
      }, 10000);

      moodIntervalRef.current = setInterval(async () => {
        if (!video.paused && !video.ended) {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions()
            .withAgeAndGender();

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );

          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

          if (detections.length > 0) {
            const moodScores = detections[0].expressions;
            moodData.push(moodScores);
            detectionCount++;
          }

          if (detectionCount >= 50) {
            clearTimeout(fallbackTimeout); 
            clearInterval(moodIntervalRef.current);
            stopVideoStream();
            const averageMood = calculateAverageMood(moodData);
            const age = detections[0]?.age || 25;
            sendMoodToAPI(averageMood, age);
            if (canvasRef.current) canvasRef.current.remove();
          }
        }
      }, 100);
    };

    video.addEventListener("play", handleVideoPlay);

    return () => {
      if (video) {
        video.removeEventListener("play", handleVideoPlay);
      }
      if (moodIntervalRef.current) {
        clearInterval(moodIntervalRef.current);
      }
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
    };
  }, []);

  const stopVideoStream = () => {
    if (videoStreamRef.current) {
      const tracks = videoStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const calculateAverageMood = (moodData) => {
    const aggregatedMood = moodData.reduce((acc, mood) => {
      for (const [key, value] of Object.entries(mood)) {
        acc[key] = (acc[key] || 0) + value;
      }
      return acc;
    }, {});

    const totalEntries = moodData.length;
    for (const key in aggregatedMood) {
      aggregatedMood[key] /= totalEntries;
    }

    // Return the dominant mood
    return Object.keys(aggregatedMood).reduce((a, b) =>
      aggregatedMood[a] > aggregatedMood[b] ? a : b
    );
  };

  const sendMoodToAPI = async (mood, age) => {
    try {
      console.log(`Sending mood: ${mood}, Age: ${age}`);
      const response = await fetch("http://localhost:8080/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, age }),
      });
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
      const suggestions = await response.json();
    console.log(suggestions)
      setSuggestions(suggestions["suggestions"]);
    } catch (error) {
      console.error("Error sending mood to API:", error);
    }
  };

  return (
    <div className="video-container">
      <video ref={videoRef} width="640" height="480" autoPlay muted />
    </div>
  );
};

export default FaceDetection;
