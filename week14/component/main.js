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
    // this.root.setAttribute(name, value);
    // this.slot.setAttribute(name, value);
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
      <article>
        <h1>{this.attributes.get("title")}</h1>
        <h2>{this.properties.get("title")}</h2>
        <header> I'm a header</header>
        {this.slot}
        <footer>I'm a footer</footer>
      </article>
    );
  }

  mountTo(parent) {
    // parent.appendChild(this.root);
    for (let child of this.children) {
      // child.mountTo(this.root);
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
  <MyComponent
    id="a"
    class="b"
    style="background-color:red;width:100px;height:100px"
    title="I'm a title"
  >
    <div>text text text</div>
  </MyComponent>
);
// component.class = "asd";
component.title = "I'm a title2";
console.log("component:", component);
component.mountTo(document.body);
// component.setAttribute("id", "b");
