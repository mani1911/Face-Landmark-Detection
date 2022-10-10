import React, { useRef, useEffect, useState } from "react";
import runnyNoseFilter from "./assets/filterThumbnail/runnyNoseFilter.png";
import bigEyesFilter from "./assets/filterThumbnail/bigEyesFilter.png";
import moustacheFilter from "./assets/filterThumbnail/moustacheFilter.png";
import thugLifeFilter from "./assets/filterThumbnail/thugLifeFilter.png";
import tomatoFaceFilter from "./assets/filterThumbnail/tomatoFaceFilter.png";
import drawMeshFilter from "./assets/filterThumbnail/drawMesh.png";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import { Container, Stack } from "react-bootstrap";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import { thugLife } from "./filters/thugLifeFilter";
import { drawEyesBig } from "./filters/bigEyesFilter";
import { drawMesh } from "./utilities";
import { tomatoFace } from "./filters/tomatoFace";
import { drawMoustache } from "./filters/moustache";
import { runnyNose } from "./filters/runnyNoseFilter";
import FilterOption from "./components/FilterOption";
import Screen from "./components/Screen";
import "bootstrap/dist/css/bootstrap.min.css";
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
    const currFunc = obj.filter((ele) => ele.name === e.currentTarget.id);
    renderFunc = currFunc[0].func;
    console.log(renderFunc);
    runFacemesh(renderFunc);
  };
  const obj = [
    {
      func: drawEyesBig,
      name: "bigEyesFilter",
      image: bigEyesFilter,
    },
    {
      func: drawMoustache,
      name: "moustacheFilter",
      image: moustacheFilter,
    },
    {
      func: tomatoFace,
      name: "tomatoFaceFilter",
      image: tomatoFaceFilter,
    },
    {
      func: runnyNose,
      name: "runnyNoseFilter",
      image: runnyNoseFilter,
    },
    {
      func: thugLife,
      name: "thugLifeFilter",
      image: thugLifeFilter,
    },
    {
      func: drawMesh,
      name: "drawMeshFilter",
      image: drawMeshFilter,
    },
    {
      func: drawMesh,
      name: "drawMeshFilter",
      image: drawMeshFilter,
    },
    {
      func: drawMesh,
      name: "drawMeshFilter",
      image: drawMeshFilter,
    },
    {
      func: drawMesh,
      name: "drawMeshFilter",
      image: drawMeshFilter,
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
    <Container
      fluid
      className="d-flex mt-3 mb-3 justify-content-center align-items-center"
    >
      <Stack
        className="bg-success w-50 p-3 overflow-scroll"
        direction="horizontal"
        gap={3}
      >
        {obj.map((ele) => (
          <FilterOption
            key={ele.name}
            name={ele.name}
            image={ele.image}
            clickHandler={clickHandler}
          />
        ))}
      </Stack>
      <Screen webcamRef={webcamRef} canvasRef={canvasRef} />
    </Container>
  );
}

export default App;
