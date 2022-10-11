import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import { Container, Stack, Offcanvas, Button } from "react-bootstrap";
import { obj } from "./controls/utility";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";

import FilterOption from "./components/FilterOption";
import Screen from "./components/Screen";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const runFacemesh = async (func) => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    if (start) {
      clearInterval(start);
      setStart(null);
    }
    if (func === null) {
      clearInterval(start);
      setStart(null);
    }
    var temp = setInterval(() => {
      detect(net, func);
    }, 10);
    setStart(temp);
  };

  const clickHandler = (e) => {
    handleClose();
    const currFunc = obj.filter((ele) => ele.name === e.currentTarget.id);
    runFacemesh(currFunc[0].func);
  };

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
      if (func === null) {
        ctx.clearRect(0, 0, videoWidth, videoHeight);
        return;
      }
      requestAnimationFrame(() => {
        if (func && typeof func === "function") {
          func(face, ctx, webcamRef.current.video);
        }
      });
    }
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        name="start"
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-center">
            <h1 className="font-italic">Filters</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            className="w-100 p-3 align-items-center"
            direction="vertical"
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
        </Offcanvas.Body>
      </Offcanvas>
      <Container
        style={{ backgroundColor: "red", height: "100vh" }}
        fluid
        className="p-2 d-flex flex-column align-items-center"
      >
        <Screen webcamRef={webcamRef} canvasRef={canvasRef} />
        <Button
          variant="primary"
          onClick={handleShow}
          className="me-2 btn-lg"
          style={{ width: "100px" }}
        >
          Filter
        </Button>
      </Container>
    </>
  );
}

export default App;
