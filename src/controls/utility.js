import { thugLife } from "../filters/thugLifeFilter";
import { drawEyesBig } from "../filters/bigEyesFilter";
import { drawMesh } from "../utilities";
import { tomatoFace } from "../filters/tomatoFace";
import { drawMoustache } from "../filters/moustache";
import { runnyNose } from "../filters/runnyNoseFilter";
import { pirateHat } from "../filters/pirateHat";
import { cuteCheek } from "../filters/cuteFilter";

import runnyNoseFilter from "../assets/filterThumbnail/runnyNoseFilter.png";
import bigEyesFilter from "../assets/filterThumbnail/bigEyesFilter.png";
import moustacheFilter from "../assets/filterThumbnail/moustacheFilter.png";
import thugLifeFilter from "../assets/filterThumbnail/thugLifeFilter.png";
import tomatoFaceFilter from "../assets/filterThumbnail/tomatoFaceFilter.png";
import drawMeshFilter from "../assets/filterThumbnail/drawMesh.png";
import noFilter from "../assets/filterThumbnail/noFilter.png";
import pirateHatFilter from "../assets/filterThumbnail/pirateHat.png";
import cuteCheekFilter from "../assets/filterThumbnail/cuteCheek.png";

export const obj = [
  {
    func: null,
    name: "noFilter",
    image: noFilter,
  },
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
    func: pirateHat,
    name: "pirateHatFilter",
    image: pirateHatFilter,
  },
  {
    func: cuteCheek,
    name: "cuteCheekFilter",
    image: cuteCheekFilter,
  },
];
