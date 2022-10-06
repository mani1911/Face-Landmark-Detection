import tomato from "../assets/tomato.png";
const image = new Image();
image.src = tomato;
export const tomatoFace = (face, ctx, video) => {
  face.forEach((pred) => {
    const keypoints = pred.scaledMesh;
    // Left eye bounds (top, left, bottom, right) are the points (27, 130, 23, 243)

    let lTop = keypoints[27][1];
    let lLeft = keypoints[130][0];
    let lBot = keypoints[23][1];
    let lRig = keypoints[243][0];
    let lWid = lRig - lLeft;
    let lHei = lBot - lTop;

    // Right eye bounds (top, left, bottom, right) are the points (257, 463, 253, 359)
    let rTop = keypoints[257][1];
    let rLeft = keypoints[463][0];
    let rBot = keypoints[253][1];
    let rRig = keypoints[359][0];
    let rWid = rRig - rLeft;
    let rHei = rBot - rTop;

    //Draw Lips
    const Xs = pred.annotations.lipsUpperOuter.map((elem) => elem[0]);
    const lipsUpper = pred.annotations.lipsUpperOuter.map((elem) => elem[1]);
    const upperMin = Math.min(...lipsUpper);
    const lipsLower = pred.annotations.lipsLowerOuter.map((elem) => elem[1]);
    const lowerMax = Math.max(...lipsLower);

    const lipRight = Math.max(...Xs);
    const lipLeft = Math.min(...Xs);

    // Draw each eye from the video onto each eye in the canvas, but twice as big
    ctx.drawImage(image, -150, -150);
    ctx.drawImage(video, rLeft, rTop, rWid, rHei, 400, 200, 2 * rWid, 2 * rHei);
    ctx.drawImage(video, lLeft, lTop, lWid, lHei, 275, 200, 2 * lWid, 2 * lHei);

    ctx.drawImage(
      video,
      lipLeft,
      upperMin - 5,
      lipRight - lipLeft,
      lowerMax - upperMin,
      300,
      320,
      1.5 * (lipRight - lipLeft),
      1.5 * (lowerMax - upperMin)
    );
  });
};
