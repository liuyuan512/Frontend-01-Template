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

class MyComponent {
  constructor(config) {
    console.log("config:", config);
    this.children = [];
    this.root = document.createElement("div");
  }

  set class(v) {
    // property
    console.log("Prent::class", v);
  }

  setAttribute(name, value) {
    // attribute
    this.root.setAttribute(name, value);
    console.log(name, value);
  }

  appendChild(child) {
    // children
    console.log("child", child);
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for (let child of this.children) {
      child.mountTo(this.root);
    }
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

// class Child {
//   mountTo(parent) {
//     parent.appendChild(this.root);
//     for (let child of this.children) {
//       child.mountTo(parent);
//     }
//   }
// }

let component = (
  <MyComponent
    id="a"
    class="b"
    style="background-color:red;width:100px;height:100px"
  >
    <div>text text text</div>
    <MyComponent />
    <MyComponent />
    <MyComponent />
  </MyComponent>
);
component.class = "asd";
console.log("component:", component);
component.mountTo(document.body);
// component.setAttribute("id", "b");
