import { createElement, Text, Wrapper } from "./createElement.js";
import { Carousel } from "./carousel.view";

window.Carousel = Carousel;

console.log("Carousel:", Carousel);

const component = new Carousel();

console.log("component:------", component);
component.render().mountTo(document.body);
