const { mode } = require("../../week14/component/webpack.config");
const parser = require("./parser");

module.exports = function(source, map) {
  console.log(source);
  const tree = parser.parseHTML(source);
  console.log("tree", tree);
  // console.log("tree___content", tree.children[1].children[0].content);
  console.log("my loader is running!!!!!!!!!!!!!!!!", this.resourcePath);

  let template = null;
  let script = null;

  for (let node of tree.children) {
    if (node.tagName === "template") {
      template = node.children.filter(e => e.type != "text")[0];
    }
    if (node.tagName === "script") {
      script = node.children[0].content;
    }
  }

  let createCode = "";

  console.log(template);

  let visit = (node, depth) => {
    if (node.type === "text") {
      return JSON.stringify(node.content);
    }

    let attrs = {};
    for (let attribute of node.attributes) {
      attrs[attribute.name] = attribute.value;
    }

    let children = node.children.map(node => visit(node));

    return `createElement("${node.tagName}",${JSON.stringify(
      attrs
    )},${children})`;
  };

  visit(template, 0);

  console.log("createCode:", createCode);

  const r = `
import { createElement, Text, Wrapper } from "./createElement.js";
	
export	class Carousel{

	  setAttribute(name, value) {
    	this[name] = value;
  	}
		render(){
			return ${visit(template)};
		}
	  mountTo(parent) {
    	this.render().mountTo(parent);
  	}
	}
	`;
  console.log(r);
  return r;
};
