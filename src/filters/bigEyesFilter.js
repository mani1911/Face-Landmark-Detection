export const drawEyesBig = (face, ctx, video) => {
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

    // Draw each eye from the video onto each eye in the canvas, but twice as big
    ctx.drawImage(
      video,
      rLeft,
      rTop,
      rWid,
      rHei,
      rLeft - rWid * 0.5,
      rTop - rHei * 0.5,
      2.2 * rWid,
      2.2 * rHei
    );
    ctx.drawImage(
      video,
      lLeft,
      lTop,
      lWid,
      lHei,
      lLeft - lWid * 0.5,
      lTop - lHei * 0.5,
      2.2 * lWid,
      2.2 * lHei
    );
  });
};
