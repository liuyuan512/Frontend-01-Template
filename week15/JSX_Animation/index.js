import { Timeline, Animation, ColorAnimation } from "./animation.js";
import { cubicBezier } from "./cubicBezier.js";
import { createElement, Text, Wrapper } from "./createElement.js";

let el = document.querySelector("#el");
let el2 = document.querySelector("#el2");
// el.style.transition = "ease 5s";

const linear = t => t;
const ease = cubicBezier(0.25, 0.1, 0.25, 1);

const timeline = <Timeline />;

timeline.add(
  new Animation(
    el.style,
    "transform",
    0,
    200,
    5000,
    0,
    linear,
    v => `translateX(${v}px)`
  )
);

timeline.start();

// document.querySelector("#el2").style.transform = "translateX(200px)";

document.querySelector("#btn").addEventListener("click", () => {
  timeline.pause();
});
document.querySelector("#resume").addEventListener("click", () => {
  timeline.resume();
});
document.querySelector("#restart").addEventListener("click", () => {
  timeline.restart();
});

document.querySelector("#el2-start-btn").addEventListener("click", () => {
  timeline.add(
    new ColorAnimation(
      el.style,
      "backgroundColor",
      { r: 0, g: 0, b: 0, a: 1 },
      { r: 255, g: 0, b: 0, a: 1 },
      5000,
      0,
      linear
    ),
    0
  );
});
