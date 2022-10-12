import React from "react";
import image from "../assets/filterAssets/heart.png";
const heartImg = new Image();
heartImg.src = image;

export const cuteCheek = (face, ctx, video) => {
  face.forEach((pred) => {
    //Draw Lips
    const rightCheek = pred.annotations.rightCheek[0];
    const leftCheek = pred.annotations.leftCheek[0];
    const X = rightCheek[0];
    const Y = rightCheek[1];
    const X1 = leftCheek[0];
    const Y1 = leftCheek[1];

    // Draw each eye from the video onto each eye in the canvas, but twice as big
    ctx.beginPath();
    ctx.drawImage(heartImg, X - 90, Y - 50, 170, 100);
    ctx.drawImage(heartImg, X1 - 80, Y1 - 45, 170, 100);
    ctx.fill();
    //ctx.drawImage(heartImg, X - 180, Y - 265, 350, 200);
  });
};
