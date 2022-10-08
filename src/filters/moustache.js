import moustache from "../assets/moustache.png";
const image = new Image();
image.src = moustache;
image.width = 200;
export const drawMoustache = (face, ctx, video) => {
  face.forEach((pred) => {
    //Draw Lips
    const noseRight = pred.annotations.noseRightCorner[0];

    // Draw each eye from the video onto each eye in the canvas, but twice as big

    ctx.arc(noseRight[0], noseRight[1], 5, 0, 2 * Math.PI);

    ctx.drawImage(image, noseRight[0] - 65, noseRight[1] - 32, 200, 100);
  });
};
