import p5 from "p5";
import { ImageSorter } from "./ImageSorter";
import GUI from "lil-gui";

export default function work1(p: p5) {
  let sorter: ImageSorter;
  let params = {
    tileCount: 100,
    sortMode: "hue" as "hue" | "saturation" | "brightness" | "none",
  };
  let gui: GUI;

  p.preload = () => {
    sorter = new ImageSorter(p, params.tileCount);
    sorter.preload("/beach.jpg");
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    p.background(200);
    gui = new GUI();
    gui.add(params, "tileCount", 10, 200, 1).onChange((v: number) => {
      sorter = new ImageSorter(p, v);
      p.loadImage("/beach.jpg", (img) => {
        sorter.image = img;
        p.redraw();
      });
    });
    gui
      .add(params, "sortMode", ["none", "hue", "saturation", "brightness"])
      .onChange(() => {
        if (params.sortMode === "none") {
          gui.hide();
        } else {
          gui.show();
        }
        p.redraw();
      });
    p.noLoop();
  };

  p.draw = () => {
    p.background(200);
    if (sorter.image) {
      if (params.sortMode === "none") {
        p.image(sorter.image, 0, 0, 400, 400);
        return;
      }
      sorter.extractColors();
      let colors: p5.Color[];
      switch (params.sortMode) {
        case "hue":
          colors = sorter.getSortedColors("hue");
          break;
        case "saturation":
          colors = sorter.getSortedColors("saturation");
          break;
        case "brightness":
          colors = sorter.getSortedColors("brightness");
          break;
        default:
          colors = [...sorter.colors];
          break;
      }
      sorter.drawTiles(0, 0, colors);
    }
  };
}
