import eyeImage from "../assets/thug-glass.png";
import cigar from "../assets/cigarette.png";
const thugGlass = new Image();
const cigarette = new Image();
cigarette.src = cigar;
thugGlass.src = eyeImage;

export const thugLife = (face, ctx, video) => {
  face.forEach((pred) => {
    const rightEyeIris = pred.annotations;

    // Right eye bounds (top, left, bottom, right) are the points (257, 463, 253, 359)

    let testPointX = rightEyeIris.rightEyeIris[0][0];
    let testPointY = rightEyeIris.rightEyeIris[0][1];

    ctx.beginPath();

    ctx.drawImage(thugGlass, testPointX - 87, testPointY - 130, 290, 290);
    ctx.drawImage(
      cigarette,
      pred.annotations.lipsLowerOuter[0][0] - 140,
      pred.annotations.lipsLowerOuter[0][1] - 10,
      150,
      150
    );
  });
};
