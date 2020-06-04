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

const layout = function (element) {
    if (!element.computedStyle) return;
    const elementStyle = getStyle(element);
    if (elementStyle.dispaly !== "flex") {
        return;
    }
    const items = element.children.filter((e) => e.type === "element");
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    const style = elementStyle;

    ["width", "height"].forEach((size) => {
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
        style.flexDirection = "flex-start";
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
    }
    if (style.flexDirection === "row-reverse") {
        mainSize = "width";
        mainStart = "right";
        mainEnd = "left";
        mainSign = -1;
        mainBase = 0;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
    }
    if (style.flexDirection === "column") {
        mainSize = "height";
        mainStart = "top";
        mainEnd = "bottom";
        mainSign = +1;
        mainBase = 0;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
    }
    if (style.flexDirection === "column-reverse") {
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
};

module.exports = layout;
