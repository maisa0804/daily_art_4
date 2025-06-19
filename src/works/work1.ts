import p5 from "p5";
export default function sketch(p: p5) {
  p.setup = () => {
    p.createCanvas(400, 400);
    p.background(200);
  };
  p.draw = () => {
    p.ellipse(p.width / 2, p.height / 2, 100, 100);
  };
}
