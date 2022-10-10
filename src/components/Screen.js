import React from "react";
import Webcam from "react-webcam";

const Screen = ({ webcamRef, canvasRef }) => {
  return (
    <div className={{ textAlign: "center", marginTop: "10px" }}>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          marginTop: "80px",
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
          marginTop: "80px",
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default Screen;
