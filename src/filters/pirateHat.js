import React from "react";
import image from "../assets/filterAssets/pirateHat.png";
const pirateHatImg = new Image();
pirateHatImg.src = image;

export const pirateHat = (face, ctx, video) => {
  face.forEach((pred) => {
    //Draw Lips
    const eyeBrowMiddle = pred.annotations.midwayBetweenEyes[0];
    const X = eyeBrowMiddle[0];
    const Y = eyeBrowMiddle[1];

    // Draw each eye from the video onto each eye in the canvas, but twice as big
    ctx.beginPath();
    ctx.drawImage(pirateHatImg, X - 180, Y - 265, 350, 200);
  });
};
