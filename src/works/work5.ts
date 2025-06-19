import p5 from "p5";
import GUI from "lil-gui";

export default function work5(p: p5) {
  let img: p5.Image;
  let params = {
    gridSize: 20,
    mirrorMode: "quad" as "quad" | "horizontal" | "vertical" | "none",
    rotation: 0,
    scale: 1,
  };
  let gui: GUI;

  p.preload = () => {
    img = p.loadImage("/hotel.jpg");
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    p.imageMode(p.CENTER);
    p.angleMode(p.DEGREES);
    gui = new GUI();
    gui.add(params, "gridSize", 5, 50, 1);
    gui.add(params, "mirrorMode", ["none", "horizontal", "vertical", "quad"]);
    gui.add(params, "rotation", 0, 360, 1);
    gui.add(params, "scale", 0.5, 2, 0.1);
  };

  p.draw = () => {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.rotate(params.rotation);

    let tileSize = params.gridSize;
    let cols = p.ceil(p.width / tileSize);
    let rows = p.ceil(p.height / tileSize);

    for (let y = -rows / 2; y < rows / 2; y++) {
      for (let x = -cols / 2; x < cols / 2; x++) {
        let posX = x * tileSize;
        let posY = y * tileSize;

        // Calculate source coordinates based on mirror mode
        let sourceX = posX;
        let sourceY = posY;

        switch (params.mirrorMode) {
          case "horizontal":
            sourceX = Math.abs(posX);
            break;
          case "vertical":
            sourceY = Math.abs(posY);
            break;
          case "quad":
            sourceX = Math.abs(posX);
            sourceY = Math.abs(posY);
            break;
        }

        // Map source coordinates to image coordinates
        let imgX = p.map(sourceX, -p.width / 2, p.width / 2, 0, img.width);
        let imgY = p.map(sourceY, -p.height / 2, p.height / 2, 0, img.height);

        // Get color from image
        let c = img.get(
          p.constrain(imgX * params.scale, 0, img.width - 1),
          p.constrain(imgY * params.scale, 0, img.height - 1)
        );

        // Draw tile
        p.noStroke();
        p.fill(c);
        p.rect(posX, posY, tileSize, tileSize);
      }
    }
  };
}
