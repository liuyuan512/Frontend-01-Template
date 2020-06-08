function getStyle(element) {
  if (!element.style) element.style = {};

  for (let prop in element.computedStyle) {
    const value = element.computedStyle[prop].value;
    element.style[prop] = value;
    const styleString = element.style[prop].toString();
    if (styleString.match(/px$/) || styleString.match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }
  return element.style;
}

const layout = function(element) {
  // if (!element.computedStyle || !Object.keys(element.computedStyle).length)
  if (!element.computedStyle) return;
  const elementStyle = getStyle(element);
  if (elementStyle.display !== "flex") {
    return;
  }
  const items = element.children.filter(e => e.type === "element");
  if (!items.length) return;
  items.sort((a, b) => (a.order || 0) - (b.order || 0));
  const style = elementStyle;

  ["width", "height"].forEach(size => {
    if (style[size] === "auto" || style[size] === "") {
      style[size] = null;
    }
  });

  // 取默认值
  if (!style.flexDirection || style.flexDirection === "auto") {
    style.flexDirection = "row";
  }
  if (!style.alignItems || style.alignItems === "auto") {
    style.alignItems = "stretch"; // 如果项目未设置高度或设为auto，将占满整个容器的高度。
  }
  if (!style.justifyContent || style.justifyContent === "auto") {
    style.justifyContent = "flex-start";
  }
  if (!style.flexWrap || style.flexWrap === "auto") {
    style.flexWrap = "nowrap";
  }
  if (!style.alignContent || style.alignContent === "auto") {
    style.alignContent = "stretch"; //属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
  }

  let mainSize,
    mainStart,
    mainEnd,
    mainSign,
    mainBase,
    crossSize,
    crossStart,
    crossEnd,
    crossSign,
    crossBase;
  if (style.flexDirection === "row") {
    mainSize = "width";
    mainStart = "left";
    mainEnd = "right";
    mainSign = +1;
    mainBase = 0;

    crossSize = "height";
    crossStart = "top";
    crossEnd = "bottom";
  } else if (style.flexDirection === "row-reverse") {
    mainSize = "width";
    mainStart = "right";
    mainEnd = "left";
    mainSign = -1;
    mainBase = style.width;

    crossSize = "height";
    crossStart = "top";
    crossEnd = "bottom";
  } else if (style.flexDirection === "column") {
    mainSize = "height";
    mainStart = "top";
    mainEnd = "bottom";
    mainSign = +1;
    mainBase = 0;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  } else if (style.flexDirection === "column-reverse") {
    mainSize = "height";
    mainStart = "bottom";
    mainEnd = "top";
    mainSign = -1;
    mainBase = style.height;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }
  if (style.flexWrap === "wrap-reverse") {
    let temp = crossStart;
    crossStart = crossEnd;
    crossEnd = temp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  // 如果子元素没有设置宽高，则将子元素宽高设置成父元素的宽高
  let isAutoMainSize = false;
  if (!style[mainSize]) {
    elementStyle[mainSize] = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemStyle = getStyle(item);
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== undefined) {
        elementStyle[mainSize] += itemStyle[mainSize];
      }
    }
    isAutoMainSize = true;
  }

  let flexLine = [];
  let flexLines = [flexLine];

  let mainSpace = elementStyle[mainSize]; // 主轴的总长度
  let crossSpace = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemStyle = getStyle(item);

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    if (itemStyle.flex) {
      flexLine.push(item);
    } else if (style.flexWrap === "nowrap" && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== undefined) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      flexLine.push(item);
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;

        flexLine = [];
        flexLines.push(flexLine);

        flexLine.push(item);

        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== undefined) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  flexLine.mainSpace = mainSpace;

  // 处理flexWrap为nowrap
  if (style.flexWrap === "nowrap" || isAutoMainSize) {
    flexLine.crossSpace =
      style[crossSize] !== undefined ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if (mainSpace < 0) {
    const scale = style[mainSize] / (style[mainSize] - mainSpace);
    const currentMain = mainBase;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemStyle = getStyle(item);

      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }

      itemStyle[mainSize] = itemStyle[mainSize] * scale;
      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] =
        itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else {
    flexLines.forEach(items => {
      let mainSpace = items.mainSpace;
      let flexTotal = 0;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemStyle = getStyle(item);
        if (itemStyle.flex !== null && itemStyle.flex !== undefined) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }
      let currentMain;
      let step;
      if (flexTotal > 0) {
        currentMain = mainBase;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const itemStyle = getStyle(item);

          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
          console.log("item:", item, "\nstyle:", item.style);
        }
      } else {
        if (style.justifyContent === "flex-start") {
          currentMain = mainBase;
          step = 0;
        }
        if (style.justifyContent === "flex-end") {
          currentMain = mainBase * mainSign + mainBase;
          step = 0;
        }
        if (style.justifyContent === "center") {
          currentMain = (mainBase / 2) * mainSign + mainBase;
          step = 0;
        }
        if (style.justifyContent === "space-between") {
          currentMain = mainBase;
          step = (mainBase / (items.length - 1)) * mainSign;
        }
        if (style.justifyContent === "space-around") {
          step = (mainBase / (items.length - 1)) * mainSign;
          currentMain = step / 2 + mainBase;
        }

        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          const itemStyle = getStyle(item);
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + step;
          console.log("item:", item, "\nstyle:", item.style);
        }
      }
    });
  }

  // 计算负轴 align-items, align-self
  // let crossSpace;

  if (!style[crossSize]) {
    crossSpace = 0;
    elementStyle[crossSize] = 0;

    for (let i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] += flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize];
    for (let i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  if (style.flexWrap === "wrap-reverse") {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }

  let lineSize = style[crossSize] / flexLines.length;
  let step;

  if (style.alignContent === "flex-start") {
    crossBase += 0;
    step = 0;
  }
  if (style.alignContent === "flex-end") {
    crossBase += crossSign * crossSpace;
    step = 0;
  }
  if (style.alignContent === "center") {
    crossBase += (crossSign * crossSpace) / 2;
    step = 0;
  }
  if (style.alignContent === "space-between") {
    crossBase += 0;
    step = crossSpace / (flexLines.length - 1);
  }
  if (style.alignContent === "space-around") {
    step = crossSpace / flexLines.length;
    crossBase += (crossSign * step) / 2;
  }
  if (style.alignContent === "stretch") {
    crossBase += 0;
    step = 0;
  }
  flexLines.forEach(items => {
    let lineCrossSize =
      style.alignContent === "stretch"
        ? items.crossSpace + crossSpace / flexLines.length
        : items.crossSpace;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemStyle = getStyle(item);

      const align = itemStyle.alignSelf || style.alignItems;
      if (align === "flex-start") {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }

      if (align === "flex-end") {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossStart] =
          itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
      }

      if (align === "center") {
        itemStyle[crossStart] =
          crossBase + (crossSign * (lineCrossSize - itemStyle[crossSize])) / 2;
      }

      if (align === "stretch") {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] =
          crossBase +
          crossSign *
            (itemStyle[crossSize] ? itemStyle[crossSize] : lineCrossSize);
        itemStyle[crossSize] =
          crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
      }
      console.log("item:", item, "\nstyle:", item.style);
    }
    crossBase += crossSign * (lineCrossSize + step);
  });
  // console.log("items:", items);
};

module.exports = layout;
