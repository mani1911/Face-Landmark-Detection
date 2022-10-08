import image from "../assets/droplet.png";
import image2 from "../assets/emote.png";
const droplet = new Image();
droplet.src = image;

const emotion = new Image();
emotion.src = image2;

export const runnyNose = (face, ctx, video) => {
  face.forEach((pred) => {
    //Draw Lips
    const noseRight = pred.annotations.noseRightCorner[0];
    const eyebrowX = pred.annotations.leftEyebrowUpper.map((elem) => elem[0]);
    const eyebrowY = pred.annotations.leftEyebrowUpper.map((elem) => elem[1]);
    const X = Math.min(...eyebrowX);
    const Y = Math.min(...eyebrowY);

    // Draw each eye from the video onto each eye in the canvas, but twice as big

    ctx.drawImage(droplet, noseRight[0] - 4, noseRight[1] - 10, 20, 45);
    ctx.drawImage(emotion, X - 50, Y - 100, 200, 200);
  });
};
