import p5 from "p5";

export class ImageSorter {
  p: p5;
  image: p5.Image | undefined;
  colors: p5.Color[] = [];
  tileCount: number;
  rectSize: number;

  constructor(p: p5, tileCount: number = 100) {
    this.p = p;
    this.tileCount = tileCount;
    this.rectSize = 400 / tileCount;
  }

  preload(imgPath: string) {
    this.image = this.p.loadImage(imgPath);
  }

  extractColors() {
    this.colors = [];
    this.image?.loadPixels();
    for (let gridY = 0; gridY < this.tileCount; gridY++) {
      for (let gridX = 0; gridX < this.tileCount; gridX++) {
        let x = this.p.int(gridX * this.rectSize);
        let y = this.p.int(gridY * this.rectSize);
        if (this.image) {
          let i = (y * this.image.width + x) * 4;
          let c = this.p.color(
            this.image.pixels[i],
            this.image.pixels[i + 1],
            this.image.pixels[i + 2],
            this.image.pixels[i + 3]
          );
          this.colors.push(c);
        }
      }
    }
  }

  getSortedColors(mode: "hue" | "saturation" | "brightness") {
    let arr = [...this.colors];
    switch (mode) {
      case "hue":
        arr.sort((a, b) => this.p.hue(a) - this.p.hue(b));
        break;
      case "saturation":
        arr.sort((a, b) => this.p.saturation(a) - this.p.saturation(b));
        break;
      case "brightness":
        arr.sort((a, b) => this.p.brightness(a) - this.p.brightness(b));
        break;
    }
    return arr;
  }

  drawTiles(xOffset: number, yOffset: number, sortedColors: p5.Color[]) {
    let i = 0;
    this.p.noStroke();
    for (let gridY = 0; gridY < this.tileCount; gridY++) {
      for (let gridX = 0; gridX < this.tileCount; gridX++) {
        this.p.fill(sortedColors[i]);
        this.p.rect(
          xOffset + gridX * this.rectSize,
          yOffset + gridY * this.rectSize,
          this.rectSize,
          this.rectSize
        );
        i++;
      }
    }
  }
}
