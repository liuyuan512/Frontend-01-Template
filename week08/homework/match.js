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
