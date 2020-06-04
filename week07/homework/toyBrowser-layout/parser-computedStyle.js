const css = require("css");
const EOF = Symbol("EOF"); // End Of File
const layout = require("./layout");

let currentToken = {
    tagName: "",
    type: "",
    isSelfClosing: false,
};
let currentAttribute = {
    name: "",
    value: "",
};

let currentTextNode = null;

let stack = [{ type: "document", children: [] }];

// 输出token
function emit(token) {
    let top = stack[stack.length - 1];
    if (token.type === "startTag") {
        // console.log("token:", token);
        let element = {
            type: "element",
            children: [],
            attributes: [],
        };
        for (let i in token) {
            if (i === "type" || i === "tagName" || i === "isSelfClosing")
                continue;
            element.attributes.push({
                name: i,
                value: token[i],
            });
        }
        element.tagName = token.tagName;

        // 在这里开始计算css; 收集到css就开始计算
        computeCSS(element);

        top.children.push(element);
        element.parent = top;

        if (!token.isSelfClosing) stack.push(element);
        currentTextNode = null;
        // console.log(element);
    } else if (token.type === "endTag") {
        if (top.tagName !== token.tagName) {
            throw new Error("Tag start end donnt match!");
        } else {
            // 此处可以拿到style标签里的 children，也就是样式
            if (top.tagName === "style") {
                addCSSRules(top.children[0].content);
            }
            // 计算完成css属性后开始计算layout
            layout(top);
            stack.pop();
        }
        currentTextNode = null;
    } else if (token.type === "text") {
        if (currentTextNode === null) {
            currentTextNode = {
                type: "text",
                content: "",
            };
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
    // console.log(stack[stack.length - 1]);
}

// 开始解析html <html> sda</html>
function data(c) {
    if (c === "<") {
        return tagOpen;
    } else if (c === EOF) {
        emit({
            type: "EOF",
        });
        return;
    } else {
        emit({
            type: "text",
            content: c,
        });
        return data;
    }
}

// 进入标签 <html> sda</html>
function tagOpen(c) {
    if (c === "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: "",
        };
        return tagName(c);
    } else {
        emit({
            type: "text",
            content: c,
        });
        return;
    }
}

// 结束标签 <html> sda</html>
function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: "",
        };
        return tagName(c);
    } else if (c === ">") {
    } else if (c === EOF) {
    } else {
    }
}

// 进入标签名 <html en="len">sda</html>
function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === "/") {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c === ">") {
        emit(currentToken);
        return data;
    } else {
        currentToken.tagName += c;
        return tagName;
    }
}

// 进入标签属性名 <html en="len">sda</html>
function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === ">") {
        return data;
    } else if (c === "=") {
        // return beforeAttributeName;
    } else {
        // 初始化currentAttribute
        currentAttribute = {
            name: "",
            value: "",
        };
        return attributeName(c);
    }
}

// 开始解析属性名 <html en="len">sda</html>  <div class  ="a">adf</div>
function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName(c);
    } else if (c === "=") {
        return beforeAttributeValue;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentAttribute.name += c;
        return attributeName;
    }
}

//解析属性名结束 <div class ="a">adf</div>
function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c === "/") {
        return selfClosingStartTag;
    } else if (c === "=") {
        return beforeAttributeValue;
    } else if (c === ">") {
    }
}

// 开始解析属性值 <div class  = "a"/>adf</div>
function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeValue;
    } else if (c === '"') {
        return doubleQuotedAttributeValue;
    } else if (c === "'") {
        return singleQuotedAttributeValue;
    } else if (c === ">") {
        // return
    } else {
        return unquotedAttributeValue(c);
    }
}

// 双引号 值  <div class  = "a"/>adf</div>
function doubleQuotedAttributeValue(c) {
    if (c === '"') {
        // 再次遇到双引号代表属性值解析完毕
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === "\u0000") {
    } else if (c === EOF) {
    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

// 单引号 值  <div class  = 'a'/>adf</div>
function singleQuotedAttributeValue(c) {
    if (c === "'") {
        // 再次遇到单引号代表属性值解析完毕
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === "\u0000") {
    } else if (c === EOF) {
    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

// 属性值解析完成后的状态 <div class  = 'a' >adf</div>
function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === ">") {
        // 此标签的全部属性解析完成
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === EOF) {
    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue; // ??? 为何不考虑单引号
    }
}

// 自封闭标签 <html en="len"/>
function selfClosingStartTag(c) {
    if (c === ">") {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (c === EOF) {
    } else {
    }
}

// 无引号的属性值 <div class = abc >adf</div>
function unquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c === "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === "\u0000") {
    } else if (c === "'" || c === '"' || c === "<" || c === "=" || c === "`") {
    } else if (c === EOF) {
    } else {
        currentAttribute.value += c;
        return unquotedAttributeValue;
    }
}

// 开始解析css规则,把解析好的css规则存到一个数组
let cssRules = [];
function addCSSRules(cssString) {
    const cssAST = css.parse(cssString);
    // console.log("css.stringify(cssAST):", css.stringify(cssAST));
    // console.log("cssAST:", cssAST);
    cssRules.push(...cssAST.stylesheet.rules);
}

// 计算css
function computeCSS(element) {
    // console.log("element:", element);
    // 获取父元素
    const elements = stack.slice().reverse();

    // 拆分选择器
    if (!element.computedStyle) {
        element.computedStyle = {};
    }
    for (let rule of cssRules) {
        const selectorParts = rule.selectors[0].split(" ").reverse();
        // console.log("selectorParts:", selectorParts, "\nelement:", element);
        if (!match(element, selectorParts[0])) {
            continue;
        }
        let matched = false;
        let j = 1;
        for (let i = 0; i < elements.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++;
            }
        }
        if (j >= selectorParts.length) {
            matched = true;
        }

        if (matched) {
            const sp = specificity(rule.selectors[0]);
            // 如果元素匹配到选择器，则加入规则
            // console.log("matched,element:", element, "\nmatched rules:", rule);
            const computedStyle = element.computedStyle;
            for (let declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {};

                    if (!computedStyle[declaration.property].specificity) {
                        computedStyle[declaration.property].specificity = sp;
                        // 预留一个优先级
                        computedStyle[declaration.property].value =
                            declaration.value;
                    } else if (
                        compare(
                            computedStyle[declaration.property].specificity,
                            sp
                        ) < 0
                    ) {
                        computedStyle[declaration.property].value =
                            declaration.value;
                        computedStyle[declaration.property].specificity = sp;
                    }
                }
            }
            console.log("element.computedStyle:", element);
        }
    }
}

/**
 * @author liuyuan
 * @des 根据选择器确定优先级四元数组，比如 selector = "div div.container #myid", 优先级数组为p = [0,3,1,1]=
 * 			其中p[0]代表行内样式的个数，最大为1。p[3]代表选择器的个数，以空格分隔，有几个就为几。p[2]代表类选择器的个数，
 * 			有几个就是几，p[1]为id选择器的个数，为几就是几。权重顺序为p[0]>p[1]>p[2]>p[3]
 * @param {string} selector 选择器字符串
 * @return {array} 计算好的优先级四元数组
 */
function specificity(selector) {
    const p = [0, 0, 0, 0];
    const selectorParts = selector.split(" ");
    for (let part of selectorParts) {
        if (part.charAt(0) === "#") {
            p[1] += 1;
        } else if (part.charAt(0) === ".") {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}

/**
 * @author liuyuan
 * @des 比较两个优先级，sp1 = [0,1,2,3], sp2= [2,3,4,5]
 * @param {array} sp1 元素选择器优先级数组
 * @param {array} sp2 元素选择器优先级数组
 * @return {number} 大于0代表sp1的优先级大，小于0代表sp2的优先级大
 */
function compare(sp1, sp2) {
    if (sp1[0] > sp2[0]) {
        return sp1[0] - sp2[0];
    } else if (sp1[1] > sp2[1]) {
        return sp1[1] - sp2[1];
    } else if (sp1[2] > sp2[2]) {
        return sp1[2] - sp2[2];
    }
    return sp1[3] - sp2[3];
}

/**
 * @author liuyuan
 * @des
 * @param {string} element dom元素的tagname
 * @param {string} selector css选择器的string
 * @return {boolean} 是否匹配
 */
function match(element, selector) {
    if (!element || !selector) {
        return false;
    }
    const type = selector.charAt(0);
    // id选择器
    if (type === "#") {
        const attr = element.attributes.filter((item) => item.name === "id")[0];
        if (attr && attr.value === selector.replace(",", "")) {
            return true;
        }
    } else if (type === ".") {
        // 类选择器
        const attr = element.attributes.filter(
            (item) => item.name === "class"
        )[0];
        if (attr && attr.value === selector.replace(",", "")) {
            return true;
        }
    } else {
        // 简单选择器
        if (selector === element.tagName) {
            return true;
        }
    }
    return false;
}

module.exports.parseHTML = function (html) {
    // console.log("html:", html);
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
    // console.log(stack[0].children[1].children[1].children[1].children[0]);
    console.log(cssRules);
    return stack[0];
};
