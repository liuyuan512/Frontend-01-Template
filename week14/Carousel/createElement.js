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

  const visit = children => {
    for (let child of children) {
      // o.appendChild(child);
      if (child instanceof Array) {
        visit(child);
        continue;
      }

      if (typeof child === "string") child = new Text(child);
      o.children.push(child);
    }
  };

  visit(children);

  return o;
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

  // 监听事件代理到root上
  addEventListener() {
    console.log("addEventListener---arguments:", arguments);
    // this.root.addEventListener(type, cb);
    this.root.addEventListener(...arguments);
  }

  // 样式获取代理到root上
  get style() {
    return this.root.style;
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }
}

export { createElement, Text, Wrapper };
