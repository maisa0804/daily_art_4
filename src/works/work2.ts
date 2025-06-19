import p5 from "p5";
import GUI from "lil-gui";

export default function work2(p: p5) {
  let img: p5.Image;
  let params = {
    waveCount: 10,
    amplitude: 30,
    speed: 0.02,
    pixelSize: 8,
  };
  let gui: GUI;
  let time = 0;

  p.preload = () => {
    img = p.loadImage("/tower.jpg");
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    gui = new GUI();
    gui.add(params, "waveCount", 1, 20, 1);
    gui.add(params, "amplitude", 0, 100, 1);
    gui.add(params, "speed", 0.01, 0.1, 0.01);
    gui.add(params, "pixelSize", 1, 20, 1);
  };

  p.draw = () => {
    p.background(0);
    img.loadPixels();

    for (let y = 0; y < p.height; y += params.pixelSize) {
      for (let x = 0; x < p.width; x += params.pixelSize) {
        // Calculate wave offset
        let wave =
          Math.sin(((x * params.waveCount) / p.width) * Math.PI * 2 + time) *
          params.amplitude;

        // Get source pixel
        let sourceX = p.constrain(x, 0, img.width - 1);
        let sourceY = p.constrain(y + wave, 0, img.height - 1);
        let c = img.get(sourceX, sourceY);

        // Draw pixel
        p.noStroke();
        p.fill(c);
        p.rect(x, y, params.pixelSize, params.pixelSize);
      }
    }

    time += params.speed;
  };
}
