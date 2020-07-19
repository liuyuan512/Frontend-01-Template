import { createElement, Text, Wrapper } from "./createElement.js";

class Carousel {
  constructor(config) {
    console.log("config:", config);
    this.children = [];
    this.root = document.createElement("div");
    this.slot = <div></div>;
    this.attributes = new Map();
    this.properties = new Map();
  }

  set class(v) {
    // property
    console.log("Prent::class", v);
  }

  setAttribute(name, value) {
    // attribute
    this.attributes.set(name, value);
    this[name] = value;
    console.log(name, value);
  }

  appendChild(child) {
    // children
    console.log("child", child);
    this.children.push(child);
  }

  render() {
    const children = this.data.map(url => {
      let element = <img src={url} />;
      element.addEventListener("dragstart", event => event.preventDefault());
      return element;
    });
    const root = <div class="carousel">{children}</div>;

    let position = 0;
    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;
      let current = children[position];
      let next = children[nextPosition];

      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";

      current.style.transform = `translateX(${-100 * position}%)`;
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

      setTimeout(() => {
        current.style.transition = "";
        next.style.transition = "";

        current.style.transform = `translateX(${-100 - 100 * position}%)`;
        next.style.transform = `translateX(${-100 * nextPosition}%)`;

        position = nextPosition;
      }, 16);

      setTimeout(nextPic, 3000);
    };
    // 打开此方法自动轮播
    nextPic();

    // 此方法为拖拽
    // root.addEventListener("mousedown", (event) => {
    //   let startX = event.clientX,
    //     startY = event.clientY;
    //   let nextPosition = (position + 1) % this.data.length;
    //   let lastPosition = (position - 1 + this.data.length) % this.data.length;

    //   let current = children[position];
    //   let last = children[lastPosition];
    //   let next = children[nextPosition];

    //   current.style.transition = "ease 0s";
    //   last.style.transition = "ease 0s";
    //   next.style.transition = "ease 0s";

    //   current.style.transform = `translateX(${-500 * position}px)`;
    //   last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
    //   next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

    //   let move = (event) => {
    //     current.style.transform = `translateX(${
    //       event.clientX - startX - 500 * position
    //     }px)`;
    //     last.style.transform = `translateX(${
    //       event.clientX - startX - 500 - 500 * lastPosition
    //     }px)`;
    //     next.style.transform = `translateX(${
    //       event.clientX - startX + 500 - 500 * nextPosition
    //     }px)`;
    //     // console.log(event.clientX - startX, event.clientY - startY);
    //   };

    //   let up = (event) => {
    //     let offset = 0;
    //     if (event.clientX - startX > 250) {
    //       offset = 1;
    //     } else if (event.clientX - startX < -250) {
    //       offset = -1;
    //     }

    //     /**
    //      * @author liuyuan
    //      * @des 播放动画
    //      */
    //     current.style.transition = "";
    //     last.style.transition = "";
    //     next.style.transition = "";

    //     current.style.transform = `translateX(${
    //       offset * 500 - 500 * position
    //     }px)`;
    //     last.style.transform = `translateX(${
    //       offset * 500 - 500 - 500 * lastPosition
    //     }px)`;
    //     next.style.transform = `translateX(${
    //       offset * 500 + 500 - 500 * nextPosition
    //     }px)`;

    //     position = (position - offset + this.data.length) % this.data.length;

    //     document.removeEventListener("mousemove", move);
    //     document.removeEventListener("mouseup", up);
    //   };

    //   document.addEventListener("mousemove", move);
    //   document.addEventListener("mouseup", up);
    // });
    // return root;
  }

  mountTo(parent) {
    for (let child of this.children) {
      this.slot.appendChild(child);
    }
    this.render().mountTo(parent);
  }
}

let component = (
  <Carousel
    data={[
      "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
      "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
      "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
      "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
    ]}
  />
);
// component.class = "asd";
// component.title = "I'm a title2";
console.log("component:", component);
component.mountTo(document.body);
// component.setAttribute("id", "b");
