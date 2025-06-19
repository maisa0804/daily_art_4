import p5 from "p5";
import GUI from "lil-gui";

export default function work3(p: p5) {
  let img: p5.Image;
  let params = {
    segments: 8,
    zoom: 1,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
  };
  let gui: GUI;

  p.preload = () => {
    img = p.loadImage("/garden.jpg");
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    p.imageMode(p.CENTER);
    p.angleMode(p.DEGREES);
    gui = new GUI();
    gui.add(params, "segments", 2, 16, 1);
    gui.add(params, "zoom", 0.1, 2, 0.1);
    gui.add(params, "rotation", 0, 360, 1);
    gui.add(params, "offsetX", -200, 200, 1);
    gui.add(params, "offsetY", -200, 200, 1);
  };

  p.draw = () => {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);

    let segmentAngle = 360 / params.segments;

    for (let i = 0; i < params.segments; i++) {
      p.push();
      p.rotate(i * segmentAngle + params.rotation);

      // Create a triangle-shaped mask for each segment
      p.beginShape();
      p.vertex(0, 0);
      let x1 = p.cos(segmentAngle / 2) * p.width;
      let y1 = p.sin(segmentAngle / 2) * p.width;
      let x2 = p.cos(-segmentAngle / 2) * p.width;
      let y2 = p.sin(-segmentAngle / 2) * p.width;
      p.vertex(x1, y1);
      p.vertex(x2, y2);
      p.endShape(p.CLOSE);

      // Draw the image segment
      p.image(
        img,
        params.offsetX,
        params.offsetY,
        img.width * params.zoom,
        img.height * params.zoom
      );

      p.pop();
    }
  };
}
