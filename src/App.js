import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";

import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { thugLife } from "./filters/thugLifeFilter";
import { drawEyesBig } from "./filters/bigEyesFilter";
import { drawMesh } from "./utilities";
import { tomatoFace } from "./filters/tomatoFace";
import { drawMoustache } from "./filters/moustache";
import { runnyNose } from "./filters/runnyNoseFilter";
import FilterOption from "./components/FilterOption";
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let renderFunc = useRef(null);
  const runFacemesh = async (func) => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    setInterval(() => {
      detect(net, func);
    }, 10);
  };

  const clickHandler = (e) => {
    console.log("Clicked");
    const currFunc = obj.filter((ele) => ele.name === e.target.innerHTML);
    renderFunc = currFunc[0].func;
    console.log(renderFunc);
    runFacemesh(renderFunc);
  };
  const obj = [
    {
      func: drawEyesBig,
      name: "bigEyesFilter",
    },
    {
      func: drawMoustache,
      name: "moustacheFilter",
    },
    {
      func: tomatoFace,
      name: "tomatoFaceFilter",
    },
    {
      func: runnyNose,
      name: "runnyNoseFilter",
    },
    {
      func: thugLife,
      name: "thugLifeFilter",
    },
    {
      func: drawMesh,
      name: "drawMeshFilter",
    },
  ];
  const detect = async (net, func) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      console.log(webcamRef);
      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      console.log(canvasRef);

      const face = await net.estimateFaces({ input: video });
      console.log(face);
      const ctx = canvasRef.current.getContext("2d");

      requestAnimationFrame(() => {
        if (func && typeof func === "function") {
          func(face, ctx, webcamRef.current.video);
        }
      });
    }
  };

  useEffect(() => {
    runFacemesh(renderFunc);
  }, [renderFunc]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
      {obj.map((ele) => (
        <FilterOption
          key={ele.name}
          name={ele.name}
          clickHandler={clickHandler}
        />
      ))}
    </div>
  );
}

export default App;
