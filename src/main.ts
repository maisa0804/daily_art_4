import "./style.css";
import p5 from "p5";
import work1 from "./works/work1";
import work2 from "./works/work2";
import work3 from "./works/work3";
import work4 from "./works/work4";
import work5 from "./works/work5";

const routes: { [key: string]: string } = {
  "": `
    <div class="menu-container">
      <h2>Works</h2>
      <ul>
        <li><a href="#work1">Color Sort</a></li>
        <li><a href="#work2">Wave Pixels</a></li>
        <li><a href="#work3">Kaleidoscope</a></li>
        <li><a href="#work4">Glitch Art</a></li>
        <li><a href="#work5">Mirror Mosaic</a></li>
      </ul>
    </div>
  `,
};

const works: { [key: string]: (p: p5) => void } = {
  work1: work1,
  work2: work2,
  work3: work3,
  work4: work4,
  work5: work5,
};

function render() {
  const hash = location.hash.replace("#", "");
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) return;
  if ((window as any).currentP5) {
    (window as any).currentP5.remove();
    (window as any).currentP5 = null;
  }
  if (hash in works) {
    app.innerHTML =
      '<div id="p5-container"></div><a href="#" class="home-link">Home</a>';
    (window as any).currentP5 = new p5(
      works[hash],
      document.getElementById("p5-container")!
    );
    return;
  }
  app.innerHTML = routes[hash] || "<h1>Not Found</h1>";
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
