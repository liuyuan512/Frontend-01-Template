function createElement(Cls, attributes, ...children) {
  console.log("arguments:", arguments);
  console.log("children:", children);
  let o;
  if (typeof Cls === "string") {
    o = new Wrapper(Cls);
  } else {
    o = new Cls({
      timer: {}
    });
  }
  for (let name in attributes) {
    // o[name] = attributes[name];
    o.setAttribute(name, attributes[name]);
  }

  for (let child of children) {
    // o.appendChild(child);
    if (typeof child === "string") child = new Text(child);
    o.children.push(child);
  }

  return o;
}

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

  set title(value) {
    this.properties.set("title", value);
  }

  setAttribute(name, value) {
    // attribute
    this.attributes.set(name, value);
    console.log(name, value);
  }

  appendChild(child) {
    // children
    console.log("child", child);
    this.children.push(child);
  }

  render() {
    return (
      <div>
        {this.data.map(url => {
          let element = <img src={url} />;
          element.addEventListener("dragstart", event =>
            event.preventDefault()
          );
          return element;
        })}
      </div>
    );
  }

  mountTo(parent) {
    for (let child of this.children) {
      this.slot.appendChild(child);
    }
    this.render().mountTo(parent);
  }
}

class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for (let child of this.children) {
      child.mountTo(this.root);
    }
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
component.title = "I'm a title2";
console.log("component:", component);
component.mountTo(document.body);
// component.setAttribute("id", "b");
