import "./style.css";
import p5 from "p5";
import work1 from "./works/work1";

const routes: { [key: string]: string } = {
  "": `
    <h2>Works</h2>
    <ul>
      <li><a href="#work1">work1</a></li>
    </ul>
  `,
};

const works: { [key: string]: (p: p5) => void } = {
  work1: work1,
};

function render() {
  const hash = location.hash.replace("#", "");
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) return;
  if ((window as any).currentP5) {
    (window as any).currentP5.remove();
    (window as any).currentP5 = null;
  }
  if (hash === "work1") {
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
