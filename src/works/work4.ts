import p5 from "p5";
import GUI from "lil-gui";

export default function work4(p: p5) {
  let img: p5.Image;
  let params = {
    glitchAmount: 20,
    sliceCount: 20,
    rgbShift: 5,
    noiseAmount: 0.2,
  };
  let gui: GUI;

  p.preload = () => {
    img = p.loadImage("/city.jpg");
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    gui = new GUI();
    gui.add(params, "glitchAmount", 0, 50, 1);
    gui.add(params, "sliceCount", 1, 50, 1);
    gui.add(params, "rgbShift", 0, 20, 1);
    gui.add(params, "noiseAmount", 0, 1, 0.1);
  };

  p.draw = () => {
    p.background(0);

    // Create slices
    let sliceHeight = p.height / params.sliceCount;
    for (let i = 0; i < params.sliceCount; i++) {
      let y = i * sliceHeight;
      let offsetX = p.random(-params.glitchAmount, params.glitchAmount);

      // Draw RGB shifted layers
      p.tint(255, 0, 0, 127); // Red channel
      p.image(
        img,
        offsetX - params.rgbShift,
        y,
        p.width,
        sliceHeight,
        0,
        y,
        p.width,
        sliceHeight
      );

      p.tint(0, 255, 0, 127); // Green channel
      p.image(
        img,
        offsetX,
        y,
        p.width,
        sliceHeight,
        0,
        y,
        p.width,
        sliceHeight
      );

      p.tint(0, 0, 255, 127); // Blue channel
      p.image(
        img,
        offsetX + params.rgbShift,
        y,
        p.width,
        sliceHeight,
        0,
        y,
        p.width,
        sliceHeight
      );

      // Add noise
      if (p.random() < params.noiseAmount) {
        p.noTint();
        p.fill(p.random([0, 255]));
        p.rect(p.random(p.width), y, p.random(20), sliceHeight);
      }
    }

    p.noTint();
  };
}
